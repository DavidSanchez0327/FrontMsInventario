<template>
    <div class="container row-fluid">
        <table id="firstTable" class="table table-striped">
            <thead id="colms">
            <tr class="accordion-toggle">
                <th>IdProveedor</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Direccion</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="proveedor in proveedores">
                <td>{{proveedor.idProveedor}}</td>
                <td>{{proveedor.nombre}}</td>
                <td>{{proveedor.telefono}}</td>
                <td>{{proveedor.correo}}</td>
                <td>{{proveedor.direccion}}</td>
                <td>
                    <button v-if="loged" v-on:click="editar(proveedor)" class="btn btn-success mr-2" disabled>Editar</button>
                    <button v-if="loged" v-on:click="eliminar(proveedor.idProveedor)" class="btn btn-danger" disabled>Eliminar</button>
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
        name: "proveedores-list",
        data() {
            return {
                proveedores: [],
                loged: false
            };
        },
        components: {
            //AddMedicamento
        },
        methods: {
            /* eslint-disable no-console */
            getProveedores() {
                http
                    .get("/proveedores")
                    .then(response => {
                        this.proveedores = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            editar(proveedor){
                console.log(proveedor);
                //this.edit = true;
                EventBus.$emit('centro', proveedor);
                this.$router.push("/proveedor/actualizar");
            },

            eliminar: (idProveedor) => {
                console.log(idProveedor);
                http
                    .post('/proveedores/eliminar/'+idProveedor)
                    .then(res => {
                        alert(res.data);
                    }).catch(err => {
                    alert("No eliminado "+err);
                });

            },
            refreshList() {
                this.getProveedores();
            }
            /* eslint-enable no-console */
        },
        mounted() {

            let usuario = localStorage.getItem("usuario");
            if(usuario !== null){
                this.loged = true;
            }

            this.getProveedores();
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
