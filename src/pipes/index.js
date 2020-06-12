import Vue from 'vue';
import moment from 'moment'
import accounting from 'accounting'

// 挂载管道
Vue.filter('date', date)
Vue.filter('find', find)
Vue.filter('formatMoney', formatMoney)
Vue.filter('formatNumber', formatNumber)
Vue.filter('formatPhoneNumber', formatPhoneNumber)

export function date(value, formatter = 'lll') {
  if (value) {
    return moment(value).format(formatter) // YYYY-MM-DD HH:mm:ss
  }
}

/**
 * 根据 key 找到 array 中对应的对象
 * @param {*} array 数组集合
 * @param {*} option
 * @param {*} keyStr 数组集合中对象唯一值的属性名称
 * @param {*} returnKeyStr 返回对象的某个属性值名称,不设置则返回整个对象
 */
export function find(value, array, option = { keyStr: 'id', returnKeyStr: null }) {
  if (value == null || array == null) {
    return value
  }
  const keyStr = option.keyStr
  const returnKeyStr = option.returnKeyStr

  const target = array.find(item => item[keyStr] == value)
  if (target) {
    if (returnKeyStr) {
      return target[returnKeyStr]
    }
  }
  return target
}

/**
 * 格式化金额
 * @param {*} symbol 货币符号，默认￥
 * @param {*} precision 保留小数位个数，默认2
 */
export function formatMoney(value, symbol = '￥ ', precision = 2) {
  return accounting.formatMoney(value, symbol, precision)
}

/**
 * 格式化数字
 * @param {*} precision 保留小数位个数，默认2
 */
export function formatNumber(value, precision = 0) {
  return accounting.formatNumber(value, precision)
}

/**
 * 格式化手机号（隐藏中间4位数字）
 */
export function formatPhoneNumber(value) {
  const reg = /(\d{3})\d{4}(\d{4})/;
  return value.replace(reg, "$1****$2")
}