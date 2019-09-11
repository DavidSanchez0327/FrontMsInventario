
export class ProveedorService {

    getAll(data) {
        fetch(`http://localhost:8000/api_inventario/proveedores`, {
            method: 'GET'
        }).then(response => response.json())
            .then(source => data = source);
    }
}
