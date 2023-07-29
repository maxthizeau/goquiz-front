import axios from 'axios'
import cookie from 'js-cookie'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.defaults.headers.common['Content-Type'] = 'application/json'

instance.interceptors.request.use(
  (config) => {
    const token = cookie.get('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default instance
