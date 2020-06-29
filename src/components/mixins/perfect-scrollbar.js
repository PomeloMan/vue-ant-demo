import PerfectScrollbar from 'perfect-scrollbar'
export default {
  data() {
    return {
      elementId: '#scrollContainer',
      perfectScrollbar: '', // PerfectScrollbar 对象
      scrollContainer: '', // PerfectScrollbar 元素
      scrollWrapper: () => document.getElementById('scrollContainer')
    }
  },
  mounted() {
    this.initPerfectScrollbar()
    this.$nextTick(() => {
      if (this.scrollWrapper()) {
        this.scrollWrapper().style.overflow = 'hidden'
      }
    })
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
          const $el = document.querySelector('.scroll-wrapper')
          // 初始话 perfect-scrollbar
          this.scrollContainer = document.querySelector(this.elementId)
          if (this.scrollContainer) {
            if ($el) {
              this.scrollContainer.style.height = $el.clientHeight + 'px'
            }
            this.perfectScrollbar = new PerfectScrollbar(this.scrollContainer)
            this.scrollContainer.style.position = 'relative'
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
    onScrollbarYReachEnd() { }
  }
}