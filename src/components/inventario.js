import React from 'react';

const Inventario = ({inventario}) => {
    return (
        <div>
            <ul>
                {inventario.map((invent) => (
                    <li key={invent.codigo}>
                        {invent.nombre}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Inventario
