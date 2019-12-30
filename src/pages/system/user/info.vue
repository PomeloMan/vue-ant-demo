<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs"></app-header>
  </div>
</template>

<script>
import AppHeader from '@/components/header.component'
// import AppFooter from '@/components/footer.component'

export default {
  components: {
    AppHeader,
    // AppFooter
  },
  created() {
    this.breadcrumbs = this.$route.meta.breadcrumbs || []
  }
}
</script>

<style lang="scss" scoped>
</style>