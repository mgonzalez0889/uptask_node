const Usuarios = require('../models/Usuarios');
const enviarEmail  = require('../handlers/email');

exports.formCrearCuenta = async (req, res) => {

    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en Uptask'
    })

}

exports.formIniciarSesion = async (req, res) => {
    const {error} = res.locals.mensajes;
    console.log(res.locals.mensajes);
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar sesion en Uptask',
        error


    })

}

exports.crearCuenta = async (req, res, next) => {
    // leer los datos

    const {email, password} = req.body;

    try {
        await Usuarios.create({
            email,
            password
        })

        // Crear una URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;


        // Crear ell objeto de usuario
        const usuario = {
            email
        }

           
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta Uptask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        })


        // Enviar el email


        // redirigir al usuario
        req.flash('Correcto', 'Enviamos un correo, confirma tu cuenta');
        res.redirect('/crear-cuenta');
    }catch(error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta en Uptask',
            email: email,
            password: password
        })
    }

}

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecer' , {
        nombrePagina: 'Restablecer tu contraseña'
    })


}

exports.confirmarCuenta = async (req, res) => {
    
    const usuario = await Usuarios.findOne({
        where: {email: req.params.correo}
    })
    // sino existe el usuario
    if(!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/crear-cuenta')
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('Correcto', 'Cuenta activadad correctamente');
    res.redirect('/iniciar-sesion');


}