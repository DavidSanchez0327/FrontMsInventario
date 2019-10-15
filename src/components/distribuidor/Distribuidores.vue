<template>
  <div class="mt-2">
    <h4 style="margin-bottom: 5px">{{title}}</h4>
    <button class="btn btn-danger btn-lg pull-right mb-2" role="button"><i class="fa fa-plus"></i></button>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Dirección</th>
        <th scope="col">Ciudad</th>
        <th scope="col">Opciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(centro, i) in centros" :key="i">
        <td>{{centro.name}}</td>
        <td>{{centro.address}}</td>
        <td>{{centro.city}}</td>
        <td>
          <button disabled class="btn btn-primary btn-lg" role="button"><i class="fa fa-edit"></i></button>
          <button disabled class="btn btn-danger btn-lg" role="button"><i
            class="fa fa-trash"></i></button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import http from '../../assets/Common'

export default {
  data () {
    return {
      title: 'Centros de distribución',
      centros: []
    }
  },

  methods: {
    getCentros () {
      http
        .get('/inventario/puntosDistribucion')
        .then(response => {
          this.centros = response.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  },

  mounted () {
    this.getCentros()
  }
}

</script>

<style scoped>

</style>
