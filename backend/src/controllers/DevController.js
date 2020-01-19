const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../webSocket')

// geralmente o controller tem 5 funções: index(lista), show(mostrar um único), store(guardar), update, destroy(deletar)

module.exports = {
  async index(request, response) {  
    const devs = await Dev.find()

    return response.json(devs)
  },

  async store(request, response) { // parâmentros padrões do get(rota, callbakc(req, res))
    const { github_username, techs, latitude, longitude } = request.body
  
    let dev = await Dev.findOne( { github_username })  // antes, verificar se o user já não existe no banco de dados

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
      // await é p esperar a resposta chegar, para depois continuar
    
      const { name = login, avatar_url, bio } = apiResponse.data
    
      const techsArray = parseStringAsArray(techs)
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })
    
      // Filtras as conexões que estão a no máx. 10km distância e que o novo dev tenha, pelo menos, uma das tecnologias filtradas
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )

      sendMessage(sendSocketMessageTo, 'new-dev', dev) // parâmetros: to, message, data
    }
    return response.json(dev)
  }
}