<template>
  <a-result status="500" title="500" :sub-title="$t('message.error_500')">
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