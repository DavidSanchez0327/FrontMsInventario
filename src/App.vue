<template>
  <div id="app">
    <NavBar></NavBar>
    <div id="menu" class="row">
      <div class="col-md-2">
        <SideBar></SideBar>
      </div>
      <div id="vistas" class="col-md-10">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import SideBar from './components/shared/SideBar'
import NavBar from './components/shared/NavBar'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {

  name: 'App',
  components: {
    SideBar,
    NavBar
  }
}
</script>

<style>
  #app{
    font-family: Arial;
  }
  #vistas{
    background-color: #edf1f5;
  }
  #menu{
    background-color: #fff;
    box-shadow: 1px 0 20px rgba(0, 0, 0, 0.8);
  }
</style>
