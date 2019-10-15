<template>
  <div class="mt-2">
    <h4 style="margin-bottom: 5px">Proveedores</h4>
    <button v-on:click="addProveedor" class="btn btn-danger btn-lg pull-right mb-2" role="button"><i class="fa fa-plus"></i></button>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Dirección</th>
        <th scope="col">Ciudad</th>
        <th scope="col">Contacto</th>
        <th scope="col">Opciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(proveedor, i) in proveedores" :key="i">
        <td>{{proveedor.name}}</td>
        <td>{{proveedor.address}}</td>
        <td>{{proveedor.city}}</td>
        <td>{{proveedor.phone}}</td>
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
      title: 'Proveedores',
      proveedores: []
    }
  },

  methods: {
    getProveedores () {
      http
        .get('/inventario/proveedores')
        .then(response => {
          this.proveedores = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    addProveedor () {
      this.$router.push('add_proveedor')
    }
  },

  mounted () {
    this.getProveedores()
  }

}

</script>

<style scoped>

</style>
