
export class InventarioService {

    getAll(data) {
        fetch(`http://localhost:8000/api_inventario/medicamentos`, {
            method: 'GET'
        }).then(response => response.json())
            .then(source => data = source);
    }
}
