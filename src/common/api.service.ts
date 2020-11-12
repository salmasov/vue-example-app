import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const API_KEY = process.env.VUE_APP_API_KEY
const BASE_URL = `https://api.themoviedb.org/3/`

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = BASE_URL
    Vue.axios.interceptors.request.use((config) => {
      config.params = config.params || {}
      config.params['api_key'] = API_KEY
      return config
    })
  },
}

export default ApiService
