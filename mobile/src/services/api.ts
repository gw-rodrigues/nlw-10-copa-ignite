import axios from 'axios'

/**
 * Vamos inicializar/create nova conexão
 * definir um baseURL, que será conexão com nosso backend
 */
export const api = axios.create({
  baseURL: 'http://192.168.0.122:3333',
})
