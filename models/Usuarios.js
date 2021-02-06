const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo valido'
            },
            notEmpty: {
                msg: 'El email no puede ir vacio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir Vacio'
            }
        }
    },
    token: {
        type: Sequelize.STRING
    },
    expiracion: {
        type: Sequelize.DATE
    },
    activo: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    }
    
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});
// Metodos personalizados
Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;