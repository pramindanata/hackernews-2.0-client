import axios from 'axios'
import config from '@/config'
import { loadProgressBar } from 'axios-progress-bar'

loadProgressBar(null, axios)

axios.defaults.baseURL = config.app.apiServer

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (config.params && config.params.token) {
    return config
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axios.interceptors.response.use(
  res => {
    return res
  },
  err => {
    const { response } = err

    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    if (
      response.status === 403 &&
      response.data.message === 'Invalid token given'
    ) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(err)
  },
)

export default axios
