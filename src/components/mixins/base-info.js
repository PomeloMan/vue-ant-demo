import { stringFormat } from '@/utils'
export default {
  data() {
    return {
      id: ''
    }
  },
  created() {
    this.id = this.$route.params.id
    this.breadcrumbs = this.$route.meta.breadcrumbs || []
    this.breadcrumbs.forEach(b => {
      if (b.info && b.info instanceof Function) {
        b.name = b.info(this.id === '0')
        b.url = stringFormat(b.url, this.id)
      }
    })
  }
}