import React from 'react';

const Inventario = ({inventario}) => {
    return (
        <div>
            {inventario.map((invent) => (
                <div>
                    {invent.nombre}
                </div>
            ))}
        </div>
    )
}

export default Inventario
