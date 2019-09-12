import Vue from "vue";
import App from "./App.vue";
import Login from "./components/Login";
import router from './router'
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyB4wuG4OzrmUx1XjwZUWIf3LT8VW8XxP-I",
  authDomain: "prueba-c0a90.firebaseapp.com",
  databaseURL: "https://prueba-c0a90.firebaseio.com",
  projectId: "prueba-c0a90",
  storageBucket: "prueba-c0a90.appspot.com",
  messagingSenderId: "859874702030",
  appId: "1:859874702030:web:c7842a31cccd300d"
};

firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
