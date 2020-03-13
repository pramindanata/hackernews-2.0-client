import axios from 'axios'
import config from '@/config'

axios.defaults.baseURL = config.app.apiServer

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

export default axios
