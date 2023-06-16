import Swal from "sweetalert2";
import axios from "axios";

import { Button } from "bootstrap";

// Lanza un evento personalizado para modificar los valores


/**
 * Muestra una alerta personalizada.
 * @param {string} titulo - El título de la alerta.
 * @param {string} icono - El icono que se muestra en la alerta.
 * @param {string} foco - (Opcional) El ID de un elemento HTML en 
 * el que se enfoca después de mostrar la alerta.
 */


export function mostrarAlert(titulo, icono, foco = ''){
    if (foco !='') {
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title: titulo,
        icon: icono,
        showConfirmButton: true, // Deshabilita el botón "OK"
        customClass:{
            confirmButton:'btn btn-primary boton-alert-ok',
            popup: 'animated zoonIn',
            ButtonsStyling: false
        }
    });
}
/**
 * Muestra una confirmación para eliminar un registro.
 * @param {string} url - La URL de la solicitud HTTP.
 * @param {string} id - El ID del registro a eliminar.
 * @param {string} titulo - El título de la confirmación.
 * @param {string} mensaje - El mensaje de la confirmación.
 */
/**
 * Proporciona clases personalizadas para los botones de la alerta de confirmación.
 * @property {string} confirmButton - Clase CSS para el botón de confirmación.
 * @property {string} cancelButton - Clase CSS para el botón de cancelación.
 * @property {boolean} ButtonsStyling - Indica si se deben aplicar estilos a los botones.
 */
export function confirmar(url, id, titulo, mensaje){
    console.log(id, titulo);
   
    var urlApi = url+id;
    const buttonConfirmar = Swal.mixin({
        allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la ventana
        customClass:{
            confirmButton:'btn btn-primary boton-alert-eliminar',
            cancelButton: 'btn btn-danger boton-alert-cancelar',
            ButtonsStyling: false
        }
    });

    buttonConfirmar.fire({
    title:'Eliminar Registro',
    text:mensaje,
    icon:'question',
    showCancelButton:true,
    confirmButtonText:'<i class="fa-solid fa-check"></i> Eliminar',
    cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res)=>{
        if (res.isConfirmed) {
            enviarSolicitud('DELETE',{id:id}, urlApi, 'Eliminado con éxito')
            //activarSpinner();
        }else{
            mostrarAlert('Operación cancelada', 'info')
            //activarSpinner();
            //ejecutarEventos();
        }
           
    });
   
}
export function enviarSolicitud(metodo, parametros, url, mensaje){
    axios({
        method:metodo,
        url:url,
        data: parametros
    }).then(function(res){
        var estado = res.status;
        if (estado == 200) {
            console.log(parametros);
            mostrarAlert(mensaje, 'success');
            ejecutarEventos();
        }else{
            mostrarAlert('No se pudo recuperar la respuesta', 'error');
        }
            
        
    }).catch(function(error) {
        console.error('Error en la solicitud:', error);
        mostrarAlert('No hemos podido establecer comunicación con el servidor', 'error');
      });
}
//Esta funcion activa un evento para que en el componente prisipal puda escucharlo
//con esto se consigue cambiar variables para que se oculten los formularios
//Ver, Agregar, Editar y eliminar, como esta funcion es la que hace la peticion 
//de actualizado de datos a la BD, para que el formulario html pueda actualiazar
//el cambio, tiene que ocultarde y volver a mostrar el formulario showFormDelete
//showFormDelete: false, showFormDelete: true,
function ejecutarEventos() {
    // Primer evento: modificarValores
    const evento1 = new CustomEvent('modificarValores', {
      detail: {
        showFormDelete: false,
      }
    });
    document.dispatchEvent(evento1);
    //se establece la espera de un pequeño margen de tiempo para que se puedan ejecutar ambos eventos
     setTimeout(() => {
    // Segundo evento: modificar
    const evento2 = new CustomEvent('modificarValores', {
      detail: {
        showForm: false,
        showFormAdd: false,
        showFormEdit: false,
        showFormDelete: true,
      }
    });
    document.dispatchEvent(evento2);
  }, 100);
  activarSpinner();
  }

  function activarSpinner() {
    // Primer evento: modificarValores
    const evento = new CustomEvent('activar_spinner', {
      detail: {
        cargando: false,
      }
    });
    document.dispatchEvent(evento);
    
  }
  
  // Llamada a la función para ejecutar los eventos secuencialmente
 
  