<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-container>
                <b-dropdown text="Medicamentos" variant="success" class="m-2">
                    <b-dropdown-item :to="'/medicamentos'">Ver medicamentos</b-dropdown-item>
                    <b-dropdown-item :to="'/medicamentos/crear'">Crear</b-dropdown-item>
                </b-dropdown>
                <b-dropdown text="Centros de distribucion" variant="success" class="m-2">
                    <b-dropdown-item :to="'/centros'">Ver centros</b-dropdown-item>
                </b-dropdown>
                <b-dropdown text="Proveedores" variant="success" class="m-2">
                    <b-dropdown-item :to="'/proveedores'">Ver proveedores</b-dropdown-item>
                    <b-dropdown-item :to="'/proveedores/crear'">Crear</b-dropdown-item>
                </b-dropdown>
                <b-navbar-brand :to="'/'">Inicio</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <img v-if="loged" :src="usuario.foto || avatar" alt="image" id="foto" class="img-responsive"
                             height="50" width="50"/>
                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template style="color: red" slot="button-content">{{username}}</template>
                            <b-dropdown-item :to="'/login'" v-if="!loged">Iniciar sesion</b-dropdown-item>
                            <b-dropdown-item @click="salir" v-if="loged">Salir</b-dropdown-item>

                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>

        <div class="container-fluid mt-5 align-items: center">
            <router-view :key="this.$route.fullPath"/>
        </div>
    </div>

</template>

<script>
    import firebase from "firebase";


    export default {
        name: "app",


        data() {
            return {
                loged: false,
                usuario: {},
                username: 'Usuario',
                avatar: 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg'
            }
        },

        methods: {
            salir() {
                firebase.auth().signOut().then(res => {
                    localStorage.setItem("usuario", null);
                    localStorage.setItem("token", null);
                    this.usuario = {};
                    this.loged = false;
                    this.$router.push('/');
                })
            }

        },

        mounted() {
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            console.log(this.usuario);
            if (this.usuario !== null) {
                this.loged = true;
                this.username = this.usuario.nombre.concat(" " + this.usuario.apellidos)
            }
            console.log(this.loged);
        }
    };
</script>

<style>
    #foto {
        border-radius: 50px;
    }
</style>
