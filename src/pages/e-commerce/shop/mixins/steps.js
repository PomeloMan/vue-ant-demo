export default {
  computed: {
    steps: {
      get() {
        return [
          {
            index: 0,
            title: this.$t('common.step_one'),
            subtitle: this.$t('ecommerce.shop.base_info')
          },
          {
            index: 1,
            title: this.$t('common.step_two'),
            subtitle: this.$t('ecommerce.shop.qualification_info')
          },
          {
            index: 2,
            title: this.$t('common.step_three'),
            subtitle: this.$t('ecommerce.shop.shopkeeper_info')
          },
          {
            index: 3,
            title: this.$t('common.step_four'),
            subtitle: this.$t('ecommerce.shop.wait_for_approval')
          }
        ]
      }
    }
  }
}