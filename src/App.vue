<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view :key="$route.query.t"></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState({
      locale: state => state.common.locale
    })
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
