import axios from "axios";
import Swal from 'sweetalert2';

import {actualizarAvance} from '../funciones/avance';


const tareas = document.querySelector('.listado-pendientes');

if(tareas) {

    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')) {
            // console.log('Actualizando...');
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            console.log(idTarea);

            //request tareas hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {idTarea})
                .then((respuesta) => {
                    if(respuesta.status === 200) {
                        icono.classList.toggle('completo');

                        actualizarAvance();
                    }

                })
                .catch((err) =>{
                    console.error('Error inesperado');
                })
        }

        if(e.target.classList.contains('fa-trash')) {
            //console.log('Eliminando....')

            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;
            console.log(idTarea);
            console.log(tareaHTML);

            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: "No se podra recuperar, estas seguro?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar',
                cancelButtonText: 'No, Cancelar'
              }).then((result ) => {

                if(result.value) {
                    // enviar delete por medio de axios
                    const url = `${location.origin}/tareas/${idTarea}`;    
                    axios.delete(url, {params: {idTarea}})
                         .then((respuesta) => {
                            if(respuesta.status === 200) {
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                // Opcional Alerta
                                Swal.fire(
                                    'Tarea eliminada!',
                                    `${respuesta.data}`,
                                    'success'
                                  );

                                  actualizarAvance();  
                            }
                         })
                         .catch((err) => {

                         })   




                }



              });



        }




    })
}

export default tareas;