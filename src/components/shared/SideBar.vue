<template>
  <div id="sidebar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <img id="foto" :src="user.avatar || 'https://cdn150.picsart.com/upscale-245339439045212.png?r1024x1024' " alt="imagen">
        <h5 >{{user.firstName}}</h5>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/">Inicio</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/medicamentos">Medicamentos</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/pedidos">Pedidos</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/centros">Centros de distribución</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/proveedores">Proveedores</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import jwtDecode from 'jwt-decode'
import EventBus from './EventBus'

export default {
  data () {
    return {
      name: 'fsf',
      auth: '',
      user: {}
    }
  },
  mounted () {
    const token = localStorage.usertoken
    if (token !== undefined) {
      const decoded = jwtDecode(token)
      this.user = decoded
      console.log(this.user)
    }
    EventBus.$on('logged-in', status => {
      this.auth = status
      if (status !== undefined) {
        const token = localStorage.usertoken
        if (token !== undefined) {
          const decoded = jwtDecode(token)
          this.user = decoded
          console.log(this.user)
        }
      }
    })
  }
}
</script>

<style>
  #sidebar{
    height: 100%;
    text-align: center;
  }
  #sidebar ul li .nav-link{
    color: black;
    list-style: none;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  }
  #sidebar ul li .nav-link:hover{
    background-color: #6991E1;
    color: white;
    transition: all .4s ease;
    -webkit-transition: all .4s ease;
  }
  #foto{
    width: 95px;
    height: 95px;
    border-radius: 50px;
    margin: 5px;
  }

</style>
