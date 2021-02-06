const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// referencia al modelo que vamos autenticar
const Usuarios = require('../models/Usuarios');

// Local Strategy  -- Login con credenciales propias Usuario y password
passport.use(
    new localStrategy(
        // por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                            email: email,
                            activo: 1
                            }
                })
                console.log('doneeeeee', usuario);
                // El usuario existe pero el password es incorrecto
                if(!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password incorrecto'
                    })
                }
                // El email existe y el password es correcto
                return done(null, usuario);

            }catch(error) {
                // Ese usuario no existe
                return done(null, false, {
                    message: 'Esta cuenta no existe'
                })

            }

        }
    )
);
//Configuracion extra
// Serializar el usuario 
passport.serializeUser((usuario, callback ) => {
    callback(null, usuario);
})

// deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;