<template>
  <div class="main-header">
    <div class="left-wrapper">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapse" />
    </div>
    <div class="right-wrapper">
      <a-dropdown class :trigger="['click']">
        <li class="ant-menu-item ant-dropdown-link" href="#">
          语言
          <a-icon type="down" />
        </li>
        <a-menu slot="overlay">
          <a-menu-item key="0" @click="i18n('zh')">
            <svg-icon icon-class="locale_zh"></svg-icon>中文
          </a-menu-item>
          <a-menu-item key="1" @click="i18n('en')">
            <svg-icon icon-class="locale_en"></svg-icon>英文
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <a-dropdown class :trigger="['click']">
        <li class="user-info ant-menu-item ant-dropdown-link" href="javascript:;">
          <a-avatar class="user-avatar" icon="user" />
          <span>Admin(超级管理员)</span>
          <a-icon type="down" />
        </li>
        <a-menu slot="overlay">
          <a-menu-item @click="logout()">登出</a-menu-item>
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
  created() {
    // debugger
  },
  methods: {
    collapse() {
      this.collapsed = !this.collapsed
    },
    i18n(locale) {
      this.$i18n.locale = locale
      // this.dicts = this.$store.state.common.dicts
      // this.mapOfDict = this.$i18n.locale
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
  line-height: 64px;
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
</style>
