<template>
  <div>
    <app-header type="bordered" :breadcrumbs="$route.meta.breadcrumbs || []"></app-header>
    <div class="scroll-wrapper no-footer" style="padding: 0;">
      <iframe :src="`${assetBasePath}mxgraph/examples/grapheditor/index.html`"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assetBasePath: process.env.VUE_APP_BASE_URL
    }
  }
}
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  overflow: hidden;
}
</style>