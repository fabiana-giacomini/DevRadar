const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({   // esquema do banco (como se fosse tabela do mySQL)
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
})

module.exports = mongoose.model('Dev', DevSchema) // parâmetros: nome do esquema no banco, e qual o esquema usado 