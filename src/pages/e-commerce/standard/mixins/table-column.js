import { date, find } from '@/pipes'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      ecCategories: state => state.eccategory.categories
    }),
    columns: {
      get() {
        const $this = this
        return [
          {
            title: this.$t('common.number'),
            width: 50,
            align: 'center',
            customRender: function (val, record, index) {
              if (record.children) {
                return ($this.page - 1) * $this.pageSize + (index + 1)
              } else {
                return index + 1
              }
            }
          },
          {
            title: this.$t('ecommerce.standard.name'),
            dataIndex: 'name',
            width: 150,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.standard.category'),
            dataIndex: 'categoryId',
            width: 100,
            align: 'center',
            customRender: function (val) {
              return find(val, $this.ecCategories, { keyStr: 'id', returnKeyStr: 'name' })
            }
          },
          {
            title: this.$t('ecommerce.standard.shop'),
            dataIndex: 'shopName',
            width: 150,
            align: 'center'
          },
          {
            title: this.$t('common.setting'),
            width: 200,
            align: 'center',
            scopedSlots: { customRender: 'setting' }
          },
          {
            title: this.$t('common.weights'),
            dataIndex: 'sequence',
            width: 50,
            align: 'center'
          },
          {
            title: this.$t('common.create_time'),
            dataIndex: 'createdDate',
            width: 150,
            align: 'center',
            customRender: function (val) {
              return date(val)
            }
          },
          {
            title: this.$t('common.operation'),
            width: 150,
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  }
}