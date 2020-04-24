<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
import { burstOutGranule } from './burst'

export default {
  props: {
    method: {
      // 触发方法
      type: String,
      default: () => ''
    },
    event: {
      // 触发事件
      type: String,
      default: () => 'click'
    }
  },
  data() {
    return {
      isComplete: false
    }
  },
  mounted() {
    this.$el.addEventListener(this.event, this[this.method])
  },
  destroyed() {
    this.$el.removeEventListener(this.event, this[this.method])
  },
  methods: {
    burstOutGranule
  }
}
</script>