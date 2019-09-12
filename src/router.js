import Vue from "vue";
import Router from "vue-router";
import MedicamentosList from "./components/MedicamentosList";
import AddMedicamento from "./components/AddMedicamento";
import Login from "./components/Login";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/medicamentos",
            name: "medicamentos",
            component: MedicamentosList,
        },
        {
            path: "/medicamentos/guardar",
            name: "guardar",
            component: AddMedicamento
        },
        {
            path: "/",
            name: "login",
            component: Login
        },
    ]
});
