<template>
    <div class="container row-fluid">
        <table id="firstTable" class="table table-striped">
            <thead id="colms">
            <tr class="accordion-toggle">
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Localizacion</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="centro in centros">
                <td>{{centro.codigo}}</td>
                <td>{{centro.nombre}}</td>
                <td>{{centro.localizacion}}</td>
                <td>
                    <button v-if="loged" v-on:click="editar(centro)" class="btn btn-success mr-2" disabled>Editar</button>
                    <button v-if="loged" v-on:click="eliminar(centro.codigo)" class="btn btn-danger" disabled>Eliminar</button>
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

    //import AddCentro from './AddMedicamento';

    import EventBus from './bus';

    Vue.use(BootstrapVue);

    export default {
        name: "centros-list",
        data() {
            return {
                centros: [],
                loged: false
            };
        },
        components: {
            //AddMedicamento
        },
        methods: {
            /* eslint-disable no-console */
            getCentros() {
                http
                    .get("/distribucion")
                    .then(response => {
                        this.centros = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            editar(centro){
                console.log(centro);
                //this.edit = true;
                EventBus.$emit('centro', centro);
                this.$router.push("/centros/actualizar");
            },

            eliminar: (codigo) => {
                console.log(codigo);
                http
                    .post('/distribucion/eliminar/'+codigo)
                    .then(res => {
                        alert(res.data);
                    }).catch(err => {
                    alert("No eliminado "+err);
                });

            },
            refreshList() {
                this.getCentros();
            }
            /* eslint-enable no-console */
        },
        mounted() {

            let usuario = localStorage.getItem("usuario");
            if(usuario !== null){
                this.loged = true;
                console.log(this.loged);
            }

            this.getCentros();
        }
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
