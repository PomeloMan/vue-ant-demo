<template>
  <div>
    <app-header type="bordered" :breadcrumbs="$route.meta.breadcrumbs || []"></app-header>
    <div class="scroll-wrapper no-footer" style="padding: 0;">
      <div id="scrollContainer">
        <mx-graph-workflow></mx-graph-workflow>
      </div>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from '@/components/mixins/perfect-scrollbar'
import MxGraphWorkflow from '@/components/plugins/mxgraph-workflow'
export default {
  mixins: [PerfectScrollbar],
  components: {
    MxGraphWorkflow
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