<template>
  <div class="row mb-3">
    <div class="col-xl-3 col-sm-6 py-2">
      <div class="card bg-success text-white h-100">
        <div class="card-body bg-success">
          <div class="rotate">
            <i class="fa fa-briefcase fa-4x"></i>
          </div>
          <h6 class="text-uppercase">Medicamentos</h6>
          <h1 class="display-4">{{totalMedicamentos}}</h1>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 py-2">
      <div class="card text-white bg-danger h-100">
        <div class="card-body bg-danger">
          <div class="rotate">
            <i class="fa fa-industry fa-4x"></i>
          </div>
          <h6 class="text-uppercase">Centros</h6>
          <h1 class="display-4">{{totalCentros}}</h1>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 py-2">
      <div class="card text-white bg-info h-100">
        <div class="card-body bg-info">
          <div class="rotate">
            <i class="fa fa-address-card fa-4x"></i>
          </div>
          <h6 class="text-uppercase">Proveedores</h6>
          <h1 class="display-4">{{totalProveedores}}</h1>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 py-2">
      <div class="card text-white bg-warning h-100">
        <div class="card-body">
          <div class="rotate">
            <i class="fa fa-user fa-4x"></i>
          </div>
          <h6 class="text-uppercase">Usuarios</h6>
          <h1 class="display-4">{{totalUsers}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../assets/Common'

export default {
  data () {
    return {
      title: 'Dashboard',
      totalProveedores: 0,
      totalCentros: 0,
      totalMedicamentos: 0,
      totalUsers: 0
    }
  },

  methods: {
    getTotals () {
      http
        .get('/inventario/contadores')
        .then(response => {
          this.totalProveedores = response.data.totalProveedores
          this.totalCentros = response.data.totalCentros
          this.totalMedicamentos = response.data.totalMedicamentos
          this.totalUsers = response.data.totalUsers
        })
        .catch(e => {
          console.log(e)
        })
    }
  },

  mounted () {
    this.getTotals()
  }

}

</script>

<style scoped>

</style>
