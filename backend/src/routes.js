const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')


const routes = Router()

routes.get('/devs', DevController.index) // para listar os devs cadastrados
routes.post('/devs', DevController.store)  // segundo parâmentro foi colocado no arquivo DevController.js (antes estava aqui), aí foi chamado apenas o arquivo e o método criado store
routes.get('/search', SearchController.index)  // buscar devs em certo raio de localização

module.exports = routes;