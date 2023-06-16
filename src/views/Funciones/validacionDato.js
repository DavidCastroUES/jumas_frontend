import Swal from "sweetalert2";



export function validarImput(titulo, datoInputText, datoInput){
    var datoValido = true;
    //datoInputText es el focus
if (datoInput.trim() ==='') {
    mostrarAlert('Este campo es obligatorio', datoInputText);
    datoValido = false;
    return datoValido;
}
 // Validar si el campo contiene caracteres especiales
 var regex = /^[a-zA-Z0-9\s@#áéíóúüÁÉÍÓÚÜñ\-_]+$/; // Expresión regular para letras, números y espacios
 if (!regex.test(datoInput)) {
     mostrarAlert('Los unicos caracteres especiales permitidos: @_#-', datoInputText);
     datoValido = false;
     return datoValido;
 }
return datoValido;
}

//Validación de campos de tipo correo electrónico
export function validarEmail(titulo, datoInputText, datoInput){
    var datoValido = true;
    //datoInputText es el focus
if (datoInput.trim() ==='') {
    mostrarAlert('Este campo es obligatorio', datoInputText);
    datoValido = false;
    return datoValido;
}
 // Validar si el campo contiene caracteres especiales
 var regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ; // Expresión regular para letras, números y espacios
 if (!regex.test(datoInput)) {
    console.log('El correo ingresado es incorrecto');
     mostrarAlert('El correo ingresado es incorrecto', datoInputText);
     datoValido = false;
     return datoValido;
 }
return datoValido;
}

//Validación de campos númericos
export function validarNumero(titulo, datoInputText, datoInput){
    var datoValido = true;
    //datoInputText es el focus
if (datoInput.trim() ==='') {
    mostrarAlert('Este campo es obligatorio', datoInputText);
    datoValido = false;
    return datoValido;
}
 // Validar si el campo contiene caracteres especiales
 var regex = /^[0-9]+$/  ; // Expresión regular para letras, números y espacios
 if (!regex.test(datoInput)) {
     mostrarAlert('Este campo debe contener solo números', datoInputText);
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