import axios, { AxiosInstance } from 'axios'

const API_KEY = process.env.VUE_APP_API_KEY
const BASE_URL = `https://api.themoviedb.org/3/`

let singletonInstance = null as AxiosInstance | null
// не захотел инжектить axios в инстанс Vue
// реализовал логику работы как синглтон, достаточно вызвать в файле getApiService()
const getApiService = () => {
  if (singletonInstance) return singletonInstance
  singletonInstance = axios.create({
    baseURL: BASE_URL,
  })

  singletonInstance.interceptors.request.use((config) => {
    config.params = config.params || {}
    config.params['api_key'] = API_KEY
    config.params['language'] = 'ru-RU'
    return config
  })

  return singletonInstance
}

export default getApiService
