<template>
  <div class="d-flex row justify-content-center">
    
    <div class="col-md-5">

      <div class="card tarjeta-encabezado w-100 mx-auto ml-6">
       <div class="card-body">
        Gestionar sucursales
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
            
                  <button type="button" class="btn btn-secondary tamaño-boton" @click="showForm = true; showFormAdd = false; showFormEdit = false; showFormDelete = false">Ver</button>
                  <button type="button" class="btn btn-secondary tamaño-boton" @click="showFormAdd = true; showForm = false; showFormEdit = false; showFormDelete = false">Agregar</button>
                  <button type="button" class="btn btn-secondary tamaño-boton" @click="showFormEdit = true; showFormAdd = false; showForm = false; showFormDelete = false">Editar</button>
                  <button type="button" class="btn btn-secondary tamaño-boton" @click="showFormDelete = true; showFormEdit = false; showFormAdd = false; showForm = false">Eliminar</button>
              </div>
           </div>
         </div>
       </body>
       <SucursalViewView v-if="showForm" />
       <SucursalAddView v-if="showFormAdd" />
       <SucursalEditView v-if="showFormEdit" />
       <SucursalDeleteView v-if="showFormDelete" />
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

import SucursalAddView from '../Sucursal/SucursalAddView'
import SucursalDeleteView from '../Sucursal/SucursalDeleteView'
import SucursalEditView from '../Sucursal/SucursalEditView'
import SucursalUpdateView from '../Sucursal/SucursalUpdateView'
import SucursalViewView from '../Sucursal/SucursalViewView'

export default {
  components: {
    ModalAlert,
    ClienteViewView,
    ClienteAdd,
    ClienteEditView,
    ClienteDeleteView,
    SucursalAddView,
    SucursalDeleteView,
    SucursalEditView,
    SucursalViewView,
    
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