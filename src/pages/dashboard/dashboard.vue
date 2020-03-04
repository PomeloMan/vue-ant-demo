<template>
  <div>
    <app-header :breadcrumbs="$route.meta.breadcrumbs || []"></app-header>
    <div class="scroll-wrapper no-footer">
      <div class="content-wrapper"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>

<style scoped>
</style>
