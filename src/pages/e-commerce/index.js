import { mapState } from "vuex"
import { buildTree } from '@/utils/index'
/**
 * 电商模块公共数据
 * 这里只在数据为空的情况下重新请求后台获取数据，如果数据有更新可以在更新后执行清空原数据来达到更新刷新数据
 */
export default {
  computed: {
    ...mapState({
      ecShops: state => state.ecshop.shops,
      ecCategories: state => state.eccategory.categories,
      ecStandards: state => state.ecstandard.standards,
      ecBrands: state => state.ecbrand.brands
    })
  },
  created() {
    Promise.all([
      this.getEcShop(),
      this.getEcCategory(),
      this.getEcStandard(),
      this.getBrand()
    ]).then()
  },
  methods: {
    // 获取店铺全量数据，数据较多时弃用此方法；
    getEcShop() {
      if (this.ecShops && this.ecShops.length > 0) {
        return new Promise((resolve) => {
          resolve(this.ecShops)
        })
      } else {
        return this.$http.get(this.$api.ECOMMERCE_SHOP_LIST).then(({ data }) => {
          this.$store.dispatch('ecshop/updateShops', data)
        })
      }
    },
    // 获取分类全量数据，新建/编辑商品、新建/编辑分类时需要
    getEcCategory() {
      if (this.ecCategories && this.ecCategories.length > 0) {
        return new Promise((resolve) => {
          resolve(this.ecCategories)
        })
      } else {
        return this.$http.get(this.$api.ECOMMERCE_CATEGORY_LIST).then(({ data }) => {
          this.$store.dispatch('eccategory/updateCategories', buildTree(data))
        })
      }
    },
    // 获取规格标准全量数据，新建/编辑属性时需要
    getEcStandard() {
      if (this.ecStandards && this.ecStandards.length > 0) {
        return new Promise((resolve) => {
          resolve(this.ecStandards)
        })
      } else {
        return this.$http.get(this.$api.ECOMMERCE_STANDARD_LIST).then(({ data }) => {
          this.$store.dispatch('ecstandard/updateStandards', data)
        })
      }
    },
    // 获取品牌全量数据，新建/编辑商品时需要
    getBrand() {
      if (this.ecBrands && this.ecBrands.length > 0) {
        return new Promise((resolve) => {
          resolve(this.ecBrands)
        })
      } else {
        return this.$http.get(this.$api.ECOMMERCE_BRAND_LIST).then(({ data }) => {
          this.$store.dispatch('ecbrand/updateBrands', data)
        })
      }
    }
  }
}