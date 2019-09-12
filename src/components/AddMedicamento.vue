<template>
    <div class="submitform">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" class="form-control" id="nombre" required v-model="medicamento.nombre" name="nombre">
            </div>

            <div class="form-group">
                <label for="codigo">Código</label>
                <input type="text" class="form-control" id="codigo" required v-model="medicamento.codigo"
                       name="codigo">
            </div>

            <div class="form-group">
                <label for="precioCompra">Precio Compra</label>
                <input type="number" class="form-control" id="precioCompra" required v-model="medicamento.precioCompra"
                       name="precioCompra">
            </div>

            <div class="form-group">
                <label for="precioVenta">Precio Venta</label>
                <input type="number" class="form-control" id="precioVenta" required v-model="medicamento.precioVenta"
                       name="precioVenta">
            </div>

            <div class="form-group">
                <label for="existencias">Existencias</label>
                <input type="number" class="form-control" id="existencias" required v-model="medicamento.existencias"
                       name="existencias">
            </div>

            <div class="form-group">
                <label for="unidad">Unidad</label>
                <input type="text" class="form-control" id="unidad" required v-model="medicamento.unidad"
                       name="unidad">
            </div>

            <div class="form-group">
                <select class="form-control" id="proveedor" required v-model="provSelect">
                    <option v-for="proveedor in proveedores" v-bind:codigo="proveedor.codigo">
                        {{proveedor.nombre}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <select class="form-control" id="puntoDistribucion" required
                        v-model="ptDistSelect">
                    <option v-for="puntoDistribucion in puntosDistribucion" v-bind:codigo="puntoDistribucion.codigo">
                        {{puntoDistribucion.nombre}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <select class="form-control" id="categoria" required v-model="catSelect">
                    <option v-for="categoria in categorias" v-bind:idCategoria="categoria.idCategoria">
                        {{categoria.nombre}}
                    </option>
                </select>
            </div>

            <button v-on:click="saveMedicamento" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" v-on:click="newMedicamento">Add</button>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "add-medicamento",
        data() {
            return {
                medicamento: {
                    codigo: "",
                    nombre: "",
                    precioCompra: 0,
                    precioVenta: 0,
                    existencias: 0,
                    unidad: "",
                    imagen: "",
                },
                submitted: false,
                proveedores: [],
                categorias: [],
                puntosDistribucion: [],
                catSelect: "",
                provSelect: "",
                ptDistSelect: ""
            };
        },
        methods: {
            /* eslint-disable no-console */
            getProveedores() {
                http.get("/proveedores")
                    .then(res => {
                        this.proveedores = res.data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            getCategorias() {
                http.get("/agregados/categorias")
                    .then(res => {
                        this.categorias = res.data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            getPuntosDistribucion() {
                http.get("/distribucion")
                    .then(res => {
                        this.puntosDistribucion = res.data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            saveMedicamento() {
                var data = {
                    codigo: this.medicamento.codigo,
                    nombre: this.medicamento.nombre,
                    precioCompra: this.medicamento.precioCompra,
                    precioVenta: this.medicamento.precioVenta,
                    existencias: this.medicamento.existencias,
                    unidad: this.medicamento.unidad,
                    imagen: "imagen",
                    proveedor: this.proveedores.find(prov => this.provSelect === prov.nombre),
                    categoria: this.categorias.find(cat => this.catSelect === cat.nombre),
                    puntoDistribucion: this.puntosDistribucion.find(ptDst => this.ptDistSelect === ptDst.nombre)
                };
                http
                    .post("/medicamentos/guardar", data)
                    .then(response => {
                        this.medicamento.id = response.data.id;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            newMedicamento() {
                this.submitted = false;
                this.medicamento = {};
            }
            /* eslint-disable no-console */
        },
        mounted() {
            this.getProveedores();
            this.getCategorias();
            this.getPuntosDistribucion();
        }
    };
</script>

<style>
    .submitform {
        max-width: 300px;
        margin: auto;
    }
</style>
