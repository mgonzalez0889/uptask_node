const { Sequelize } = require('sequelize');
// Extraer valores de variables
require('dotenv').config();
// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize(
    process.env.BD_NAME, 
    process.env.BD_USER, 
    process.env.BD_PASSWORD,    
    {
        host: process.env.BD_HOST,
        dialect: process.env.BD_DIALECT
    }
);

module.exports = db;