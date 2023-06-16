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

export function enviarSolicitud(metodo, parametros, url, mensaje) {
    axios({
      method: metodo,
      url: url,
      data: parametros,
      timeout:0 // Establecer tiempo de espera en 5 segundos
    })
      .then(function(res) {
        var estado = res.status;
        if (estado == 201) {
          console.log(parametros);
          mostrarAlert(mensaje, 'success');
          ejecutarEventos();
        } else {
          mostrarAlert('No se pudo recuperar la respuesta', 'error');
        }
      }).catch(function(error) {
        activarSpinner();
         console.error('Error en la solicitud:', error);
         mostrarAlert('No hemos podido establecer comunicación con el servidor', 'error');
      });
  }
  

  function ejecutarEventos() {
    // Primer evento: modificarValores
    const evento1 = new CustomEvent('modificarValores', {
      detail: {
        showForm: true,
        showFormAdd: false,
      }
    });
    document.dispatchEvent(evento1);
    
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