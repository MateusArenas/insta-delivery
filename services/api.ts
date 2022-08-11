import axios from 'axios'

const api = axios.create({
  baseURL: 'https://www.fruityvice.com/api', 
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
})

export default api
