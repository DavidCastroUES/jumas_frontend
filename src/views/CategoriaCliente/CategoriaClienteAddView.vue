<template>
  <br>
  <div class="table-responsive mx-auto">
   
    <form class="form-inline">
      
      <div class="form-group d-flex" v-on:submit="guardar">
        <label for="">Categoria de cliente</label>
      </div>

      <div class="form-group d-flex">
        <span class="input-group-text categori-cliete-span"><i class="fa-solid fa-users"></i></span>
        
        <input v-model="nombreCategoriaCliente" id="nombreCategoriaCliente"  type="text" class="form-control categoria-cliente-input" placeholder="Digite una categoria de cliente">
        <button class="btn btn-primary categoria-cliente-boton" @click="guardar">Guardar</button>
      </div>

    </form>
    
  </div>

  <transition name="fade">
      <div v-if="cargando" class="loading">
        <div class="loading-spinner"></div>
      </div>
  </transition>

</template>

<script>

import {enviarSolicitud} from '../Funciones/ingresarRegistro'
import {validarImput} from '../Funciones/validacionDato'

export default{

  data(){

    return{
      nombreCategoriaCliente: '',
      url: 'http://127.0.0.1:8000/api/catCliente',
      cargando: false
      }
  },

  mounted() {
  // Escucha el evento personalizado
  document.addEventListener('activar_spinner', this.activarSpinn);
},

  methods:{
    guardar(){
      //preventDefault() no hace el submit hasta que los campos esten llenos
      event.preventDefault();                                                               //Dato en el inputText
      var categoriaCliente = validarImput('categoria de cliente', 'nombreCategoriaCliente',this.nombreCategoriaCliente);
      if (categoriaCliente) { 
        var parametros = {NOMBRECATEGORIA:this.nombreCategoriaCliente.trim(), ELIMINADO:0}
        this.cargando = true;
        enviarSolicitud('POST', parametros, this.url, 'Categoria Ingresada!!');
      }
      
    },
    activarSpinn(event) {
    const data = event.detail;
    // Actualiza las variables con los nuevos valores, este evento es generado desde eliminarRegistro.js
    //desde ese archivo es genrado el evento y capturado  en este punto
    this.cargando = data.cargando;
  },
  }

}

</script>