import React, { useEffect, useState } from 'react'; // useEffect dispara uma função sempre que uma informação alterar, ou uma vez q renderizar
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  const [devs, setDevs] = useState([])


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data
    /* antes era assim, agora apenas envia data no lugar, e esses dados serão passados no onSubmit() em components/DevForm/index.js
    {
      github_username,
      techs,
      latitude,
      longitude,
    }*/ )

    setDevs([...devs, response.data]) // não pode fazer devs.push, pois no react sempre tem q criar uma coisa do zero, nesse caso, é assim que podemos fazer uma adição do que foi posto no final com os devs que já existem
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => ( // é parênteses e não chave, pois trata-se de um retorno e não do corpo da função
          <DevItem key={dev._id} dev={dev} /> // primeiro elemento dentro do map
          ))}
          
        </ul>
      </main>
    </div>
  ) 
}

export default App;
