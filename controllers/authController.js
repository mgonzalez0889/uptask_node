const passport = require('passport');
const Sequelize = require('sequelize');
const Usuarios = require('../models/Usuarios');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

const crypto = require('crypto');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorio'
});

// Funcion para revisar si elñ usuario esta logueado

exports.usuarioAutenticado = (req, res, next) => {
    
    // si el usuario esta autenticado, adelante

    if(req.isAuthenticated()) {
        return next();
    }
    // sino esta autenticado, redirigir al formulario

    return res.redirect('/iniciar-sesion');
}

// Funcion para cerrar sesion
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    });
}


// Genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    // Verificar que el usuario exista
    const {email} = req.body;
    const usuario = await  Usuarios.findOne({
        where: {email: email}
    })

    // Sino existe el usuario 
    if(!usuario) {
        req.flash('Error', 'no existe esa cuenta')
        res.render('reestablecer');
    }

    // Usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    // Guardar en la base de datos
    await usuario.save();
    console.log(usuario);

    // Url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

    res.redirect(`${resetUrl}`);

    console.log(resetUrl);

}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    })

    // Sino encuentra el usuario
    if(!usuario) {
        req.flash('error', 'No valido')
        res.redirect('/reestablecer')
    }

    console.log(usuario);

    // Formularo para generar el usuario 
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Contraseña'
    })
    
}
// Cambia el password por uno nuevo
exports.actualizarPassword = async (req, res) => {
    console.log('', req.params.token);
    // Verifica el token valido pero tambien la fecha de expiracion
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    })

    // Verificamos si el usuario existe
    if(!usuario) {
        req.flash('error', 'No valido'),
        res.redirect('/reestablecer')
    }

    // hashear el passsowrd 
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    await usuario.save()
    req.flash('Correcto', 'Tu Password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');

}