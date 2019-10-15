<template>
  <div class="col-md-12">
    <div class="mt-2 center-block">
      <h4 style="margin-bottom: 5px">Lista de medicamentos</h4>
      <button :disabled="!isAuth ? '' : disabled" v-on:click="addMedicamento" class="btn btn-danger btn-lg pull-right mb-2" role="button"><i class="fa fa-plus"></i></button>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Codigo</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio venta</th>
          <th scope="col">Categoria</th>
          <th scope="col">Existencias</th>
          <th scope="col">Opciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(medicamento, i) in medicamentos.data" :key="i">
          <td>
            <img :src=medicamento.image rounded="circle" alt="image" class="img-responsive" height="70" width="90"/>
          </td>
          <td>{{medicamento.code}}</td>
          <td>{{medicamento.name}}</td>
          <td>${{medicamento.salePrice}}</td>
          <td>{{medicamento.category.name}}</td>
          <td>{{medicamento.stock}}</td>
          <td>
            <button :disabled="!isAuth ? '' : disabled" class="btn btn-primary btn-lg" v-on:click="editMedicamento(medicamento.code)" role="button"><i class="fa fa-edit"></i></button>
            <button class="btn btn-danger btn-lg" v-on:click="eliminar(medicamento.code)" role="button"><i
              class="fa fa-trash"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import http from '../../assets/Common'

export default {

  data () {
    return {
      title: 'Medicamentos',
      medicamentos: [],
      isAuth: false
    }
  },
  mounted () {
    const token = localStorage.usertoken
    if (token) this.isAuth = true
    this.getMedicamentos()
  },
  methods: {
    getMedicamentos () {
      http
        .get('/inventario/medicamentos')
        .then(response => {
          this.medicamentos = response // JSON are parsed automatically.
        })
        .catch(e => {
          console.log(e)
        })
    },

    eliminar (code) {
      this.$swal.fire({
        title: '¿Esta seguro de eliminar el medicamento?',
        text: 'Elija una opción',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        closeOnConfirm: false,
        closeOnCancel: false
      }).then(res => {
        if (res.value) {
          this.deleteMedic(code)
        }
      })
    },

    deleteMedic (code) {
      http
        .delete('/inventario/medicamentos/' + code)
        .then(response => {
          console.log(response)
          if (response.data.message) {
            this.$swal.fire('¡Hecho!',
              response.data.message)
            this.getMedicamentos()
          }
        })
        .catch(e => {
          this.$swal.fire('¡Opps!',
            'No authorization')
          console.log('Error ', e)
        })
    },

    addMedicamento () {
      this.$router.push('add_medicamento')
    },

    editMedicamento (code) {
      this.$router.push('editar_medicamento/' + code)
    }

  }

}

</script>

<style>
  #addM{

  }
</style>
