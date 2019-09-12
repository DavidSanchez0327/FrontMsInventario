<template>
    <div>


        <table id="firstTable">
            <thead>
            <tr>
                <th>Imagen</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Precio</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="medicamento in medicamentos">
                <td>
                    <img :src=medicamento.imagen rounded="circle" alt="image" class="img-responsive" height="70" width="90" />
                </td>
                <td>{{medicamento.codigo}}</td>
                <td>{{medicamento.nombre}}</td>
                <td>${{medicamento.precioVenta}}</td>
            </tr>
            </tbody>
        </table>


    </div>
</template>

<script>
    import http from "../http-common";
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'

    Vue.use(BootstrapVue)

    export default {
        name: "medicamentos-list",
        data() {
            return {
                medicamentos: []
            };
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
            refreshList() {
                this.getMedicamentos();
            }
            /* eslint-enable no-console */
        },
        mounted() {
            this.getMedicamentos();
        }
    };
</script>

<style>
    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }
</style>
