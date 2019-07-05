import Axios from 'axios'
// import router from '../router'
// import store from '../store/index'

const options = {
  baseURL: 'http://f4c48780.ngrok.io',
  headers: {
    'Content-Type': 'text/plain'
  },
  withCredentials: true
}

const instance = Axios.create(options)
// config axios timeout
instance.defaults.timeout = 5000
/* config interceptors */
instance.interceptors.request.use(request => {
  return request
})
instance.interceptors.response.use(response => {
  return response
})

export default instance
