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
            title: this.$t('ecommerce.product.picture'),
            width: 120,
            align: 'center',
            scopedSlots: { customRender: 'picture' }
          },
          {
            title: this.$t('ecommerce.product.name'),
            dataIndex: 'name',
            width: 200,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.product.brand'),
            dataIndex: 'brandName',
            width: 100,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.product.current_price'),
            dataIndex: 'cprice',
            width: 100,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.product.original_price'),
            dataIndex: 'oprice',
            width: 100,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.product.sequence'),
            dataIndex: 'sequence',
            width: 100,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.product.category'),
            dataIndex: 'categoryName',
            width: 100,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.product.publisher'),
            dataIndex: 'publisher',
            width: 100,
            align: 'center'
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