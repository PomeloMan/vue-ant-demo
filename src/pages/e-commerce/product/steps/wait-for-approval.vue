<template>
  <div class="wait-for-approval-step">
    <a-row class="row" type="flex" justify="center" align="middle">
      <a-col :span="24">
        <svg-icon icon-class="ec_shop_wait_for_approval" class="icon"></svg-icon>
        <h3
          style="text-align:center"
        >{{$t('ecommerce.shop.wait_for_approval_content', {day: '4~5'})}}</h3>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wait-for-approval-step {
  height: 100%;
  .row {
    width: 80%;
    margin: auto;
    height: inherit;
  }
  .ant-col {
    text-align: center;
    .icon {
      font-size: 56px;
      margin-bottom: 0.5em;
    }
  }
}
</style>