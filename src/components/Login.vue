<template>

    <div id="login">
        <div id="description">
            <h1>Bienvenido</h1>
            <p>Estas ingresando al manejo de inventario</p>
        </div>
        <div id="form">
            <form @submit.prevent="doLogin">
                <label for="email">Correo</label>
                <input type="text" id="email" v-model="email" required placeholder="me@example.com" autocomplete="off">

                <label for="password">Contraseña</label>&nbsp;
                <i class="fas" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
                <input :type="passwordType" id="password" required v-model="password" placeholder="**********">

                <button type="submit">Ingresar</button>
            </form>
        </div>
    </div>

</template>

<script>

    import firebase from "firebase";
    import http from "../http-common";

    export default {
        data(){
            return {
                email: '',
                password: '',
                hidePassword: true
            }
        },
        computed: {
            passwordType() {
                return this.hidePassword ? 'password' : 'text'
            },
            passwordIcon() {
                return this.hidePassword ? 'fa-eye' : 'fa-eye-slash'
            }
        },
        methods: {
            doLogin() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(user => {
                        console.log(user.user);
                        user.user.getIdToken().then(token => this.getCurrentUser(token))
                            .then(() => {
                                this.$router.push('/medicamentos');
                            });
                    }).catch((err) => {
                        console.log(err);
                });
            },

            getCurrentUser(token){

                let config = {
                    headers: {
                        Authorization: "Bearer "+token
                    }
                };

                http.get('/usuario', config)
                    .then(perfil => {
                        localStorage.setItem("usuario", JSON.stringify(perfil.data));
                        localStorage.setItem("token", token);
                    }).catch(err => {
                        console.log(err);
                });
            }
        }}

</script>

<style>

    div#login {
        align-items: center;
        background-color: #e2e2e5;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 50px;
    }

    div#login div#description {
        background-color: #ffffff;
        width: 280px;
        padding: 35px;
    }

    div#login div#description h1,
    div#login div#description p {
        margin: 0;
    }

    div#login div#description p {
        font-size: 0.8em;
        color: #95a5a6;
        margin-top: 10px;
    }

    div#login div#form {
        background-color: #34495e;
        border-radius: 5px;
        box-shadow: 0px 0px 30px 0px #666;
        color: #ecf0f1;
        width: 260px;
        padding: 35px;
    }

    div#login div#form label,
    div#login div#form input {
        outline: none;
        width: 100%;
    }

    div#login div#form label {
        color: #95a5a6;
        font-size: 0.8em;
    }

    div#login div#form input {
        background-color: transparent;
        border: none;
        color: #ecf0f1;
        font-size: 1em;
        margin-bottom: 20px;
    }

    div#login div#form ::placeholder {
        color: #ecf0f1;
        opacity: 1;
    }

    div#login div#form button {
        background-color: #ffffff;
        cursor: pointer;
        border: none;
        padding: 10px;
        transition: background-color 0.2s ease-in-out;
        width: 100%;
    }

    div#login div#form button:hover {
        background-color: #eeeeee;
    }

    @media screen and (max-width: 600px) {
        div#login {
            align-items: unset;
            background-color: unset;
            display: unset;
            justify-content: unset;
        }

        div#login div#description {
            margin: 0 auto;
            max-width: 350px;
            width: 100%;
        }

        div#login div#form {
            border-radius: unset;
            box-shadow: unset;
            width: 100%;
        }

        div#login div#form form {
            margin: 0 auto;
            max-width: 280px;
            width: 100%;
        }
    }

</style>
