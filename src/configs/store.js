import Vue from 'vue'
import Vuex from 'vuex'

import common from '../stores/common'
import ecshop from '../stores/ecommerce/shop'
import eccategory from '../stores/ecommerce/category'
import ecstandard from '../stores/ecommerce/standard'
import ecbrand from '../stores/ecommerce/brand'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    ecshop,
    eccategory,
    ecstandard,
    ecbrand
  }
})