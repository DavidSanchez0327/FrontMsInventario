import React, {Component} from 'react';
import './App.css';
import Inventario from "./components/inventario";
import ModalAgregar from "./components/modalInventario";

class App extends Component {

    deletePost(ev) {
        let el = ev.target;
        let index = el.dataset.index;

        fetch(`http://localhost:8000/api_inventario/medicamentos/eliminar/${ev}`, {
            method: 'DELETE'
        })
            .catch(err => console.error(err))
            .then(() => {
                let posts = this.state.posts;
                posts.splice(index, 1);
                this.setState({posts});
            })
    }

    addPost(ev) {
        let el = ev.target;
        let index = el.dataset.index;

        fetch(`http://localhost:8000/api_inventario/medicamentos/guardar`, {
            method: 'POST'
        })
            .catch(err => console.error(err))
            .then(() => {
                let posts = this.state.posts;
                posts.splice(index, 1);
                this.setState({posts});
            })
    }

    constructor(props) {
        super(props);
        this.state = {
            title: 'Inventario',
            listaMed: [],
            listaCliente: [],
            listaProv: [],
            listaCat: []
        }
    }

    componentDidMount() {
        fetch('https://apigatewaytds.herokuapp.com/api_inventario/proveedores')
            .then(res => res.json())
            .then(data => this.setState({listaProv: data}));
        fetch('https://apigatewaytds.herokuapp.com/api_inventario/medicamentos')
            .then(res => res.json())
            .then(data => this.setState({listaMed: data}));
        fetch('https://apigatewaytds.herokuapp.com/api_inventario/agregados/categorias')
            .then(res => res.json())
            .then(data => this.setState({listaCat: data}));
    }


    fSubmit = (e) => {
        e.preventDefault();
        console.log('try');

        let datas = this.state.datas;
        let name = this.refs.name.value;
        let code = this.refs.code.value;
        let pricePurchase = this.refs.pricePurchase.value;
        let salePrice = this.refs.salePrice.value;
        let stock = this.refs.stock.value;
        let unity = this.refs.unity.value;
        let image = this.refs.image.value;
        let provider = this.refs.provider.value;
        let category = this.refs.category.value;

        if (this.state.act === 0) {   //new
            let data = {
                name, code, pricePurchase, salePrice, stock, unity, image, provider, category
            };
            datas.push(data);
        } else {                      //update
            let index = this.state.index;
            datas[index].name = name;
            datas[index].code = code;
            datas[index].pricePurchase = pricePurchase;
            datas[index].salePrice = salePrice;
            datas[index].stock = stock;
            datas[index].unity = unity;
            datas[index].image = image;
            datas[index].provider = provider;
            datas[index].category = category;
        }

        this.setState({
            datas: datas,
            act: 0
        });

        this.refs.myForm.reset();
        this.refs.name.focus();
    }

    fRemove = (i) => {
        let datas = this.state.datas;
        datas.splice(i, 1);
        this.setState({
            datas: datas
        });

        this.refs.myForm.reset();
        this.refs.name.focus();
    }

    fEdit = (i) => {
        let data = this.state.datas[i];
        this.refs.name.value = data.name;
        this.refs.code.value = data.code;
        this.refs.pricePurchase.value = data.pricePurchase;
        this.refs.salePrice.value = data.salePrice;
        this.refs.stock.value = data.stock;
        this.refs.unity.value = data.unity;
        this.refs.image.value = data.image;
        this.refs.provider.value = data.provider;
        this.refs.category.value = data.category;

        this.setState({
            act: 1,
            index: i
        });

        this.refs.name.focus();
    };

    render() {

        return (
            <div className="App">
                <h2>{this.state.title}</h2>
                <ModalAgregar providers={this.state.listaProv} categories={this.state.listaCat}/>
                <div>
                    Medicamentos
                    <Inventario inventario={this.state.listaMed}/>

                </div>
            </div>


        );
    }
}

export default App;
