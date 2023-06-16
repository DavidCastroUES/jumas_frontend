import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles.css';
import './assets/ventanaEmergente.css';
import './assets/cargaSpinner.css';

createApp(App).use(store).use(router).mount('#app')
import 'bootstrap/dist/js/bootstrap'

