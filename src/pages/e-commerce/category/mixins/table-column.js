import { date } from '@/pipes'
export default {
  computed: {
    columns: {
      get() {
        const $this = this
        return [
          {
            title: this.$t('common.number'),
            width: 100,
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
            title: this.$t('ecommerce.category.thumbnail'),
            dataIndex: 'thumbnail',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'thumbnail' }
          },
          {
            title: this.$t('ecommerce.category.name'),
            dataIndex: 'name',
            width: 200,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.category.level'),
            dataIndex: 'level',
            width: 100,
            align: 'center',
            customRender: function (val) {
              return `${val}${$this.$t('common.level_unit')}`
            }
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