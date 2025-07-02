import React, { useState, useEffect } from 'react'

//Complemento de cada item de la lista. Renderiza los datos y botones respectivos. Pasa funciones de editar y eliminar a este complemento para ser referenciados.
function Item({ item, itemToEdit, deleteItem, editItem}) {
    const [ textoEscala, cambiarEscala ] = useState("Deficiente");

    useEffect(() => {//Verifica cuando cambia la nota y juzga según escala de notas.
        if(item.grade <= 3.9) cambiarEscala("Deficiente");
        else if(item.grade <= 5.5) cambiarEscala("Con Mejora");
        else if(item.grade <= 6.4) cambiarEscala("Buen Trabajo");
        else if(item.grade <= 7.0) cambiarEscala("Destacado");
    })

    return (
        <li className='container row bg-light mt-3'>
            <div id='li-info' className='col-7'>
                <p className='fs-5 fw-bold m-0 text-start text-wrap'>Alumno: {item.value}</p>
                <p className='fw-secondary m-0 text-start text-wrap'>Asignatura: {item.subject}</p>
                <p className='m-0 text-start'>Nota: <span className='fw-bold'>{item.grade}</span></p>
                <p className='m-0 text-start escala-notas border rounded-pill fw-primary fw-bold'>{textoEscala}</p>
            </div>
            <div id='li-buttons' className='col-5'>
                <button className='m-1 btn btn-warning fw-bold text-light' onClick={() => editItem(item)}>{itemToEdit && itemToEdit.id === item.id? "Cancelar" : "Editar"}</button>
                <button className='m-1 btn btn-danger fw-bold' onClick={() => deleteItem(item.id)}>Eliminar</button>
            </div>
        </li>
    );
}

export default Item;