<template>
  <div>
    <app-header :breadcrumbs="$route.meta.breadcrumbs || []"></app-header>
    <div class="scroll-wrapper no-footer">
      <div class="content-wrapper">
        <div id="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as G2 from '@antv/g2'

export default {
  components: {},
  data() {
    return {
      interval: null,
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.renderLine()
      }, 0);
    })
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    renderLine() {
      const wrapper = document.querySelector('.content-wrapper')
      this.chart = new G2.Chart({
        container: 'line',
        forceFit: true,
        width: wrapper.clientWidth,
        animate: false
      })
      let time = this.$moment().valueOf()
      let lastTime = this.$moment().subtract(1, 'minutes').valueOf()
      const data = []
      while (time > lastTime) {
        const second = this.$moment(lastTime).format('mm:ss')
        data.push({
          second,
          value: Math.random()
        })
        lastTime += 1000
      }
      this.chart.source(data)
      this.chart.tooltip({
        crosshairs: {
          type: 'cross'
        }
      })
      this.chart.scale('value', {
        alias: '销售额(万)'
      })
      this.chart.line().position('second*value')
      this.chart
        .point()
        .position('second*value')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      this.chart.render()
      this.interval = setInterval(() => {
        const _data = data
        const second = this.$moment(time).format('mm:ss')
        _data.shift()
        _data.push({
          second,
          value: Math.random()
        })
        this.chart.changeData(_data)
        time += 1000
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
