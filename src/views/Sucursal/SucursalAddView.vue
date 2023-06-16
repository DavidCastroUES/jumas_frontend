<template>
  <div class="v-container">
     <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col">
            <!-- Columna 1: Input Text -->
            <br>
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="form-group text-left">
                  <label>Nombre sucursal</label>
                  <input v-model="nomSucursal" type="text" class="form-control ancho-text-input" name="nomSucursal" id ="nomSucursal">
                </div>
                <div class="form-group text-left">
                  <label >Dirección</label>
                  <input v-model="direccion" type="text" class="form-control ancho-text-input" name="direccion" id ="direccion">
                </div>
              </div>         
            </div>
          </div>
          <div class="col">
            <!-- Columna 1: Input Text -->
            <br>
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="form-group text-left">
                  <label>Teléfono</label>
                  <input v-model="telefono" type="text" class="form-control ancho-text-input" name="telefono" id ="telefono">
                </div>
                <div class="form-group text-left">
                  <label >Correo electrónico</label>
                  <input v-model="correo" type="text" class="form-control ancho-text-input" name="correo" id ="correo">
                </div>
              </div>         
            </div>
          </div>                
          <div class="row justify-content-center">
            <div class="col" >
              <button class="btn btn-primary categoria-cliente-boton" @click="guardar">Guardar</button>
                      
              <a class="btn btn-primary categoria-cliente-boton" href="barraNave_cc">Cancelar</a>
            </div>
          </div>
        </div>
        <transition name="fade">
      <div v-if="cargando" class="loading">
        <div class="loading-spinner"></div>
      </div>
  </transition>

    </form>
  </div>

</template>

<script>
import axios from 'axios';
import {alerError} from '../Funciones/alertSwal'
import {enviarSolicitud} from '../Funciones/ingresarRegistro'
import {validarImput} from '../Funciones/validacionDato'
import { validarEmail } from '../Funciones/validacionDato';
import {validarNumero} from '../Funciones/validacionDato';

export default {
  data() {
    return {
      selectedOption: '',
      nomSucursal: '',
      direccion:'',
      telefono:'',
      correo:'',
      url: 'http://127.0.0.1:8000/api/sucursal',
      cargando: false
    };
  },

  computed: {
  },

  mounted() {
    document.addEventListener('activar_spinner', this.activarSpinn);
  },
  methods: {
    submitForm() {
      // Lógica para enviar el formulario
    },
        guardar(){
      //preventDefault() no hace el submit hasta que los campos esten llenos
      event.preventDefault(); 
      //Dato en el inputText
      var nombreSucursal = validarImput('Nombre sucursal', 'nomSucursal',this.nomSucursal);
      var direccion = validarImput('Dirección sucursal', 'direccion', this.direccion);
      var telefonoSuc = validarNumero('Teléfono sucursal', 'telefono', this.telefono);
      var correoSuc = validarEmail('Correo sucursal', 'correo',this.correo);

      if(nombreSucursal && direccion && telefonoSuc && correoSuc){
        var parametros = {        
          NOMBRESUCURSAL: this.nomSucursal.trim(),
          DIRECCIONSUCURSAL: this.direccion.trim(),
          TELEFONOSUCURSAL: this.telefono.trim(),
          CORREOSUCURSAL: this.correo.trim(),
          ELIMINADO: 0
        }
        this.cargando = true;
        enviarSolicitud('POST', parametros, this.url, 'Sucursal ingresada');
        setTimeout( function() { window.location.href = '/SucursalBarra'; }, 3000 );
      }
    },
    activarSpinn(event) {
    const data = event.detail;
    // Actualiza las variables con los nuevos valores, este evento es generado desde eliminarRegistro.js
    //desde ese archivo es genrado el evento y capturado  en este punto
    this.cargando = data.cargando;
  }
}
}
</script>
