const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request, response) {
    // Buscar todos devs num raio 10km
    // Filtar por tecnologias

    const { latitude, longitude, techs } = request.query

    const techsArray = parseStringAsArray(techs)

    const devs = await Dev.find({
      techs: {
        $in: techsArray,  // $in é um operador do Mongo (para mais: pesquisar mongo operators)
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000, // 10km
        },
      },
    })

    return response.json({ devs })
  }
}