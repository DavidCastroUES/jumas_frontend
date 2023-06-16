import Swal from "sweetalert2";



export function validarDui(datoInputText, datoInput){
    var datoValido = true;
    //datoInputText es el focus
if (datoInput.trim() ==='') {
    mostrarAlert('Este campo es obligatorio', datoInputText);
    datoValido = false;
    return datoValido;
}
 // Validar si el campo contiene caracteres especiales
 var regex = /^[0-9]+$/; // Expresión regular para letras, números y espacios
 if (!regex.test(datoInput)) {
     mostrarAlert('Ingrese el número de DUI sin guion', datoInputText);
     datoValido = false;
     return datoValido;
 }
return datoValido;
}

export function mostrarAlert(titulo, foco = ''){
    if (foco !='') {
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title: titulo,
        icon: 'warning',
        showConfirmButton: true, // Deshabilita el botón "OK"
        customClass:{
            confirmButton:'btn btn-warning boton-alert-ok-adverntencia',
            popup: 'animated zoonIn',
            ButtonsStyling: false
        }
    });
}