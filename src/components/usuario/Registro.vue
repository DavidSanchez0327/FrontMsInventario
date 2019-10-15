<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-4 font-weight-normal" style="text-align: center">{{title}}</h1>
          <div class="form-group">
            <input type="text" v-model="user.firstName" class="form-control" placeholder="Ingrese el combre" required>
          </div>
          <div class="form-group">
            <input type="text" v-model="user.lastName" placeholder="Ingrese apellidos" class="form-control" required>
          </div>
          <div class="form-group">
            <input type="email" v-model="user.email" placeholder="Ingrese correo" class="form-control" required>
          </div>
          <div class="form-group">
            <input type="password" v-model="user.password" placeholder="Ingrese contraseña" class="form-control"
                   required>
          </div>
          <div class="form-group">
            <label for="rol">Rol</label>
            <select class="form-control" id="rol" v-model="rol" required>
              <option v-for="(rol, i) of roles" :key="i">{{rol}}</option>
            </select>
          </div>
          <div class="row">
            <div class="col-md-3 mb-5 mx-auto">
              <button class="btn btn-lg btn-primary btn-block">Registrar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import http from '../../assets/Common'
import router from '../../router'

export default {
  data () {
    return {
      title: 'Creando usuario',
      roles: ['admin', 'farma'],
      user: {
        firstName: '',
        lastName: '',
        email: '',
        rol: '',
        password: ''
      }
    }
  },

  methods: {
    register () {
      this.user.rol = this.roles.find(rl => this.rol === rl)
      http.post('register', this.user).then(res => {
        if (res.data.error) {
          this.$swal.fire('¡Opps!',
            res.data.error)
        } else {
          this.$swal.fire('¡Hecho!',
            res.data.message)
          router.push({name: 'Login'})
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
