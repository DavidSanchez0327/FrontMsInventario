import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalAgregar({providers, categories}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}
                    className={classes.button}>
                Agregar Medicamento
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="myForm">
                        <input type="text" placeholder="Nombre" className="formField"/>
                        <input type="text" placeholder="Código" className="formField"/>
                        <input type="text" placeholder="Precio de Compra" className="formField"/>
                        <input type="text" placeholder="Precio de Venta" className="formField"/>
                        <input type="text" placeholder="Cantidad" className="formField"/>
                        <input type="text" placeholder="Unidades" className="formField"/>
                        <select className="myListProvider">
                            {providers.map(provider => (
                                <option key={provider.codigo}>{provider.nombre}</option>
                            ))}
                        </select>
                        <select className="myListProvider">
                            {categories.map(category => (
                                <option key={category.idCategoria}>{category.nombre}</option>
                            ))}
                        </select>
                        <Button variant="contained" color="primary" onClick={(e) => console.log(e)}
                                className={classes.button}>Agregar</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
