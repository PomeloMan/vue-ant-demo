import { mapState } from "vuex"
import { buildTree } from '@/utils/index'
/**
 * 电商模块公共数据
 * 这里只在数据为空的情况下重新请求后台获取数据，如果数据有更新可以在更新后执行清空原数据来达到更新刷新数据
 */
export default {
  computed: {
    ...mapState({
      ecCategories: state => state.eccategory.categories,
      ecStandards: state => state.ecstandard.standards
    })
  },
  created() {
    Promise.all([
      this.getEcCategory(),
      this.getEcStandard()
    ]).then()
  },
  methods: {
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
    }
  }
}