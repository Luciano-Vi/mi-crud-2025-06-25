import React from 'react';
import Item from './Item.jsx';

//Complemento que muestra los registros de la lista. Si no hay registros, muestra mensaje que no hay registros.
function List({ items, itemToEdit, deleteItem, editItem }) {
    return (
        <div id='list' className='container p-3'>
            <h2 className='fw-bold mt-3 mb-0'>Evaluaciones Guardadas</h2>
            <ul id='list-ul' className='container p-4 mb-0 mt-0'>
                {items.length ? items.map((item) => (
                    <Item key={item.id} item={item} itemToEdit={itemToEdit} deleteItem={deleteItem} editItem={editItem}/>
                )) : <p>No hay evaluaciones guardadas aún. ¡Agrega una!</p> }
            </ul>
        </div>
    );
}

export default List;