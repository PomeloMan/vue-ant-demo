import Vue from 'vue';
import moment from 'moment'

// 挂载管道
Vue.filter('date', date)

export function date(value, formatter = 'YYYY-MM-DD HH:mm:ss') {
  if (value) {
    return moment.format(formatter)
  }
}