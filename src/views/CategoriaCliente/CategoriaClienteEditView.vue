<template>
 <br>
<div class="table-responsive mx-auto">
   
   <form class="form-inline">
     
      <div class="form-group d-flex" v-on:submit="guardar"> </div>

      <div v-if="divEditar" class="form-group d-flex">
        <span class="input-group-text categori-cliete-span"><i class="fa-solid fa-users"></i></span>
        <input v-model="nombreCategoriaCliente" id="nombreCategoriaCliente"  type="text" class="form-control categoria-cliente-input" placeholder="Digite una categoria de cliente">
        <button class="btn btn-primary categoria-cliente-boton" @click="actualizarCategoria">Actualizar</button>
      </div>

   </form>
   
 </div>
  <br>

  <div class="table-responsive mx-auto">
    
<table class="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Categoria de cliente</th>
      <th scope="col">Actualizar</th>
    </tr>
  </thead>

  <tbody class="table-group-divider" id="contenido">
   
    <tr v-if="cargando">
      <td colspan="6"><h3>Cargando...</h3></td>
    </tr>
    <tr  v-else v-for="cat, i in categoriaCli" :key="cat.id">
      <td v-text="(i+1)" :class="{ 'tabla-fila-seleccionada': filaSeleccionada === cat.IDCATEGORIACLIEN }"></td>
      <td v-text="cat.NOMBRECATEGORIA" :class="{ 'tabla-fila-seleccionada': filaSeleccionada === cat.IDCATEGORIACLIEN }"></td>
      <td :class="{ 'tabla-fila-seleccionada': filaSeleccionada === cat.IDCATEGORIACLIEN }">
        &nbsp;
        <button class="btn btn-info" v-on:click="$event => selectCategoria(cat.IDCATEGORIACLIEN, cat.NOMBRECATEGORIA)">
          <i class="fa-solid fa-edit"></i>
        </button>      
      </td>
    </tr>  
  </tbody>
</table>
</div>

<transition name="fade">
      <div v-if="cargando" class="loading">
        <div class="loading-spinner"></div>
      </div>
  </transition>

</template>

<script>
/**
 * Este componente Vue.js se encarga de cargar la categoría de clientes desde una API
 * y mostrarla en la página. En caso de error, se muestra un cuadro de diálogo de error
 * utilizando SweetAlert2.
 */

import axios from 'axios';
import {alerError} from '../Funciones/alertSwal'
import {validarImput} from '../Funciones/validacionDato'
import {enviarSolicitud} from '../Funciones/actualizarRegistro'





export default {
  components: {
    
  },
  data() {
    return {
      categoriaCli: null, // Almacena la categoría de clientes cargada desde la API
      cargando: false, // Indica si se está realizando la carga o no
      divEditar: false,
      filaSeleccionada: null,
      idCat: null,
      nombreCategoriaCliente: '',
      cargando: false

    };
  },
  mounted() {
    // Se llama al método getCategoria() cuando el componente se monta en la página
    this.getCategoria();
  },
  methods: {

    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    /**
     * Realiza una solicitud HTTP a la API para obtener la categoría de clientes.
     * Si la solicitud es exitosa, asigna la respuesta a la propiedad categoriaCli.
     * En caso de error, muestra un cuadro de diálogo de error utilizando SweetAlert2.
     */
    getCategoria() {
      this.cargando = true; // Se establece el indicador de carga en true
      axios.get('http://127.0.0.1:8000/api/catCliente')
        .then(res => {
          // La solicitud es exitosa, se asigna la respuesta a categoriaCli
          this.categoriaCli = res.data;
          this.cargando = false; // Se restablece el indicador de carga a false
        })
          .catch(error => {
            // Se produce un error en la solicitud HTTP
            this.cargando = false; // Se restablece el indicador de carga a false
            console.log(error); // Se muestra el error en la consola para depuración
            
            alerError('Error al cargar la categoría de cliente.');

          });
    },

    selectCategoria(id, nombre) {
      this.nombreCategoriaCliente = nombre
      this.idCat = id;
      this.filaSeleccionada = id;
      this.divEditar = true;
      this.$nextTick(() => {
        this.filaSeleccionada = id;
      const nombreCategory = document.getElementById('nombreCategoriaCliente');
      if (nombreCategory) {
        nombreCategory.value = nombre;
      }
    });
},

actualizarCategoria(){
  console.log(this.idCat)
  console.log( this.nombreCategoriaCliente);

  //preventDefault() no hace el submit hasta que los campos esten llenos
  event.preventDefault();                                                               //Dato en el inputText
      var categoriaCliente = validarImput('categoria de cliente', 'nombreCategoriaCliente',this.nombreCategoriaCliente);
      if (categoriaCliente) { 
        var url = 'http://127.0.0.1:8000/api/catCliente/'+this.idCat;
        var parametros = {NOMBRECATEGORIA:this.nombreCategoriaCliente.trim()}
        enviarSolicitud('PUT', parametros,url, 'Categoria Actualizada!!');
      }
      this.cargando = false;
     
    },

  }
};

</script>