<template>
  <div class="wait-for-approval-step">
    <a-result :title="$t('ecommerce.shop.wait_for_approval_content', {day: '4~5'})">
      <template #icon>
        <svg-icon icon-class="ec_shop_wait_for_approval" class="icon"></svg-icon>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wait-for-approval-step {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    font-size: 56px;
  }
}
</style>