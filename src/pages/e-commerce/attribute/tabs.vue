<template>
  <!-- 规格属性/参数，SKU/SPU设置 -->
  <div>
    <app-header :breadcrumbs="breadcrumbs">
      <div slot="action-group">
        <a-button
          type="link"
          @click="$refs[`tab${activeKey}`][0].showInfoDrawer(0)"
        >{{ $t('common.new') }}</a-button>
      </div>
    </app-header>
    <a-tabs class="no-footer" :defaultActiveKey="activeKey" @change="handleTabChange">
      <a-tab-pane :key="tab.value" v-for="tab in tabs">
        <span slot="tab">
          <a-icon :type="tab.icon" />
          {{tab.label}}
        </span>
        <shop-tab :key="tab.value" :ref="`tab${tab.value}`"></shop-tab>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import KeepAlive from '@/components/mixins/keep-alive'
import ShopTab from './tab'

export default {
  name: 'ec_shop_tabs_keepalive',
  mixins: [KeepAlive],
  components: {
    ShopTab
  },
  data() {
    return {
      activeKey: 0
    }
  },
  computed: {
    tabs: {
      get() {
        return [
          { label: 'SKU', value: 0, icon: 'inbox' },
          { label: 'SPU', value: 1, icon: 'gift' }
        ]
      }
    }
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
</style>