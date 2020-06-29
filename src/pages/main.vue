<template>
  <a-layout class="layout-wrapper">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <main-sider></main-sider>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
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
        </a-breadcrumb>-->
        <transition name="slide-fade">
          <keep-alive :include="keepAliveList">
            <router-view class="container"></router-view>
          </keep-alive>
        </transition>
        <a-drawer
          placement="right"
          :closable="false"
          :visible="settingDrawerVisible"
          :get-container="false"
          :wrap-style="{ position: 'absolute' }"
          @close="settingDrawerVisible = false"
        ></a-drawer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Store from '@/components/mixins/store.js'
import MainSider from './main-sider'
import MainHeader from './main-header'
import { Layout } from 'ant-design-vue'
import { mapState } from 'vuex'

import { User } from '@/models/user'

export default {
  name: 'home',
  mixins: [Store],
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutSider: Layout.Sider,
    ALayoutContent: Layout.Content,
    MainSider,
    MainHeader
  },
  computed: {
    ...mapState({
      user: state => new User(state.common.user),
      keepAliveList: state => state.common.keepAliveList
    })
  },
  data() {
    return {}
  },
  created() {
    Promise.all([this.getUser(), this.getDict()]).then()
  },
  methods: {
    // 获取用户信息
    getUser() {
      return this.$http.get(this.$api.SYS_USER).then(({ data }) => {
        this.$store.dispatch('common/updateUser', data)
      })
    },
    // 获取字典数据
    getDict() {
      return this.$http.get(this.$api.DICT_LIST).then(({ data }) => {
        this.dicts = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  height: 100%;
}
.ant-layout-header {
  background: rgb(255, 255, 255);
  padding: 0px;
  line-height: 48px;
  height: 48px;
}
.layout-content {
  position: relative;
  overflow: hidden;
}

// <transition>
.slide-fade-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.3s;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
