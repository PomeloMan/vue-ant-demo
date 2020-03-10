<template>
  <a-layout class="layout-wrapper">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <main-sider></main-sider>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <main-header></main-header>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <!-- @reference '@/components/header.component.vue' -->
        <!-- <a-breadcrumb
          class="breadcrumb-wrapper"
          :style="{
            height: breadcrumbs && breadcrumbs.length > 0 ? '40px' : '24px'
          }"
        >
          <template v-for="item in breadcrumbs">
            <a-breadcrumb-item :key="item.name">
              <template v-if="!!item.url">
                <router-link
                  v-if="item.url === '/'"
                  :to="{ path: item.url, query: { t: Date.now() } }"
                  >{{ item.name }}</router-link
                >
                <router-link v-else :to="item.url">{{ item.name }}</router-link>
              </template>
              <template v-else>
                {{ item.name }}
              </template>
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb> -->
        <template>
          <router-view class="container"></router-view>
        </template>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import StoreComponent from '@/components/store.component'
import { Layout } from 'ant-design-vue'
import MainSider from './main-sider'
import MainHeader from './main-header'
import { getStoreItemByBase64 } from '@/utils'

export default {
  name: 'home',
  mixins: [StoreComponent],
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutSider: Layout.Sider,
    ALayoutContent: Layout.Content,
    MainSider,
    MainHeader
  },
  computed: {},
  data() {
    return {}
  },
  created() {
    this.$user = this.$user || getStoreItemByBase64('user')
    console.log(this.$user)
    // 获取字典数据并保存
    this.$http.get(this.$api.DICT_LIST).then(({ data }) => {
      this.dicts = data
    })
  }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  height: 100%;
}
</style>
