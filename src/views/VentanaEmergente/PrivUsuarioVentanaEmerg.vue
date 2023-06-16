<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ title }}</h5>
        <button type="button" class="close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-6">
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-search"></i></span>
              <input type="text" v-model="filtro" class="form-control" placeholder="Buscar">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <ul class="list-group">
              <li v-for="dato in datosFiltrados" :key="dato.id" class="list-group-item">
                <div class="d-flex align-items-center">
                  <div class="me-3"><i :class="dato.icono"></i></div>
                  <div>{{ dato.texto }}</div>
                  <div class="ms-auto">
                    <button class="btn btn-primary btn-sm" @click="capturarId(dato.id)">Gestionar</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myRedirect from '../Funciones/myRedirect';
export default {
  name: 'ModalAlert',
  props: {
    title: {
      type: String,
      required: true
    },
    datos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filtro: ''
    };
  },
  computed: {
    datosFiltrados() {
      if (!this.filtro) {
        return this.datos;
      }
      const filtroLower = this.filtro.toLowerCase();
      return this.datos.filter(dato => dato.texto.toLowerCase().includes(filtroLower));
    }
  },
  methods: {
   
    capturarId(id) {
      this.$emit('capturar-id', id);
      this.closeModal();
      myRedirect.methods.redireccion.call(this, id);
    },
//clseModal se esta utilizando en la funcion capturarId para serrar la ventana
    closeModal() {
      this.$emit('close');
    },
  }
};
</script>


