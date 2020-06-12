import { date } from '@/pipes'
export default {
  computed: {
    columns: {
      get() {
        const $this = this
        return [
          {
            title: this.$t('common.number'),
            width: 50,
            align: 'center',
            customRender: function (text, record, index) {
              return ($this.page - 1) * $this.pageSize + (index + 1)
            }
          },
          {
            title: this.$t('ecommerce.brand.logo'),
            dataIndex: 'logo',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'logo' }
          },
          {
            title: this.$t('ecommerce.brand.name'),
            dataIndex: 'name',
            width: 200,
            align: 'center'
          },
          {
            title: this.$t('common.weights'),
            dataIndex: 'sequence',
            width: 100,
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