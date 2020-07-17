<template>
  <div>
    <app-header type="bordered" :breadcrumbs="$route.meta.breadcrumbs || []"></app-header>
    <div class="scroll-wrapper no-footer" style="padding: 0;">
      <div id="scrollContainer">
        <mx-graph-orgchart></mx-graph-orgchart>
      </div>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from '@/components/mixins/perfect-scrollbar'
import MxGraphOrgchart from '@/components/plugins/mxgraph-orgchart'
export default {
  mixins: [PerfectScrollbar],
  components: {
    MxGraphOrgchart
  },
  data() {
    return {
      loadingData: false
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>