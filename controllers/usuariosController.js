const Usuarios = require('../models/Usuarios');

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