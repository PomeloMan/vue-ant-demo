<template>
  <a-result status="404" title="404" :sub-title="$t('message.error_404')">
    <template #extra>
      <a-button type="primary" @click="$router.push('/main')">{{$t('common.back_home')}}</a-button>
    </template>
  </a-result>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>