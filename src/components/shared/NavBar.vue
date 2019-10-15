<template>
  <nav id="navbar" class="navbar navbar-expand-md  navbar-dark">
    <img id="imgCruz" src="http://www.masadmin.net/imgs/icon7.png"
      alt="image">
    <ul class="navbar-nav flex-row w-100">
      <li class="nav-item px-2 mr-auto active">
        <h2 id="title">Inventario</h2>
      </li>
      <li v-if="auth==''" class="nav-item px-2">
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
      <li v-if="auth=='loggedin'" class="nav-item px-2">
        <a class="nav-link" href="" v-on:click="logout">Salir</a>
      </li>
      <li v-if="auth==''" class="nav-item px-2">
        <router-link class="nav-link" to="/registro">Registrar</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

import EventBus from './EventBus'

export default {
  data () {
    return {
      auth: ''
    }
  },

  methods: {
    logout () {
      localStorage.removeItem('usertoken')
    }
  },

  mounted () {
    const token = localStorage.usertoken
    if (token !== undefined) this.auth = 'loggedin'
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
}
</script>

<style scoped>
  #imgCruz{
    height: 50px;
    width: 50px;
    margin-right: 5px;
  }
  #navbar{
    background-color: #6991E1;
  }
  #title{
    color: white;
  }
</style>
