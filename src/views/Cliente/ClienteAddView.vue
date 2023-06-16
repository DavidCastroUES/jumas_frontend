<template>
  <div class="v-container">
     <form @submit.prevent="submitForm">
        <div class="row">
            <div class="col-md-5">
                  <!-- Columna 1: Input Text -->
                  <br>
                  <div class="form-group">
                      <select class="form-control ancho-text-input" v-model="selectedOption">
                      <option disabled value="">Selecciona una opción</option>
                      <option v-for="catCliente in catClientejson" :value="catCliente.IDCATEGORIACLIEN" :key="catCliente.IDCATEGORIACLIEN">{{ catCliente.NOMBRECATEGORIA }}</option>
                      <!-- {{ option.NOMBRECATEGORIA }} -->
                    </select>
                      <!-- <p>Opción seleccionada: {{ selectedOption }}</p> -->
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group text-left">
                        <label class="formulario-container">Primer Nombre</label>
                        <input v-model="primNom" type="text" class="form-control ancho-text-input" name="primerNombre" id ="primerNombre">
                      </div>
                      <div class="form-group text-left">
                        <label >Primer Apellido</label>
                        <input v-model="primerApell" type="text" class="form-control ancho-text-input" name="primerApelli" id="primerApelli">
                      </div>
                      <div class="form-group text-left">
                        <label>Apellido Casada</label>
                        <input v-model="apellCasa" type="text" class="form-control ancho-text-input">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group text-left">
                        <label>Segundo Nombre</label>
                        <input v-model="seguNom" type="text" class="form-control ancho-text-input">
                      </div>
                      <div class="form-group text-left">
                        <label>Segundo Apellido</label>
                        <input v-model="segunApell" type="text" class="form-control ancho-text-input">
                      </div>
                      <div class="form-group text-left">
                        <label>Número de DUI</label>
                        <input v-model="numeroDui" type="text" class="form-control ancho-text-input" name="dui" id="dui">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                      <div class="form-group text-left">
                        <label>Nombre Completo</label>
                        <input  type="text" class="form-control ancho-text-input" :value="nombreCompleto" readonly>
                      </div>
                    </div>
                
              </div>
              <div class="col-md-6">
                  <!-- Columna 2: Checkbox y RadioButton -->
                  <div class="form-group text-left">
                    <label>Checkbox</label>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="checkbox1" >
                      <label class="form-check-label" for="checkbox1">Opción 1</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="checkbox2">
                      <label class="form-check-label" for="checkbox2">Opción 2</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Radio Button</label>
                    <div class="form-check">
                      <input type="radio" class="form-check-input" id="radio1" value="option1">
                      <label class="form-check-label" for="radio1">Opción 1</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" class="form-check-input" id="radio2" value="option2">
                      <label class="form-check-label" for="radio2">Opción 2</label>
                    </div>
                  </div>
                <!-- Añade más checkboxes y radio buttons aquí -->
        
              </div>
              <button class="btn btn-primary categoria-cliente-boton" @click="guardar">Guardar</button>

        </div>

    </form>
  </div>
 
</template>

<script>
import axios from 'axios';
import {alerError} from '../Funciones/alertSwal'
import {enviarSolicitud} from '../Funciones/ingresarRegistro'
import {validarImput} from '../Funciones/validacionDato'
import {validarDui} from '../Funciones/validacionDatoCliente'

export default {
  data() {
    return {
      catClientejson: [], // Inicialmente, el array de opciones está vacío
      //options: ['Opción 1', 'Opción 2', 'Opción 3'],
      selectedOption: '',
      primNom: '',
      primerApell:'',
      apellCasa:'',
      seguNom:'',
      segunApell:'',
      numeroDui:'',
    };
  },

  computed: {
    nombreCompleto() {
      const primerA = this.primerApell.replace(/\s+/g, '');
      const segundoA = this.segunApell.replace(/\s+/g, '');
      var apellidoC = this.apellCasa.replace(/\s+/g, '');
      const primerN = this.primNom.replace(/\s+/g, '');
      const segundoN = this.seguNom.replace(/\s+/g, '');
      if (this.apellCasa != '') {
        apellidoC  = " De " + apellidoC;
      }else
      apellidoC = "";
      return primerA +" "+ segundoA + apellidoC +" "+ primerN +" "+ segundoN;
    }
  },

  mounted() {
    this.getCategoriaCliente();
  },
  methods: {
    submitForm() {
      // Lógica para enviar el formulario
    },
    getCategoriaCliente(){
      this.cargando = true; // Se establece el indicador de carga en true
      axios.get('http://127.0.0.1:8000/api/catCliente')
        .then(res => {
          // La solicitud es exitosa, se asigna la respuesta a categoriaCli
          console.log(res.data)
          this.catClientejson = res.data;
        })
          .catch(error => {
            // Se produce un error en la solicitud HTTP
            this.cargando = false; // Se restablece el indicador de carga a false
            console.log(error); // Se muestra el error en la consola para depuración
            
            alerError('Error al cargar la categoría de cliente.');

          });
    },
        guardar(){
      //preventDefault() no hace el submit hasta que los campos esten llenos
      event.preventDefault();                                                               //Dato en el inputText
      var nombreC = validarImput('nombre del cliente', 'primerNombre',this.primNom);
      var pimerApellido = validarImput('apellido del cliente', 'primerApelli',this.primerApell);
      var numDui = validarDui('dui',this.numeroDui);
      
      if (nombreC && pimerApellido && numDui) { 
        console.log(true);
        // var parametros = {NOMBRECATEGORIA:this.nombreCategoriaCliente.trim(), ELIMINADO:0}
        // this.cargando = true;
        // enviarSolicitud('POST', parametros, this.url, 'Categoria Ingresada!!');
      }
     
      // else
      // var pimerApellido = validarImput('apellido del cliente', ' primerApelli',this.primerApell);

      
    },
  }
};

</script>
