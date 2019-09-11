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
            <ul>

                    <Paper >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Codigo</TableCell>
                                    <TableCell align="right">nombre</TableCell>
                                    <TableCell align="right">precio Compra</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventario.map(invent => (
                                    <TableRow key={invent.codigo}>
                                        <TableCell  align="right" component="th" scope="row">
                                            {invent.codigo}
                                        </TableCell>
                                        <TableCell align="right">{invent.nombre}</TableCell>
                                        <TableCell align="right">{invent.precioCompra}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>




            </ul>
        </div>
    )
}

export default Inventario
