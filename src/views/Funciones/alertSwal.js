import Swal from "sweetalert2";
import axios from "axios";

export function alerX(titulo, icono, foco = ''){
    if (foco !='') {
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title: titulo,
        icon: icono,
        customClass:{
            confirmButton:'btn btn-primary',
            popup: 'animated zoonIn',
            ButtonsStyling: false
        }
    });
}

export function alerError(mensaje){
   
      // Se muestra un cuadro de diálogo de error utilizando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la ventana
        customClass: {
          confirmButton: 'boton-alert-eliminar',
        },
      
      });
}

