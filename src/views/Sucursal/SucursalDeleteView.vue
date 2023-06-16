<template>
  <br>
  <div class="table-responsive mx-auto">
    
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Sucursales</th>
          <th scope="col">Dirección</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Correo</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody class="table-group-divider" id="contenido">
        <tr v-if="this.cargando">
          <td colspan="6"><h3>Cargando...</h3></td>
        </tr>
        <tr v-else v-for="suc, i in this.sucursales" :key="suc.id">
          <td v-text="(i+1)"></td>
          <td v-text="suc.NOMBRESUCURSAL"></td>
          <td v-text="suc.DIRECCIONSUCURSAL"></td>
          <td v-text="suc.TELEFONOSUCURSAL"></td>
          <td v-text="suc.CORREOSUCURSAL"></td>
          <td>
            &nbsp;
            <button class="btn btn-danger" v-on:click="$event => eliminar(suc.IDSUCURSAL, suc.NOMBRESUCURSAL)">
              <i class="fa-solid fa-trash"></i>
            </button>
            <!-- <router-link to="{path:'edit/'+est.id}" class="btn btn-warnitg">
              <i class="fa-solid fa-edit"></i>
            </router-link> -->
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
import {confirmar} from '../Funciones/eliminarRegistro'
import {alerError} from '../Funciones/alertSwal'
import { toHandlers } from 'vue';
//import {mostrarFormDelete} from '../CategoriaCliente/CatClienteBarraNav.vue';



export default {
  components: {
    
  },
  data() {
    return {
      sucursales: null, // Almacena las sucursales cargada desde la API
      cargando: false, // Indica si se está realizando la carga o no

    };
  },
  mounted() {
    // Se llama al método getSucursales() cuando el componente se monta en la página
    this.getSucursales();

      // Escucha el evento personalizado
  document.addEventListener('activar_spinner', this.activarSpinn);
  },
  methods: {

    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    /**
     * Realiza una solicitud HTTP a la API para obtener la categoría de clientes.
     * Si la solicitud es exitosa, asigna la respuesta a la propiedad sucursales.
     * En caso de error, muestra un cuadro de diálogo de error utilizando SweetAlert2.
     */
    getSucursales() {
      this.cargando = true; // Se establece el indicador de carga en true
      axios.get('http://127.0.0.1:8000/api/sucursal')
        .then(res => {
          // La solicitud es exitosa, se asigna la respuesta a sucursales
          this.sucursales = res.data;
          this.cargando = false; // Se restablece el indicador de carga a false
        })
          .catch(error => {
            // Se produce un error en la solicitud HTTP
            this.cargando = false; // Se restablece el indicador de carga a false
            console.log(error); // Se muestra el error en la consola para depuración
            
            alerError('Error al cargar las sucursales');

          });
    },

    eliminar(id, nombre){

      //this.cargando = true;

      console.log(id, nombre);
      confirmar('http://127.0.0.1:8000/api/sucursal/',id, 'Eliminar registro', 'Realmente quiere eliminar la sucursal: '+nombre+'?')
    
      const rutaActual = this.$route.path;
      console.log(rutaActual);
    },

  activarSpinn(event) {
  const data = event.detail;
    // Actualiza las variables con los nuevos valores, este evento es generado desde eliminarRegistro.js
    //desde ese archivo es genrado el evento y capturado  en este punto
  this.cargando = data.cargando;
  },
  }
  
};

</script>