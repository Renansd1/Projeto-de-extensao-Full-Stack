import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function Menu({ id, nome, valor, description, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(nome);
    const [editedPrice, setEditedPrice] = useState(valor);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleDelete = async () => {
        if (window.confirm("Tem certeza que deseja deletar esse prato?")) {
            try {
                await axios.delete(`http://127.0.0.1:5001/api/menu/${id}`);
                onDelete({ id, nome, valor, description });
            } catch (error) {
                console.error('Error deleting dish:', error);
            }
        }
    };

    const handleEdit = async () => {
        try {
            console.log(editedName, editedPrice, editedDescription);
            await axios.put(`http://127.0.0.1:5001/api/menu/${id}`, {
                name: editedName,
                price: editedPrice,
                description: editedDescription
            });
            setIsEditing(false);
            window.location.reload(); 
        } catch (error) {
            console.error('Error updating dish:', error);
        }
    };

    return (
        <div className="menu-item">
            <button 
                className="menu-item__delete-btn" 
                onClick={handleDelete}
            >
                x
            </button>
            <button 
                className="menu-item__edit-btn"
                onClick={() => setIsEditing(!isEditing)}
            >
                {isEditing ? '✓' : '✎'}
            </button>
            {isEditing ? (
                <>
                    <input
                        id={`name-${id}`}
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="menu-item__input"
                    />
                    <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                        className="menu-item__input"
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="menu-item__input"
                    />
                    <button className="menu-item__save-btn" onClick={handleEdit}>Save</button>
                </>
            ) : (
                <>
                    <h2 className="menu-item__name">{nome}</h2>
                    <p className="menu-item__price">R${valor}</p>
                    <p className="menu-item__description">{description}</p>
                </>
            )}
        </div>
    );
}
