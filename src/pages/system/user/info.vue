<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs"></app-header>
  </div>
</template>

<script>
export default {
  created() {
    this.breadcrumbs = this.$route.meta.breadcrumbs || []
  }
}
</script>

<style lang="scss" scoped>
</style>