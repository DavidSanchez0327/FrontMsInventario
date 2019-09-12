import Vue from "vue";
import Router from "vue-router";
import MedicamentosList from "./components/MedicamentosList";
import AddMedicamento from "./components/AddMedicamento";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "medicamentos",
            alias: "/medicamentos",
            component: MedicamentosList,
        },
        {
            path: "/medicamentos/guardar",
            name: "guardar",
            component: AddMedicamento
        },
    ]
});
