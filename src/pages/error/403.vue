<template>
  <a-result status="403" title="403" :sub-title="$t('message.error_403')">
    <template #extra>
      <a-button type="primary" @click="$router.push('/main')">{{$t('common.back_home')}}</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  created() {
    // 清空所有缓存页面，确保权限页不被缓存
    this.$store.dispatch('common/updateKeepAliveList', [])
  }
}
</script>

<style lang="scss" scoped>
</style>