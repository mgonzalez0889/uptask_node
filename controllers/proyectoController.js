const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');



exports.proyectosHome = async (req, res) => {
    
    const usuarioId = res.locals.usuario.id;
    
    const proyectos = await Proyectos.findAll({
        where: {usuarioId: usuarioId}
    });
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });    
}

exports.formularioProyecto = async (req, res) => {
    // const proyectos = await Proyectos.findAll();
    const usuarioId = res.locals.usuario.id;
    
    const proyectos = await Proyectos.findAll({
        where: {usuarioId: usuarioId}
    });
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req, res) => {
    // const proyectos = await Proyectos.findAll();
    const usuarioId = res.locals.usuario.id;
    
    const proyectos = await Proyectos.findAll({
        where: {usuarioId: usuarioId}
    });
    // Enviar a la consola 
    //console.log(req.body);
    const { nombre } = req.body;
    console.log(nombre);

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
    }

    // Si hay errores
    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else {
        // No hay errores
        // Insertar en la BD
        const usuarioId = res.locals.usuario.id;
        await Proyectos.create({nombre, usuarioId });
        res.redirect('/');
               
    }

}

exports.proyectoPorUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    
    const proyectosPromise = Proyectos.findAll({
        where: {usuarioId: usuarioId}
    });
    // const proyectosPromise = Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });    

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // Consultar tareas del proyecto Actual

    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        // include: [
        //     {model: Proyectos}
        // ]
    })

    console.log(tareas);

    if(!proyecto) return next();

    console.log(proyecto);
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    });
}

exports.formularioEditar = async (req, res) => {

    // const proyectosPromise = Proyectos.findAll();
    const usuarioId = res.locals.usuario.id;    
    const proyectosPromise = Proyectos.findAll({
        where: {usuarioId: usuarioId}
    });

    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);



    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
}

exports.actualizarProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;    
    const proyectos = await Proyectos.findAll({
        where: {usuarioId}
    });
    // Enviar a la consola 
    //console.log(req.body);
    const nombre  = req.body.nombre;    
    const id = req.params.id;

    console.log('Controller----->', req.params.body)

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
    }

    // Si hay errores
    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else {
        // No hay errores
        // Insertar en la BD
        await Proyectos.update(
                {nombre: nombre},
                {where: {id: id}}
                
                
            );
        res.redirect('/');
               
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    // console.log(req.params);
    // console.log(req.query);

    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: {url: urlProyecto}});

    if(!resultado) {
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');

    // res.redirect('/');

} 
