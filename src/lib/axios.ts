import axios from 'axios'
import config from '@/config'
import { loadProgressBar } from 'axios-progress-bar'

axios.defaults.baseURL = config.app.apiServer

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

loadProgressBar(null, axios)

export default axios
