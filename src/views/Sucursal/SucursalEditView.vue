<template>
  <br>
 <div class="table-responsive mx-auto">
    
    <form class="form-inline">
      
       <div class="form-group d-flex" v-on:submit="guardar"> </div>
        <div class="container">
          <div class="row">
            <div v-if="divEditar" class="form-group d-flex flex-wrap">
              <div class="input-group">
                <span class="input-group-text categori-cliete-span">Nombre:<i></i></span>  
                <input v-model="nombreSucursal" id="nombreSucursal"  type="text" class="form-control categoria-cliente-input" placeholder="Digite un nombre"> 
              </div>
              <div class="input-group">
                <span class="input-group-text categori-cliete-span">Dirección:<i></i></span>
                <input v-model="direccionSucursal" id="direccionSucursal"  type="text" class="form-control categoria-cliente-input" placeholder="Digite una dirección">
              </div>
              <div class="input-group">
                <span class="input-group-text categori-cliete-span">Teléfono:<i></i></span>
                <input v-model="telefonoSucursal" id="telefonoSucursal"  type="text" class="form-control categoria-cliente-input" placeholder="Digite un teléfono">
              </div>
              <div class="input-group">
                <span class="input-group-text categori-cliete-span">Correo:<i></i></span>
                <input v-model="correoSucursal" id="correoSucursal"  type="text" class="form-control categoria-cliente-input" placeholder="Digite un correo">
              </div>  
              <button class="btn btn-primary categoria-cliente-boton" @click="actualizarSucursal">Actualizar</button>
            </div>
        </div>
       </div>
 
    </form>
    
  </div>
   <br>
   <div class="table-responsive mx-auto">
     
 <table class="table table-bordered table-hover">
   <thead>
     <tr>
       <th scope="col">#</th>
       <th scope="col">Sucursales</th>
       <th scope="col">Editar</th>
     </tr>
   </thead>
 
   <tbody class="table-group-divider" id="contenido">
    
     <tr v-if="cargando">
       <td colspan="6"><h3>Cargando...</h3></td>
     </tr>
     <tr  v-else v-for="suc, i in sucursales" :key="suc.id">
       <td v-text="(i+1)" :class="{ 'tabla-fila-seleccionada': filaSeleccionada === suc.IDSUCURSAL }"></td>
       <td v-text="suc.NOMBRESUCURSAL" :class="{ 'tabla-fila-seleccionada': filaSeleccionada === suc.IDSUCURSAL }"></td>
       <td :class="{ 'tabla-fila-seleccionada': filaSeleccionada === suc.IDSUCURSAL }">
         &nbsp;
         <button class="btn btn-info" v-on:click="$event => selectSucursal(suc.IDSUCURSAL, suc.NOMBRESUCURSAL, suc.DIRECCIONSUCURSAL, suc.TELEFONOSUCURSAL, suc.CORREOSUCURSAL)">
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
 import {validarEmail, validarImput, validarNumero} from '../Funciones/validacionDato'
 import {enviarSolicitud} from '../Funciones/actualizarRegistro'
 
 
 
 
 
 export default {
   components: {
     
   },
   data() {
     return {
       sucursales: null, // Almacena la categoría de clientes cargada desde la API
       cargando: false, // Indica si se está realizando la carga o no
       divEditar: false,
       filaSeleccionada: null,
       idSucursal: null,
       nombreSucursal: '',
       direccionSucursal:'',
       telefonoSucursal:'',
       correoSucursal:'',
       cargando: false
 
     };
   },
   mounted() {
     // Se llama al método getSucursales() cuando el componente se monta en la página
     this.getSucursales();
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
             
             alerError('Error al cargar la categoría de cliente.');
 
           });
     },
 
     selectSucursal(id, nombre, direccion, telefono, correo) {
       this.nombreSucursal = nombre;
       this.idSucursal = id;
       this.direccionSucursal = direccion;
       this.telefonoSucursal = telefono;
       this.correoSucursal = correo;
       this.filaSeleccionada = id;
       this.divEditar = true;
       this.$nextTick(() => {
         this.filaSeleccionada = id;
       const nombreCategory = document.getElementById('nombreSucursal');
       const direccionSuc = document.getElementById('direccionSucursal');
       const telefonoSuc = document.getElementById('telefonoSucursal');
       const correoSuc = document.getElementById('correoSucursal');
       if (nombreCategory) {
         nombreCategory.value = nombre;
         direccionSuc.value = direccion;
         telefonoSuc.value = telefono;
         correoSuc.value = correo;

       }
     });
 },
 
 actualizarSucursal(){
   console.log(this.idSucursal)
   console.log( this.nombreSucursal);
 
   //preventDefault() no hace el submit hasta que los campos esten llenos
   event.preventDefault();                                                               //Dato en el inputText
       var nomSucursal = validarImput('nombre sucursal', 'nombreSucursal',this.nombreSucursal);
       var dirSucursal = validarImput('dirección sucursal', 'direccionSucursal',this.direccionSucursal);
       var telSucursal = validarNumero('telefono sucursal', 'telefonoSucursal', this.telefonoSucursal);
       var correo = validarEmail('correo sucursal', 'correoSucursal', this.correoSucursal);
       if (nomSucursal && dirSucursal && telSucursal && correo) { 
         var url = 'http://127.0.0.1:8000/api/sucursal/'+this.idSucursal;
         var parametros = {
            NOMBRESUCURSAL:this.nombreSucursal.trim(),
            DIRECCIONSUCURSAL:this.direccionSucursal.trim(),
            TELEFONOSUCURSAL:this.telefonoSucursal.trim(),
            CORREOSUCURSAL:this.correoSucursal.trim()
        }
         enviarSolicitud('PUT', parametros,url, 'Sucursal Actualizada!!');
       }
       this.cargando = false;
      
     },
 
   }
 };
 
 </script>