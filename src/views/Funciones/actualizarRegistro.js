import Swal from "sweetalert2";
import axios from "axios";

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
//el cambio, tiene que ocultarde y volver a mostrar el formulario showFormEdit
//showFormEdit: false, showFormEdit: true,
function ejecutarEventos() {
    // Primer evento: modificarValores
    const evento1 = new CustomEvent('modificarValores', {
      detail: {
        showFormEdit: false,
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
        showFormEdit: true,
        showFormDelete: false,
      }
    });
    document.dispatchEvent(evento2);
  }, 100);
  }
  
