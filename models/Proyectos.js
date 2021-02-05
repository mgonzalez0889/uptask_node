const DataTypes = require('sequelize');
const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');

const db = require('../config/db');

const Proyectos = db.define('proyectos', {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,        
    },
    url: {
        allowNull: true,
        type: DataTypes.STRING
    }
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Proyectos;