<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal mb-5" style="text-align: center">{{title}}</h1>
          <div class="form-group">
            <input type="email" v-model="email" class="form-control" name="email" placeholder="Correo" required>
          </div>
          <div class="form-group">
            <input type="password" v-model="password" class="form-control" name="password" placeholder="Contraseña" required>
          </div>
          <div class="row">
            <div class="col-md-3 mt-3 mx-auto">
              <button class="btn btn-lg btn-primary btn-block">Ingresar</button>
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
import EventBus from '../shared/EventBus'

export default {
  data () {
    return {
      title: 'Inicio de sesion',
      email: '',
      password: ''
    }
  },

  methods: {
    login () {
      http.post('login', {
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.error) {
          this.$swal.fire('¡Opps!',
            res.data.error)
        } else {
          this.$swal.fire('¡Hecho!',
            res.data.message)
          localStorage.setItem('usertoken', res.data.token)
          this.emitMethod()
          this.email = ''
          this.password = ''
          router.push({ name: 'Medicamentos' })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}

</script>

<style scoped>

</style>
