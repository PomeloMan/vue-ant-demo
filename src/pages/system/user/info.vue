<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs"></app-header>
  </div>
</template>

<script>
import AppHeader from '@/components/header.component'

export default {
  components: {
    AppHeader
  },
  created() {
    this.breadcrumbs = this.$route.meta.breadcrumbs || []
  }
}
</script>

<style lang="scss" scoped>
</style>