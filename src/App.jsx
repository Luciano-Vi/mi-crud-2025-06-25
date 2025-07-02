import { useState, useEffect } from 'react'
import Form from './components/Form.jsx';
import List from './components/List.jsx';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [itemToEdit, setItemToEdit] = useState(null);

    //Función ejecutada con cada cambio en la página, sirve para guardar variables y accederlas incluso recargando la página.
    useEffect(() => {
        const storedItems = JSON.parse(window.localStorage.getItem('items')) || [];
        if(storedItems.length !== 0) setItems(storedItems);
    }, []
  );

    //Función para acceder a los datos del localStorage, con persistencia de datos.
    useEffect(() => {
        window.localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    //Añade items a la lista. Si se tiene un item seleccionado por editar, actualiza tal item. Si no, añade el nuevo item.
    const addOrUpdateItem = (item) => {
        if(itemToEdit) {
            setItems(items.map(foundItem => foundItem.id === itemToEdit.id ? { id: foundItem.id, ...item } : foundItem));
            setItemToEdit(null);
        } else setItems([...items, { id: Date.now(), value: item.value, subject: item.subject, grade: item.grade }]);
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
        //Si el item por eliminar está seleccionado para editar, remueve el texto del item al editar, ya que no puedes editar algo que borraste
        if(itemToEdit && id === itemToEdit.id) setItemToEdit(null);
    };

    //Cambia el item para editar para toda la página. Cancela modo editar si elemento ya está seleccionado.
    const editItem = (item) => {
        itemToEdit && itemToEdit.id === item.id? setItemToEdit(null) : setItemToEdit(item);
    };

    return (
        <div className="App">
            <h1 className='container p-3 fw-bold' id='title'>CRUD con LocalStorage</h1>
            <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
            <List items={items} itemToEdit={itemToEdit} deleteItem={deleteItem} editItem={editItem} />
        </div>
    );
}

export default App;