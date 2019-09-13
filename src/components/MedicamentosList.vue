<template>
    <div class="container row-fluid">
        <div v-if="!submitted">
        <table id="firstTable" class="table table-striped">
            <thead id="colms">
            <tr class="accordion-toggle">
                <th>Imagen</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>PrecioCompra</th>
                <th>PrecioVenta</th>
                <th>Proveedor</th>
                <th>Categoria</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="medicamento in medicamentos">
                <td>
                    <img :src=medicamento.imagen rounded="circle" alt="image" class="img-responsive" height="70" width="90" />
                </td>
                <td>{{medicamento.codigo}}</td>
                <td>{{medicamento.nombre}}</td>
                <td>${{medicamento.precioCompra}}</td>
                <td>${{medicamento.precioVenta}}</td>
                <td>{{medicamento.proveedor.nombre}}</td>
                <td>{{medicamento.categoria.nombre}}</td>
                <td>
                    <button v-if="loged" name="edi" v-on:click="editar(medicamento)" disabled class="btn btn-success mr-2">Editar</button>
                    <button v-if="loged" v-on:click="eliminar(medicamento.codigo)" class="btn btn-danger">Eliminar</button>
                </td>

            </tr>
            </tbody>
        </table>
        </div>
        <div v-else class="text-center">
            <h4 class="mb-3">Medicamento eliminado!</h4>
            <button class="btn btn-success" v-on:click="volver">Volver</button>
        </div>

    </div>

</template>

<script>
    import http from "../http-common";
    import Vue from 'vue';
    import BootstrapVue from 'bootstrap-vue';

    import AddMedicamento from './AddMedicamento';

    import EventBus from './bus';

    Vue.use(BootstrapVue);

    export default {
        name: "medicamentos-list",
        data() {
            return {
                medicamentos: [],
                loged: false,
                submitted: false,
            };
        },
        components: {
            AddMedicamento
        },
        methods: {
            /* eslint-disable no-console */
            getMedicamentos() {
                http
                    .get("/medicamentos")
                    .then(response => {
                        this.medicamentos = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            editar(medicamento){
                console.log(medicamento);
                //this.edit = true;
                EventBus.$emit('medicamento', medicamento);
                this.$router.push("/medicamentos/actualizar");
            },

            eliminar(codigo){
                console.log(codigo);
                http
                    .post('/medicamentos/eliminar/'+codigo)
                    .then(res => {
                        this.submitted = true;
                    }).catch(err => {
                        alert("No eliminado "+err);

                });

            },
            refreshList() {
                this.getMedicamentos();
            },

            volver() {
                this.submitted = false;
                this.getMedicamentos();
            }
            /* eslint-enable no-console */
        },
        mounted() {

            let usuario = localStorage.getItem("usuario");
            if(usuario !== null){
                this.loged = true;
            }

            this.getMedicamentos();
        },

    };
</script>

<style>
    #firstTable {
        text-align: center;
        max-width: 100%;
        margin: auto;
    }
    #firstTable #colms{
        padding-left: 440px;
    }
</style>
