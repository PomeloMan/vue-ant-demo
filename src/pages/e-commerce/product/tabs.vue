<template>
  <!-- 店铺 -->
  <div>
    <app-header :breadcrumbs="breadcrumbs">
      <div slot="action-group">
        <a-button
          type="link"
          @click="$router.push({path:`/main/e-commerce/product/${0}`})"
        >{{ $t('common.new') }}</a-button>
      </div>
    </app-header>
    <a-tabs class="no-footer" :defaultActiveKey="activeKey" @change="handleTabChange">
      <a-tab-pane :key="tab.value" v-for="tab in tabs">
        <span slot="tab">
          <a-icon :type="tab.icon" />
          {{tab.label}}
        </span>
        <product-tab class="product-tab" :key="tab.value" :ref="`tab${tab.value}`"></product-tab>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import KeepAlive from '@/components/mixins/keep-alive'
import ProductTab from './tab'
import { mapState } from 'vuex'

export default {
  name: 'ec_product_tabs_keepalive',
  mixins: [KeepAlive],
  components: {
    ProductTab
  },
  data() {
    return {
      activeKey: 0
    }
  },
  computed: {
    ...mapState({
      tabs: state => state.ecshop.tabs
    })
  },
  created() {
    this.breadcrumbs = this.$route.meta.breadcrumbs || []
  },
  mounted() {
    this.$nextTick(() => {
      this.handleTabChange(this.activeKey)
    })
  },
  activated() {},
  methods: {
    handleTabChange(activeKey) {
      this.activeKey = activeKey
      const reference =
        this.$refs[`tab${activeKey}`] && this.$refs[`tab${activeKey}`][0]
      if (reference && reference.getData) {
        reference.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-tab {
  height: 100%;
}
</style>