import Vue from "vue";
import Router from "vue-router";
import MedicamentosList from "./components/MedicamentosList";
import AddMedicamento from "./components/AddMedicamento";
import Login from "./components/Login";
import ActualizarMedicamento from './components/ActualizarMedicamento'
import HomeComponent from './components/HomeComponent';
import CentrosComponent from './components/CentrosComponent';
import ProveedoresList from './components/ProveedoresList';

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
            path: "/medicamentos/crear",
            name: "crear",
            component: AddMedicamento
        },

        {
            path: "/",
            name: "home",
            component: HomeComponent
        },
        
        {
            path: "/medicamentos/actualizar",
            name: "actualizar",
            component: ActualizarMedicamento
        },
        {
            path: "/centros",
            name: "centros",
            component: CentrosComponent,
        },
        {
            path: "/proveedores",
            name: "proveedores",
            component: ProveedoresList,
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
    ]
});
