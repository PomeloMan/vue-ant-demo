<script>
import PerfectScrollbar from 'perfect-scrollbar'
export default {
  data() {
    return {
      elementId: '#scrollContainer',
      perfectScrollbar: '', // PerfectScrollbar 对象
      scrollContainer: '' // PerfectScrollbar 元素
    }
  },
  destroyed() {
    if (this.perfectScrollbar) {
      this.perfectScrollbar.destroy()
    }
    this.perfectScrollbar = null
  },
  methods: {
    // 初始话 PerfectScrollbar
    initPerfectScrollbar() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollContainer = document.querySelector(this.elementId)
          if (this.scrollContainer) {
            this.perfectScrollbar = new PerfectScrollbar(this.scrollContainer)
            // 添加滚动事件
            this.scrollContainer.addEventListener(
              'ps-y-reach-end',
              this.onScrollbarYReachEnd
            )
          }
        }, 0)
      })
    },
    // 滚动条到底部时触发
    onScrollbarYReachEnd() {}
  }
}
</script>