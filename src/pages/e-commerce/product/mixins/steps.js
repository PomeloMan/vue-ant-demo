export default {
  computed: {
    steps: {
      get() {
        return [
          {
            index: 0,
            title: this.$t('common.step_one'),
            subtitle: this.$t('ecommerce.product.base_info')
          },
          {
            index: 1,
            title: this.$t('common.step_two'),
            subtitle: this.$t('ecommerce.product.standards')
          },
          {
            index: 2,
            title: this.$t('common.step_three'),
            subtitle: this.$t('ecommerce.product.details')
          },
          {
            index: 3,
            title: this.$t('common.step_four'),
            subtitle: this.$t('ecommerce.product.wait_for_approval')
          }
        ]
      }
    }
  }
}