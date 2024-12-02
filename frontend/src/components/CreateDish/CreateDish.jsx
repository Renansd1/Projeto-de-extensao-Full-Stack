import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const CreateDish = ({ onAddDish }) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDish = { name: nome, price: parseFloat(valor), description };
    try {
      const response = await axios.post('http://127.0.0.1:5001/api/menu', newDish, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onAddDish(response.data);
      setNome('');
      setValor('');
      setDescription('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  return (
    <div className="create-dish-container">
      <button onClick={() => setIsOpen(true)} className="open-dialog-btn">Adicionar Prato</button>
      <div className={`dialog ${isOpen ? 'open' : ''}`}>
        <div className="dialog-content">
          <h2>Adicionar Novo Prato</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome do prato"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Valor (ex: 10.99)"
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(/[^0-9.]/g, ''))}
              required
            />
            <textarea
              placeholder="Descrição do prato"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="dialog-buttons">
              <button type="submit">Adicionar Prato</button>
              <button type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDish;
