import React, { useState, useEffect } from 'react'

function Form({ addOrUpdateItem, itemToEdit }) {
    const [inputValue, setInputValue] = useState('');
    const [inputSubject, setInputSubject] = useState('');
    const [inputGrade, setInputGrade] = useState(1.0);

    //Función ejecutada en cada cambio en la página, mantiene los valores de los inputs siempre actualizados
    useEffect(() => {
        if(itemToEdit) {
            setInputValue(itemToEdit.value);
            setInputSubject(itemToEdit.subject);
            setInputGrade(itemToEdit.grade);
        } else resetInputs()
    }, [itemToEdit]);

    const resetInputs = () => {
        setInputValue('');
        setInputSubject('');
        setInputGrade(1.0);
    }

    //Funciones complementarias que mantiene valores actualizados ante cambio del usuario en el Form.
    const registraCambioValor = (e) => {
        setInputValue(e.target.value);
        e.target.setCustomValidity('') //Reinicia mensaje de validez cuando usuario escribe, ya que no se sabe si es valido aún o no mientras escribe.
    }
    const registraCambioSubject = (e) => {
        setInputSubject(e.target.value);
        e.target.setCustomValidity('')
    }
    const registraCambioGrade = (e) => {
        setInputGrade(e.target.value);
        e.target.setCustomValidity('')
    }

    // Función customizada de manejo de Form. No se ejecutará si la entrada es inválida, gracias a los atributos de los tag <input> de válidez.
    const handleSubmit = (e) => {
        e.preventDefault();
        addOrUpdateItem({value: inputValue, subject: inputSubject, grade: inputGrade});
        resetInputs();
    };

    return (
        <div id='div-form' className='container border-3 p-4 gap-4'>
            <form onSubmit={handleSubmit} id="form" className='form-label'>
                <h3 className='mb-4'>{itemToEdit ? "Editar Evaluación" : "Agregar Nueva Evaluación"}</h3>

                <label className='form-label fw-bold' htmlFor="name">Nombre del Alumno:</label>
                <input className='form-control mb-4' required type="text" value={inputValue} onChange={(e) => registraCambioValor(e)} id='name' minLength={3} maxLength={30} onInvalid={(e) => e.target.setCustomValidity("Ingrese de 3-30 carácteres.")} placeholder='Ej: Juan Pérez'/>

                <label className='form-label fw-bold' htmlFor="subject">Asignatura:</label>
                <input className='form-control mb-4' required type="text" value={inputSubject} onChange={(e) => registraCambioSubject(e)} id="subject" minLength={3} maxLength={50} onInvalid={(e) => e.target.setCustomValidity("Ingrese de 3-50 carácteres.")} placeholder='Ej: Matemáticas'/>

                <label className='form-label fw-bold' htmlFor="grade">Promedio:</label>
                <input className='form-control mb-4' required type="number" value={inputGrade} onChange={(e) => registraCambioGrade(e)} id="grade" step="0.1" min="1.0" max="7.0" placeholder="1.0" onInvalid={(e) => e.target.setCustomValidity("Ingrese un valor entre 1.0-7.0 ")}/>

                <button className='btn btn-primary fw-bold'>{itemToEdit ? 'Actualizar Evaluación' : 'Agregar Evaluación'}</button>
            </form>
        </div>
    );
}

export default Form;