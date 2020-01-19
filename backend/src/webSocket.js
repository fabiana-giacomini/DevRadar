const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io;
const connections = [] // poderia ser guardado dentro de um banco de dados

exports.setupWebsocket = (server) => {
  // console.log('Ok')
  io = socketio(server)

  io.on('connection', socket => {  // toda vez que houver uma conexão (eventListener)
    const { latitude, longitude, techs } = socket.handshake.query

    // setTimeout(() => { // bakcend enviando uma info para o frontend, sem este ter que fazer uma requisição
    //   socket.emit('message', 'Hello Omnistack')
    // }, 3000)

    connections.push({ //salvar todas as conexões feitas
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs)
    })
  })
}

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10
    && connection.techs.some(item => techs.includes(item)) // verificar se pelo menos uma das techs está presente no dev criado
  }
)}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data)
  })
}