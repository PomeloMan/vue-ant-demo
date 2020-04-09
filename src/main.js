import Vue from 'vue'
import App from './App.vue'

import router from './configs/router'
import store from './configs/store'
import http from './configs/http'

import API from '@/configs/api'
Vue.prototype.$api = API;

// 添加全局时间处理工具 momentjs
import moment from 'moment'
Vue.prototype.$moment = moment
// 添加全局金额，数字位处理工具 accountingjs
import accounting from 'accounting'
Vue.prototype.$accounting = accounting

// 引入 Ant Design，https://www.antdv.com/docs/vue/getting-started-cn/
// 完整引入 ant design 库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
Vue.prototype.$message = Antd.message;
Vue.use(Antd)

// 按需引入 ant design 库，需要配置 babel.config.js
// plugins: [
//   [
//     "import",
//     { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
//   ]
// ]
// import { Icon, message } from 'ant-design-vue'
// Vue.component(Icon.name, Icon)
// Vue.prototype.$message = message;

// global style
import './assets/style.scss'
import 'perfect-scrollbar/css/perfect-scrollbar.css' // 引入 perfect-scrollbar CSS库
import 'cropperjs/dist/cropper.min.css'
// i18n
import i18n from './i18n'
// icon 自定义svg标签
import './icons'
// 挂载管道
import './pipes'
// 注册全局组件
import './components/layouts'

// 挂载全局
Vue.prototype.$http = http
import print from 'print-js'
Vue.prototype.$print = print

Vue.config.productionTip = false

console.log(process.env.NODE_ENV)
Vue.prototype.$env = process.env.VUE_APP_CURRENT_MODE

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
