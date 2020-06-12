<template>
  <div class="main-header">
    <div class="left-wrapper">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapse" />
    </div>
    <div class="right-wrapper">
      <li class="ant-menu-item">
        <!-- <lottie-web></lottie-web> -->
      </li>

      <!-- 语言 -->
      <a-dropdown class :trigger="['click']">
        <li class="ant-menu-item ant-dropdown-link" href="#">
          <span>{{$t('common.locale')}}</span>
          <a-icon type="down" />
        </li>
        <a-menu slot="overlay" class="i18n-menu">
          <a-menu-item :key="item.code" @click="i18n(item.locale)" v-for="item in locales">
            <svg-icon :icon-class="`locale_${item.code}`" class="icon"></svg-icon>
            <span>{{item.name}}</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <!-- 账号 -->
      <a-dropdown class :trigger="['click']">
        <li class="user-info ant-menu-item ant-dropdown-link" href="javascript:;">
          <a-avatar class="user-avatar" icon="user" />
          <span>Admin(超级管理员)</span>
          <a-icon type="down" />
        </li>
        <a-menu slot="overlay">
          <a-menu-item @click="logout()">{{$t('common.logout')}}</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import StoreComponent from '@/components/store.component'
import { Menu, Dropdown } from 'ant-design-vue'
import i18n from '@/constants/i18n'

export default {
  name: 'main-header',
  mixins: [StoreComponent],
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ADropdown: Dropdown
  },
  data() {
    return {
      locales: i18n.locales
    }
  },
  created() {},
  mounted() {},
  methods: {
    collapse() {
      this.collapsed = !this.collapsed
    },
    i18n(locale) {
      this.locale = locale // Ant组件国际化
      this.$moment.locale(locale.locale) // 时间组件国际化
      this.$i18n.locale = locale.locale // 国际化
    },
    logout() {
      localStorage.removeItem('oauth2AccessToken')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right-wrapper {
    padding: 0 24px;
    display: flex;
    align-items: center;
  }
  .ant-menu-item {
    padding: 0 10px;
  }
}
.trigger {
  font-size: 18px;
  line-height: inherit;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}
.user-info {
  display: flex;
  align-items: center;
  .user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
}
.i18n-menu .icon {
  margin-right: 8px;
}
</style>
