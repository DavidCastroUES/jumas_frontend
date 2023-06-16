<template>
    <div class="d-flex row justify-content-center">
      <div class="col-lg-5">

        <div class="card tarjeta-encabezado w-100 mx-auto ml-6">
         <div class="card-body">
          Gestionar la categoria de cliente
          </div>
        </div>
      <br>
          <body>
          <div class="card card rounded-0">
            <div class="card-body ">
              <!-- <h5 class="card-title">Título de la Card</h5>
              <p class="card-text">Contenido de la card.</p> -->
              <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary " @click="openModal">
                    <i class="fa-solid fa-list"></i>
                  </button>
                  <ModalAlert v-if="showModal" :title="modalTitle" :datos="datos" @close="closeModal" @capturar-id="capturarId" />

                  <button type="button" class="btn btn-secondary tamaño-boton" @click="showForm = true; showFormAdd = false; showFormEdit = false; showFormDelete = false">Ver</button>
                  <button type="button" class="btn btn-secondary tamaño-boton" @click="showFormAdd = true; showForm = false; showFormEdit = false; showFormDelete = false">Agregar</button>
                  <button type="button" class="btn btn-secondary tamaño-boton" @click="showFormEdit = true; showFormAdd = false; showForm = false; showFormDelete = false">Editar</button>
                  <button type="button" class="btn btn-secondary tamaño-boton" @click="showFormDelete = true; showFormEdit = false; showFormAdd = false; showForm = false">Eliminar</button>
              </div>
           </div>
         </div>
       </body>
       <CategoriaClienteViewView v-if="showForm" />
       <CatClienteAddd v-if="showFormAdd" />
       <CategoriaClienteEditView v-if="showFormEdit" />
       <CategoriaClienteDeleteView v-if="showFormDelete" />
    </div>
</div>

</template>

<script>

import ModalAlert from '../VentanaEmergente/PrivUsuarioVentanaEmerg.vue';//importa la ventana emergente diseñada
import CategoriaClienteUpdateViewVue from '../CategoriaCliente/CategoriaClienteUpdateView.vue';
import CatClienteAddd  from '../CategoriaCliente/CategoriaClienteAddView.vue';
import CategoriaClienteEditView from '../CategoriaCliente/CategoriaClienteEditView.vue'
import CategoriaClienteDeleteView from '../CategoriaCliente/CategoriaClienteDeleteView.vue'
import CategoriaClienteViewView from '../CategoriaCliente/CategoriaClienteViewView.vue'
import MisPrivilegios from '../Funciones/privilegioDusuario'
export default {
  components: {
    ModalAlert,
    CategoriaClienteViewView,
    CatClienteAddd,
    CategoriaClienteEditView,
    CategoriaClienteDeleteView,
    
  },
  data() {
    return {
      showModal: false,
      modalTitle: 'Administrador',
      datos: MisPrivilegios,
      showForm: true,
      showFormAdd: false,
      showFormEdit: false,
      showFormDelete: false,
      ///formularioActivo: 0,
    };
  },

  
  mounted() {
  // Escucha el evento personalizado
  document.addEventListener('modificarValores', this.actualizarValores);
},

  methods: {

    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },

    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    capturarId(id) {
      console.log('ID capturado:', id);
      this.closeModal();
    },

    mostrarFormDelete(){
      showFormDelete = true;
    },

    actualizarValores(event) {
    const data = event.detail;
    // Actualiza las variables con los nuevos valores, este evento es generado desde eliminarRegistro.js
    //desde ese archivo es genrado el evento y capturado  en este punto
    this.showForm = data.showForm;
    this.showFormAdd = data.showFormAdd;
    this.showFormEdit = data.showFormEdit;
    this.showFormDelete = data.showFormDelete;
 
   
    
  },
  },

};

</script>


