<template>
  <div class="container mb-4">
    <div class="row">
      <div class="col-md-12 mt-5 mx-auto">
        <form id="createForm" @submit.prevent="accion">
          <h1 class="h3 mb-4 font-weight-normal" style="text-align: center">{{title}}</h1>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="code">Código</label>
                <input :disabled="edit ? '' : disabled" type="text" name="code" v-model="medicamento.code" class="form-control" placeholder="Ingrese el codigo" required>
              </div>
              <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" v-model="medicamento.name" class="form-control" placeholder="Ingrese el combre" required>
              </div>
              <div class="form-group">
                <label for="pventa">Precio de venta</label>
                <input type="number" name="pventa" v-model="medicamento.salePrice" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="pcompra">Precio de compra</label>
                <input type="number" v-model="medicamento.purchasePrice" class="form-control" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="stock">Stock</label>
                <input name="stock" type="number" v-model="medicamento.stock" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="sel1">Categoria</label>
                <select class="form-control" id="sel1" v-model="catSelect" required>
                  <option v-for="(categoria, i) of categorias" :key="i">{{categoria.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="sel2">Proveedor</label>
                <select class="form-control" id="sel2" v-model="provSelect" required>
                  <option v-for="(proveedor, i) of proveedores" :key="i">{{proveedor.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="sel3">Centro de distribución</label>
                <select class="form-control" id="sel3" v-model="ptDistSelect" required>
                  <option v-for="(centro, i) of centros" :key="i">{{centro.name}}</option>
                </select>
              </div>
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
      title: 'Creando medicamento',
      medicamento: {
        code: '',
        name: '',
        salePrice: 0,
        purchasePrice: 0,
        stock: 0,
        category: {},
        proveedor: {},
        puntoDistribucion: {}
      },
      edit: false,
      accion: this.createMedicament,
      catSelect: '',
      provSelect: '',
      ptDistSelect: '',
      proveedores: [],
      categorias: [],
      centros: [],
      submitted: false
    }
  },

  methods: {

    createMedicament () {
      this.medicamento.proveedor = this.proveedores.find(prov => this.provSelect === prov.name)
      this.medicamento.category = this.categorias.find(cat => this.catSelect === cat.name)
      this.medicamento.puntoDistribucion = this.centros.find(ptDst => this.ptDistSelect === ptDst.name)

      http
        .post('/inventario/medicamentos', this.medicamento)
        .then(response => {
          if (response.data.error) {
            this.$swal.fire('¡Opps!',
              response.data.error)
          } else {
            this.$swal.fire('¡Hecho!',
              response.data.message)
            this.$router.push('medicamentos')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    editMedicament () {
      this.medicamento.proveedor = this.proveedores.find(prov => this.provSelect === prov.name)
      this.medicamento.category = this.categorias.find(cat => this.catSelect === cat.name)
      this.medicamento.puntoDistribucion = this.centros.find(ptDst => this.ptDistSelect === ptDst.name)

      console.log(this.medicamento)

      http
        .put('/inventario/medicamentos', this.medicamento)
        .then(response => {
          if (response.data.error) {
            this.$swal.fire('¡Opps!',
              response.data.error)
          } else {
            this.$swal.fire('¡Hecho!',
              response.data.message)
            this.$router.replace('/medicamentos')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

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

    getCategorias () {
      http
        .get('/inventario/categorias')
        .then(response => {
          this.categorias = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },

    getCentros () {
      http
        .get('/inventario/puntosDistribucion')
        .then(response => {
          this.centros = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },

    getMedicamentoByCode (code) {
      http
        .get('/inventario/medicamentos/' + code)
        .then(response => {
          this.medicamento = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },

    editar: function () {
      let code = this.$route.params.code
      if (code) {
        this.edit = true
        // eslint-disable-next-line no-undef
        $('code').prop('disabled', true)
        this.accion = this.editMedicament
        this.title = 'Actualizando medicamento'
        this.getMedicamentoByCode(code)
      }
    }

  },

  mounted () {
    this.editar()
    this.getProveedores()
    this.getCategorias()
    this.getCentros()
  }

}
</script>

<style scoped>

</style>
