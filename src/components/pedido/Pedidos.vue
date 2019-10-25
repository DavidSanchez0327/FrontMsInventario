<template>
  <div class="col-md-12">
    <div class="mt-2 center-block">
      <h4 style="margin-bottom: 5px">Lista de pedidos</h4>
      <div v-for="(pedido, i) in pedidos.data" :key="i">
        <h5 style="padding-top: 20px; color: #6991E1">Estado: {{pedido.state}}, N° del pedido: {{pedido.numberPedido}}</h5>
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">Medicamento</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio unidad</th>
            <th scope="col">Fecha solicitud</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(itemPedido, i) in pedido.items" :key="i">
            <td>{{itemPedido.name}}</td>
            <td>{{itemPedido.quantity}}</td>
            <td>${{itemPedido.price}}</td>
            <td>{{pedido.date | formatDate}}</td>
          </tr>
          </tbody>
        </table>
        <h5 style="color: red">Total: ${{pedido.total}}</h5>
        <button v-if="pedido.state != 'Aprobado'" :disabled="!isAuth ? '' : disabled" class="btn btn-success btn-lg" style="text-align: center" v-on:click="actualizarPedido(pedido)" role="button">Aprobar</button>
      </div>
    </div>
  </div>
</template>

<script>

  import http from '../../assets/Common'

  export default {

    data() {
      return {
        title: 'Pedidos',
        pedidos: [],
        estado: "Aprobado",
        isAuth: false
      }
    },
    mounted() {
      const token = localStorage.usertoken;
      if (token) this.isAuth = true;
      this.getPedidos()
    },

    methods: {
      getPedidos() {
        http
          .get('/inventario/pedidos')
          .then(response => {
            this.pedidos = response // JSON are parsed automatically.
          })
          .catch(e => {
            console.log(e)
          })
      },

      actualizarPedido(pedido){
        console.log("Pedido para aprobar: ", pedido);
        pedido.state = this.estado;
        http
          .put('/inventario/pedidos/'+pedido.numberPedido, pedido)
          .then(response => {
            if (response.data.error) {
              this.$swal.fire('¡Opps!',
                response.data.error)
            } else {
              this.$swal.fire('¡Hecho!',
                response.data.message);
              this.getPedidos();
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
