import Swal from 'sweetalert2';
import axios from 'axios';


const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {
    
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        //console.log(urlProyecto);
        
        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: "No se podra recuperar, estas seguro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'No, Cancelarr'
          }).then((result) => {
            if (result.isConfirmed) {
                // enviar peticion
                
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                console.log(url);

                axios.delete(url, {params: {urlProyecto}})
                     .then((respuesta) => {
                         console.log(respuesta);

                        
                        Swal.fire(
                            'Proyecto eliminado!',
                            `${respuesta.data}`,
                            'success'
                          );
                
                          setTimeout(() => {
                              window.location.href = '/';
                          }, 3000)
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                        })
                    })

              
            }
          });
    
    });

}

export default btnEliminar;