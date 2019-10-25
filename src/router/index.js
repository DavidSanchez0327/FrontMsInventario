import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Medicamentos from '@/components/medicamento/Medicamentos'
import AddMedicamento from '@/components/medicamento/AddMedicamento'
import Dashboard from '@/components/reporte/Dashboard'
import Distribuidores from '@/components/distribuidor/Distribuidores'
import Proveedores from '@/components/proveedor/Proveedores'
import AddProveedor from '@/components/proveedor/AddProveedor'
import Login from '@/components/usuario/Login'
import Registro from '@/components/usuario/Registro'
import Pedidos from '@/components/pedido/Pedidos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/medicamentos',
      name: 'Medicamentos',
      component: Medicamentos
    },
    {
      path: '/add_medicamento',
      name: 'AddMedicamento',
      component: AddMedicamento
    },
    {
      path: '/editar_medicamento/:code',
      name: 'EditMedicamento',
      component: AddMedicamento
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/centros',
      name: 'Centros',
      component: Distribuidores
    },
    {
      path: '/proveedores',
      name: 'Proveedores',
      component: Proveedores
    },
    {
      path: '/add_proveedor',
      name: 'AddProveedor',
      component: AddProveedor
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: Pedidos
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registro
    }
  ]
})
