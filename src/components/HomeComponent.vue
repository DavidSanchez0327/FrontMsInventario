<template>
    <div>
        <b-jumbotron>
            <template v-slot:header>CRUZ PÚRPURA</template>

            <template v-slot:lead>
                La drogueria Cruz Púrpura está interesada en re focalizar su estrategia de negocio hacia la
                tecnología, con el fin de poder atender un número mayor de usuarios y tener más canales de
                comunicación. Para esta razón le estamos presentando este RFP para que nos permita
                conocer su aproximación a una solución tecnológica
            </template>

            <hr class="my-4">

            <p>
                Tenemos una tienda tanto en dispositivos móviles como en una página web,
                tratando de tener un contacto más cercano con nuestros usuarios.
            </p>

            <b-button variant="primary" class="mr-5" @click="tienda">Ir a tienda web</b-button>
            <b-button variant="success" @click="apkLink">Enlace de descarga apk</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
    export default {
        name: "HomeComponent",

        methods: {

            tienda(){
                alert("En proceso de construcción");
            },

            apkLink(){
                alert("En proceso de construcción");
            }

        }
    }
</script>

<style scoped>

</style>
