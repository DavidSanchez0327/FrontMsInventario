<template>
    <div>


        <table id="firstTable">
            <thead>
            <tr>
                <th>Imagen</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acción</th>
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
                <td>
                    <button v-if="loged" v-on:click="editar(medicamento)" class="btn btn-success mr-2">Editar</button>
                    <button v-if="loged" v-on:click="eliminar(medicamento.codigo)" class="btn btn-danger">Eliminar</button>
                </td>

            </tr>
            </tbody>
        </table>
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
                loged: false
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

            eliminar: (codigo) => {
                console.log(codigo);
                http
                    .post('/medicamentos/eliminar/'+codigo)
                    .then(res => {
                        alert(res.data);
                    }).catch(err => {
                        alert("No eliminado "+err);
                });

            },
            refreshList() {
                this.getMedicamentos();
            }
            /* eslint-enable no-console */
        },
        mounted() {

            let usuario = localStorage.getItem("usuario");
            if(usuario !== null){
                this.loged = true;
                console.log(this.loged);
            }

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
