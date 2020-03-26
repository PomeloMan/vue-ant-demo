<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view :key="$route.query.t"></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
export default {
  name: 'app',
  computed: {
    locale: {
      get() {
        return this.$i18n.locale.includes('zh') ? zhCN : enUS
      }
    }
  }
}
</script>

<style scope>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
