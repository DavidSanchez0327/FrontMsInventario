import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Inventario = ({inventario}) => {
    return (
        <div>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Código</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Precio Compra</TableCell>
                            <TableCell align="right">Proveedor</TableCell>
                            <TableCell align="right">Categoría</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventario.map(invent => (
                            <TableRow key={invent.codigo}>
                                <TableCell align="right" component="th" scope="row">
                                    {invent.codigo}
                                </TableCell>
                                <TableCell align="right">{invent.nombre}</TableCell>
                                <TableCell align="right">{invent.precioCompra}</TableCell>
                                <TableCell align="right">{invent.proveedor.nombre}</TableCell>
                                <TableCell align="right">{invent.categoria.nombre}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default Inventario
