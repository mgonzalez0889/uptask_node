const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

exports.agregarTarea = async (req, res, next) => {
    // Obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({
        where: {url: req.params.url}
    })  

    // leer el valor del input

    const {tareas} = req.body;

    // Estado = 0 incompleto y ID del proyecto
    const estado = 0;
    const proyectoId = proyecto.id;
    // Insertar en la base de datos y redirecciones
    const resultado = await Tareas.create({tareas, estado, proyectoId});

    if(!resultado) {
        return next();
    }

    // redirecciones 
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res, next) => {
    // console.log(req.params);
    const { id } = req.params;
    const tarea = await Tareas.findOne({
        where: {id: id}
    });
    
    // console.log(tarea);

    // Cambiar estado 
    let estado = 0;
    if(tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) {
        return next();
    }


    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {
    console.log(req.params);

    const {id} = req.params;

    //Eliminar tarea

    const resultado = await Tareas.destroy({
        where: {id: id}
    });

    if (!resultado) return next();

    res.status(200).send('Tarea eliminada');



}

