<script>
export default {
  data() {
    return {
      tableScrollY: ''
    }
  },
  computed: {
    collapsed: {
      get() {
        return this.$store.state.common.collapsed
      },
      set(val) {
        this.$store.dispatch('common/updateCollapsed', val)
      }
    },
    breadcrumbs: {
      get() {
        return this.$store.state.common.breadcrumbs
      },
      set(val) {
        this.$store.dispatch('common/updateBreadcrumbs', val)
      }
    }
  },
  created() {
    this.breadcrumbs = this.$route.meta.breadcrumbs || []
  },
  mounted() {
    if (this.$options.name != 'home') {
      this.resize()
      window.onresize = () => {
        return (() => {
          this.resize()
        })()
      }
    }
  },
  methods: {
    // -- table --
    // 重置 table 滚动高度
    resize: function() {
      setTimeout(() => {
        const $el = document.querySelector('.table-content-wrapper')
        if ($el) {
          const $antTableEl = $el.querySelector('.ant-table-wrapper')

          const $antTableHeaderEl = $antTableEl.querySelector('.ant-table-header')
          const $antTableTheadEl = $antTableEl.querySelector(
            '.ant-table-body .ant-table-thead'
          )
          this.tableScrollY =
            $antTableEl.clientHeight -
            ($antTableHeaderEl ? $antTableHeaderEl.clientHeight : 0) -
            ($antTableTheadEl ? $antTableTheadEl.clientHeight : 0)
        } else {
          this.tableScrollY = ''
        }
      }, 0)
    },
    // -- 分页 --
    // 当前页变化
    onPageChange: function(page, pageSize) {
      console.log(page, pageSize)
    },
    // 每页显示数目变化
    onPageSizeChange: function(current, size) {
      console.log(current, size)
    }
  }
}
</script>
