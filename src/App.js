import React, {Component} from 'react';
import './App.css';
import {InventarioService} from "./domain/usecase/inventario.service";
import Inventario from "./components/inventario";

class App extends Component {

    inventarioService: InventarioService = new InventarioService();


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


    constructor(props) {
        super(props);
        this.state = {
            title: 'Inventario',
            act: 0,
            index: '',
            datas: [],
            listaMed: [],
            listaCliente:[]
        }
    }

    componentDidMount() {
        this.refs.name.focus();
        fetch('https://apigatewaytds.herokuapp.com/api_inventario/medicamentos')
            .then(res => res.json())
            .then(data => this.setState({listaMed:data}));
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
        let datas = this.state.datas;
        return (
            <div className="App">
                <h2>{this.state.title}</h2>
                <form ref="myForm" className="myForm">
                    <input type="text" ref="name" placeholder="your name" className="formField"/>
                    <input type="text" ref="code" placeholder="your code" className="formField"/>
                    <input type="text" ref="pricePurchase" placeholder="your price Purchase" className="formField"/>
                    <input type="text" ref="salePrice" placeholder="  sale Price" className="formField"/>
                    <input type="text" ref="stock" placeholder="  stock" className="formField"/>
                    <input type="text" ref="unity" placeholder="  unity" className="formField"/>
                    <input type="text" ref="image" placeholder="  image" className="formField"/>
                    <select className="myListProvider">
                        <option value="grapefruit">DrogasW</option>
                        <option value="lime">Roma</option>
                        <option selected value="coconut">Ivanagro</option>
                        <option value="mango">Sol Verde</option>
                    </select>
                    <input type="text" ref="category" placeholder="  category" className="formField"/>
                    <button onClick={(e) => this.fSubmit(e)} className="myButton">submit</button>
                    </form>
                <pre>
                    {datas.map((data, i) => <li key={i} className="myList">
                        {i + 1}. {data.name}, {data.code}, {data.pricePurchase}, {data.salePrice}
                        ,{data.stock}, {data.unity}, {data.image}, {data.provider}, {data.category}
                        <button onClick={() => this.fRemove(i)} className="myListButton">remove</button>
                        <button onClick={() => this.fEdit(i)} className="myListButton">edit</button>
                    </li>)}
                </pre>
                <div>
                    Prueba React GetAll
                    <Inventario inventario={this.state.listaMed}/>

                </div>
            </div>


        );
    }
}

export default App;
