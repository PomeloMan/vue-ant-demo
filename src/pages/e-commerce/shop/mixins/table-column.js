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
            title: this.$t('ecommerce.shop.logo'),
            dataIndex: 'logo',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'logo' }
          },
          {
            title: this.$t('ecommerce.shop.name'),
            dataIndex: 'name',
            width: 150,
            align: 'center',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon'
            },
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus()
                })
              }
            }
          },
          {
            title: this.$t('ecommerce.shop.type'),
            dataIndex: 'type',
            width: 100,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.shop.shopkeeper'),
            dataIndex: 'shopkeeper',
            width: 100,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.shop.location'),
            dataIndex: 'location',
            width: 100,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.shop.verified_date'),
            dataIndex: 'verifiedDate',
            width: 150,
            align: 'center',
            sorter: true,
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