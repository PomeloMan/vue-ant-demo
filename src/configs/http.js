import axios from 'axios'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  // config.headers['token'] = Vue.cookie.get('token')
  let token = localStorage.getItem('oauth2AccessToken')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) {
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default http