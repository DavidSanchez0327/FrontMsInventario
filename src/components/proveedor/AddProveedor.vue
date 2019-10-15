<template>
  <div class="container mb-4">
    <div class="row">
      <div class="col-md-12 mt-5 mx-auto">
        <form id="createForm" @submit.prevent="accion">
          <h1 class="h3 mb-4 font-weight-normal" style="text-align: center">{{title}}</h1>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" name="name" v-model="proveedor.name" class="form-control"
                       placeholder="Ingrese el combre" required>
              </div>
              <div class="form-group">
                <label for="address">Dirección</label>
                <input type="text" name="address" v-model="proveedor.address" class="form-control"
                       placeholder="Ingrese la dirección" required>
              </div>
              <div class="form-group">
                <label for="phone">Telefono</label>
                <input type="text" name="phone" v-model="proveedor.phone" class="form-control"
                       placeholder="Ingrese un telefono" required>
              </div>
              <div class="form-group">
                <label for="sel1">Ciudad</label>
                <select class="form-control" id="sel1" v-model="citySelect" required>
                  <option v-for="(ciudad, i) of ciudades" :key="i">{{ciudad}}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div v-if="!edit" class="col-md-2 mx-auto mt-4">
                <button class="btn btn-lg btn-primary btn-block">Guardar</button>
              </div>
              <div v-if="edit" class="col-md-2 mx-auto mt-4">
                <button class="btn btn-lg btn-primary btn-block">Actualizar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import http from '../../assets/Common'

export default {
  data () {
    return {
      title: 'Registrando proveedor',
      proveedor: {
        name: '',
        address: '',
        phone: '',
        city: ''
      },
      ciudades: ['Medellin', 'Bogotá', 'Cordoba', 'Bucaramanga', 'Cali'],
      edit: false,
      accion: this.createProvedor,
      citySelect: ''
    }
  },

  methods: {

    createProvedor () {
      this.proveedor.city = this.ciudades.find(city => this.citySelect === city)

      console.log(this.proveedor)

      http
        .post('/inventario/proveedores', this.proveedor)
        .then(response => {
          if (response.data.error) {
            this.$swal.fire('¡Opps!',
              response.data.error)
          } else {
            this.$swal.fire('¡Hecho!',
              response.data.message)
            this.$router.push('proveedores')
          }
        })
        .catch(e => {
          console.log(e)
        })
    }

  }

}
</script>

<style scoped>

</style>
