<template>
    <div class=" row justify-left cliente-barra-nav-form">
      
      <div class="col-md-5">

        <div class="card tarjeta-encabezado w-100 mx-auto ml-6">
         <div class="card-body">
          Gestionar Cliente
          </div>
        </div>
        <br>
          <body>
          <div class="card card rounded-0">
            <div class="card-body ">
              <!-- <h5 class="card-title">Título de la Card</h5>
              <p class="card-text">Contenido de la card.</p> -->
              <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary " @click="abrir">
                    <i class="fa-solid fa-list"></i>
                  </button>
                  <ModalAlert v-if="showModal" :title="modalTitle" :datos="datos" @close="cerrar" @capturar-id="capturarId" />

                  <button type="button" class="btn btn-secondary tamaño-nav-clienteboton" @click="showForm = true; showFormAdd = false; showFormEdit = false; showFormDelete = false">Ver</button>
                  <button type="button" class="btn btn-secondary tamaño-nav-clienteboton" @click="showFormAdd = true; showForm = false; showFormEdit = false; showFormDelete = false">Agregar</button>
                  <button type="button" class="btn btn-secondary tamaño-nav-clienteboton" @click="showFormEdit = true; showFormAdd = false; showForm = false; showFormDelete = false">Editar</button>
                  <button type="button" class="btn btn-secondary tamaño-nav-clienteboton" @click="showFormDelete = true; showFormEdit = false; showFormAdd = false; showForm = false">Eliminar</button>
              </div>
           </div>
         </div>
       </body>
      </div>
       <ClienteViewView v-if="showForm" />
       <ClienteAdd v-if="showFormAdd" />
       <ClienteEditView v-if="showFormEdit" />
       <ClienteDeleteView v-if="showFormDelete" />
      <div>
    </div>
   
</div>

</template>

<script>

import ModalAlert from '../VentanaEmergente/PrivUsuarioVentanaEmerg.vue'//importa la ventana emergente diseñada
import ClienteAdd  from '../Cliente/ClienteAddView.vue'
import ClienteEditView from '../Cliente/ClienteEditView.vue'
import ClienteDeleteView from '../Cliente/ClienteDeleteView.vue'
import ClienteViewView from '../Cliente/ClienteViewView.vue'
import MisPrivilegios from '../Funciones/privilegioDusuario'



export default {
  components: {
    ModalAlert,
    ClienteViewView,
    ClienteAdd,
    ClienteEditView,
    ClienteDeleteView,
    
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
    };
  },
  methods: {

    navigateTo(routeName) {
      console.log(this.$router);
      this.$router.push({ name: routeName });
      console.log(this.$router);
    },

    //OnClick, boton en el formulario de este formulario
    abrir() {
      this.showModal = true;
    },
    cerrar() {
      this.showModal = false;
    },
    
  }
};

</script>


