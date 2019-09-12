<template>
    <div class="login">
        <h3>Sign In</h3>
        <div class="form-group">
            <input type="text" v-model="email" placeholder="Email">
        </div>
        <div class="form-group">
            <input type="password" v-model="password" placeholder="Password">
        </div>
        <div class="form-group">
            <button @click="login">Connection</button>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                     localStorage.setItem("isLoged", true);
                        this.$router.push('medicamentos');
                    },
                    (err) => {
                        alert('Oops. ' + err.message)
                    }
                );
            }
        }
    }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
.login {
    margin-top: 40px;
}

input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}

button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
}

p {
    margin-top: 40px;
    font-size: 13px;
}

p a {
    text-decoration: underline;
    cursor: pointer;
}
</style>
