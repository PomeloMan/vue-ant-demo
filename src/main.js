import Vue from 'vue'
import App from './App.vue'

import router from './configs/router'
import store from './configs/store'
import http from './configs/http'

import API from '@/configs/api'
Vue.prototype.$api = API;

// 引入 Ant Design，https://www.antdv.com/docs/vue/getting-started-cn/
// 完整引入 ant design 库
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

// 按需引入 ant design 库，需要配置 babel.config.js
// plugins: [
//   [
//     "import",
//     { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
//   ]
// ]
import { Icon, message } from 'ant-design-vue'
Vue.component(Icon.name, Icon)

Vue.prototype.$message = message;

// global style
import './assets/style.scss'

// i18n
import i18n from './i18n'

// 挂载管道
import './pipes'

// 挂载全局
Vue.prototype.$http = http

Vue.config.productionTip = false

console.log(process.env.NODE_ENV)
Vue.prototype.$env = process.env.VUE_APP_CURRENT_MODE

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
