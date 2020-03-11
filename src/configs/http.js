import axios from 'axios'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 30,
  withCredentials: true,
  // (一) 当前端配置withCredentials=true时, 后端配置Access-Control-Allow-Origin不能为*, 必须是相应地址
  // (二) 当配置withCredentials=true时, 后端需配置Access-Control-Allow-Credentials
  // (三) 当前端配置请求头时, 后端需要配置Access-Control-Allow-Headers为对应的请求头集合
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// 添加 URL字段，用于 this.$http.baseURL 取值
http.baseURL = process.env.VUE_APP_BASE_URL;

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  // config.headers['token'] = Vue.cookie.get('token')
  let token = localStorage.getItem('oauth2AccessToken')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  } else {
    router.push({ name: 'login' })
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