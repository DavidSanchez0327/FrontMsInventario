<template>
    <div v-if="this.loged" id="app" class="container-fluid">
        <div class="site-info">
            <h1>Inventario</h1>
        </div>
        <nav>
            <router-link class="btn btn-primary" to="/medicamentos">Medicamentos</router-link>
            <router-link class="btn btn-primary" to="/medicamentos/guardar">Agregar</router-link>
            <button class="btn btn-primary" @click="logout">Logout</button>

        </nav>
        <br/>
        <router-view/>
    </div>


</template>

<script>
    import firebase from "firebase";
export default {
  name: "app",


    data(){
      return {
          loged: true,
      }
    },

    methods: {
      logout() {
          firebase.auth().signOut().then( res => {
              this.$router.push('');
          })
      }
    },

    mounted() {
      this.loged = localStorage.getItem("isLoged");
    }
};
</script>

<style>
.site-info {
  color: blue;
  margin-bottom: 20px;
}

.btn-primary {
  margin-right: 5px;
}

.container-fluid {
  text-align: center;
}
</style>
