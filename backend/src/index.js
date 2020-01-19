const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // permite q se use outro caminho (backend e frontend estão em portas diferentes)
const http = require('http') // módulo do node usado pelo express para fazer as requisições, a aplicação vai precisar ouvir tanto as requisições http, como do websocket

const routes = require('./routes')
const { setupWebsocket } = require('./webSocket')


const app = express()
const server = http.Server(app) // servidor http fora do express, extraiu o protocolo http de dentro do express, instanciou o server

setupWebsocket(server) // exportar o server

// uuuuuuu (incluir username), ********(incluir password), week10(nome do banco)
mongoose.connect('mongodb+srv://uuuuuuu:********@cluster0-qz2rw.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true // para parar os erros de aparecerem
})

app.use(cors())
app.use(express.json()) // entender requisições com corpo formato de json
app.use(routes)

// Métodos HTTP: GET, POST, PUT(editar), DELETE

// Tipos de parâmentros:
// Query Paramns: request.query (filttos, ordenação, paginação...) visíveis na url
// Route Paramns: request.params (identificar um recurso na alteração ou remoção)
// Body: request.body (dados para criação ou alteração de um registro)

// MongoDB (Não-Relacional) pode ser hospedado na nuvem mongodb.com/cloud/atlas
// e pode ser visualizado no app MongoDB Compass

server.listen(3333)
