import { createRouter, createWebHistory } from 'vue-router'
import CategoriaClienteUpdateView from '../views/CategoriaCliente/CategoriaClienteUpdateView'
import CategoriaClienteDeleteView from '../views/CategoriaCliente/CategoriaClienteDeleteView'
import BarraNavCc from '../views/CategoriaCliente/CatClienteBarraNav'
//import VentanaEmerg from '../views/VentanaEmergente/VentanaEmerg'
import BarraNavClinete from '../views/Cliente/ClienteBarraNav'


import SucursalAddView from '../views/Sucursal/SucursalAddView'
import SucursalBarraNav from '../views/Sucursal/SucursalBarraNav'
import SucursalDeleteView from '../views/Sucursal/SucursalDeleteView'
import SucursalEditView from '../views/Sucursal/SucursalEditView'
import SucursalUpdateView from '../views/Sucursal/SucursalUpdateView'
import SucursalViewView from '../views/Sucursal/SucursalViewView'


const routes = [
  
  {
    // path: '/catClienUpdate/:id',
    path: '/catClienUpdate',
    name: 'catClienUpdate',
    component: CategoriaClienteUpdateView
  },
  {
    // path: '/catClienUpdate/:id',
    path: '/catClienDelete',
    name: 'catClienDelete',
    component: CategoriaClienteDeleteView
  },
 
 
  {
    // path: '/catClienUpdate/:id',
    path: '/barraNave_cc',
    name: 'barraNave_cc',
    component: BarraNavCc
  },
  {
    // path: '/catClienUpdate/:id',
    path: '/barraNave_clie',
    name: 'barraNave_clie',
    component: BarraNavClinete
  },
  // {
  //   // path: '/catClienUpdate/:id',
  //   path: '/ventanaEm',
  //   name: 'ventanaEm',
  //   component: VentanaEmerg
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }

  //Sucursal routes
  {
    path: '/SucursalAdd',
    name: 'SucursalAdd',
    component: SucursalAddView
  },
  {
    path: '/SucursalBarra',
    name: 'SucursalBarra',
    component: SucursalBarraNav
  },
  {
    path: '/SucursalDelete',
    name: 'SucursalDelete',
    component: SucursalDeleteView
  },
  {
    path: '/SucursalEdit',
    name: 'SucursalEdit',
    component: SucursalEditView
  },
  {
    path: '/SucursalUpdate',
    name: 'SucursalUpdate',
    component: SucursalUpdateView
  },
  {
    path: '/SucursalView',
    name: 'SucursalView',
    component: SucursalViewView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
