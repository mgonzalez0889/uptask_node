const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const {expressValidator, body} = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cokieParser = require('cookie-parser');
const passport = require('./config/passport');

// Helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion a la BD
const db = require('./config/db');
const cookieParser = require('cookie-parser');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
     .then(() => console.log('Conectado al Servidor'))
     .catch(error => console.log('Error al conectar', error))   

// Crear una app de express
const app = express();

//Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Habilitar bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Agregamos express validator a toda la aplicacion
//app.use(body())




// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, 'views'));

// agregar flash messages
app.use(flash());

app.use(cookieParser());

// Sessiones nos permiten navegar entre distintas paginas sin volver a autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Pasar vardump a la aplicacion
app.use((req, res, next) => {    
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    //console.log(res.locals.usuario);
    next();
})

app.use('/', routes());

app.listen(3000);