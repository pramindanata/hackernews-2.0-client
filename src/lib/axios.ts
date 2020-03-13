import axios from 'axios'
import config from '@/config'
import { loadProgressBar } from 'axios-progress-bar'

axios.defaults.baseURL = config.app.apiServer

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axios.interceptors.request.use(
  res => {
    return res
  },
  err => {
    const { response } = err

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

loadProgressBar(null, axios)

export default axios
