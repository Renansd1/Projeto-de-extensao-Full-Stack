import { useState, useEffect } from 'react'
import axios from 'axios'
import Menu from './components/Menu/Menu'
import CreateDish from './components/CreateDish/CreateDish'
import './App.css'

function App() {
  const [menuItems, setMenuItems] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')

  useEffect(() => {
    axios.get('http://127.0.0.1:5001/api/menu', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Erro ao buscar menu:', error))
  }, [])

  const addMenuItem = (newDish) => {
    setMenuItems([...menuItems, newDish])
  }

  const deleteMenuItem = (dish) => {
    setMenuItems(menuItems.filter(item => item.id !== dish.id))
  }

  const filteredMenuItems = menuItems.filter(item => {
    const matchesName = item.name.toLowerCase().includes(nameFilter.toLowerCase())
    const matchesPrice = priceFilter === '' || item.price <= parseFloat(priceFilter)
    return matchesName && matchesPrice
  })

  return (
    <div className='app'>
      <div className='content-wrapper'>
        <div className='sidebar'>
          <div className='create-dish-section'>
            <CreateDish onAddDish={addMenuItem} onDeleteDish={deleteMenuItem} />
          </div>
          
          <div className='filters-section'>
            <h2>Filtros</h2>
            <div className='filters'>
              <div className='filter-group'>
                <label htmlFor='name-filter'>Buscar por nome:</label>
                <input
                  id='name-filter'
                  type='text'
                  placeholder='Digite o nome do prato...'
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className='filter-input'
                />
              </div>
              <div className='filter-group'>
                <label htmlFor='price-filter'>Preço máximo:</label>
                <input
                  id='price-filter'
                  type='number'
                  placeholder='Digite o preço máximo...'
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className='filter-input'
                />
              </div>
            </div>
          </div>
        </div>

        <main className='menu-section'>
          <h2>Nosso Menu</h2>
          <div className='menu-container'>
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <Menu
                  key={item.id}
                  nome={item.name}
                  valor={item.price}
                  description={item.description}
                  onDelete={deleteMenuItem}
                  id={item.id}
                />
              ))
            ) : (
              <p className='no-results'>Nenhum prato encontrado com os critérios selecionados</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
