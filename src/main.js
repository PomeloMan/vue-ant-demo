import Vue from 'vue'
import App from './App.vue'

import router from './configs/router'
import store from './configs/store'
import http from './configs/http'

import less from 'less'
Vue.prototype.$less = less

import API from '@/configs/api'
Vue.prototype.$api = API;

// 解决v-html不能加载js的问题（npm i vue-append）
// import VueAppend from 'vue-append'
// Vue.use(VueAppend)
// 添加全局时间处理工具 momentjs
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh')
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
import './styles/theme.less'
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

// 动画库（可取消）
import Ani from './animations/ani'
Vue.component('ani', Ani)
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
Vue.prototype.$Snap = Snap;
import lottie from 'lottie-web'
Vue.prototype.$lottie = lottie
import LottieWeb from '@/components/plugins/lottie-web'
Vue.component('lottie-web', LottieWeb)

// event Bus 用于无关系组件间的通信
// 使用方式 this.$bus.$on(event_name, function(args){}); this.$bus.$emit(event_name, args)
Vue.prototype.$bus = new Vue()

// 挂载全局
Vue.prototype.$http = http
import print from 'print-js'
Vue.prototype.$print = print
import { storage } from './configs/storage'
Vue.prototype.$storage = storage
// 常量
import constants from './constants/index'
Vue.prototype.$constants = constants

Vue.config.productionTip = false

Vue.prototype.$env = process.env.VUE_APP_CURRENT_MODE

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
