import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.12:3333', // porta 333 é a definida no backend
})

export default api