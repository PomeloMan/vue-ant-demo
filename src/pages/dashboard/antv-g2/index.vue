<template>
  <div ref="page">
    <app-header type="bordered" :breadcrumbs="$route.meta.breadcrumbs || []"></app-header>
    <div class="scroll-wrapper no-footer">
      <div class="content-wrapper" style="background-color: transparent;">
        <div class="toolbar">
          <div>
            <span>数据台账</span>
            <a-range-picker
              :disabled-date="disabledDate"
              :getCalendarContainer="triggerNode => triggerNode.parentNode"
              format="YYYY-MM-DD"
              @calendarChange="handleCalendarChange"
            >
              <a-icon slot="suffixIcon" type="calendar" style="color: #bfbfbf" />
            </a-range-picker>
            <tag v-if="selectedType" @close="selectedType = null; render()">
              <p>
                车辆类型：
                <span>{{selectedType.item}}</span>
              </p>
            </tag>
          </div>
          <div>
            <a-button type="link" size="small" @click="toggleFullscreen()">
              <a-icon :type="screenfull.isFullscreen? 'fullscreen-exit': 'fullscreen'"></a-icon>
            </a-button>
          </div>
        </div>
        <section class="overview-wrapper">
          <a-row :gutter="16">
            <a-col :span="6" :key="item.index" v-for="item in overviews">
              <a-card :bodyStyle="cardBodyStyle">
                <div class="card-body-content">
                  <p>{{item.label}}</p>
                  <div class="progress-wrapper">
                    <a-progress
                      type="circle"
                      :percent="item.percent"
                      :width="90"
                      :strokeWidth="9"
                      :strokeColor="item.color"
                    >
                      <span class="ant-progress-description" slot="format" slot-scope="percent">
                        <p>
                          <span>{{percent}}</span>%
                        </p>
                        <p>{{item.sublabel}}</p>
                      </span>
                    </a-progress>
                    <div>
                      <p>{{item.value | formatNumber}}</p>
                      <p>总车数</p>
                    </div>
                  </div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </section>
        <section class="dashboard-wrapper">
          <a-row type="flex" :gutter="16" style="margin-bottom: 0px;">
            <a-col :span="18">
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-card :bodyStyle="cardBodyStyle" ref="ringRef">
                    <div class="card-body-content">
                      <div class="title">
                        <p>出门证车辆类型统计</p>
                        <a-button type="link" size="small" @click="toggleFullscreen('ringRef')">
                          <a-icon :type="screenfull.isFullscreen? 'fullscreen-exit': 'fullscreen'"></a-icon>
                        </a-button>
                      </div>
                      <div class="chart-wrapper">
                        <a-spin :spinning="ringChart == null"></a-spin>
                        <div id="ring"></div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <a-card :bodyStyle="cardBodyStyle" ref="lineRef1">
                    <div class="card-body-content">
                      <div class="title">
                        <p>出门证序列号的计数统计</p>
                        <a-button type="link" size="small" @click="toggleFullscreen('lineRef1')">
                          <a-icon :type="screenfull.isFullscreen? 'fullscreen-exit': 'fullscreen'"></a-icon>
                        </a-button>
                      </div>
                      <div class="chart-wrapper">
                        <a-spin :spinning="lineChart1 == null"></a-spin>
                        <div id="line1"></div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-card :bodyStyle="cardBodyStyle" ref="lineRef2">
                    <div class="card-body-content">
                      <div class="title">
                        <p>出门证出园时间统计</p>
                        <a-button type="link" size="small" @click="toggleFullscreen('lineRef2')">
                          <a-icon :type="screenfull.isFullscreen? 'fullscreen-exit': 'fullscreen'"></a-icon>
                        </a-button>
                      </div>
                      <div class="chart-wrapper">
                        <a-spin :spinning="lineChart2 == null"></a-spin>
                        <div id="line2"></div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="6">
              <a-row>
                <a-card class="total-card" :bodyStyle="cardBodyStyle">
                  <div class="card-body-content">
                    <div>
                      <p>总数量</p>
                      <p>446</p>
                    </div>
                    <div class="footer">
                      <p>同比 12%</p>
                    </div>
                  </div>
                </a-card>
              </a-row>
              <a-row>
                <a-card class="bar-card" :bodyStyle="{height: '100%', padding: 0}" ref="barRef">
                  <div class="card-body-content">
                    <div class="title">
                      <p>出门证供应商统计</p>
                      <a-button type="link" size="small" @click="toggleFullscreen('barRef')">
                        <a-icon :type="screenfull.isFullscreen? 'fullscreen-exit': 'fullscreen'"></a-icon>
                      </a-button>
                    </div>
                    <div class="chart-wrapper scroll-bar">
                      <a-spin :spinning="barChart == null"></a-spin>
                      <div id="bar"></div>
                    </div>
                  </div>
                </a-card>
              </a-row>
            </a-col>
          </a-row>
        </section>
        <section class="polygon-wrapper">
          <a-card class="polygon-card" :bodyStyle="cardBodyStyle" ref="polygonRef">
            <div class="card-body-content">
              <div class="title">
                <p>RPM内仓送货汇总</p>
                <a-button type="link" size="small" @click="toggleFullscreen('polygonRef')">
                  <a-icon :type="screenfull.isFullscreen? 'fullscreen-exit': 'fullscreen'"></a-icon>
                </a-button>
              </div>
              <div class="chart-wrapper">
                <a-spin :spinning="polygonChart == null"></a-spin>
                <div id="polygon"></div>
              </div>
            </div>
          </a-card>
        </section>
        <a-card>
          <div id="line"></div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as G2 from '@antv/g2'
import * as screenfull from 'screenfull'
import Tag from '@/components/plugins/tag'
import elementResizeDetectorMaker from 'element-resize-detector'
import debounce from 'lodash/debounce'
export default {
  components: { Tag },
  computed: {
    chartMap: {
      get() {
        return {
          ringRef: { name: 'ringChart', render: this.renderRing },
          lineRef1: { name: 'lineChart1', render: this.renderLine1 },
          lineRef2: { name: 'lineChart2', render: this.renderLine2 },
          barRef: { name: 'barChart', render: this.renderBar },
          polygonRef: { name: 'polygonChart', render: this.renderPolygon }
        }
      }
    }
  },
  data() {
    this.handleEleResize = debounce(this.handleEleResize, 500, {
      leading: false,
      trailing: true
    })
    return {
      screenfull,
      erd: elementResizeDetectorMaker(),
      data: null,
      calendarDate: null,
      interval: null,
      chart: null,
      ringChart: null,
      lineChart1: null,
      lineChart2: null,
      barChart: null,
      polygonChart: null,
      selectedType: null,
      overviews: [
        {
          index: 0,
          label: '进园点击情况汇总',
          sublabel: '进园',
          value: 2455,
          percent: 36,
          color: '#0294FF'
        },
        {
          index: 1,
          label: '进园磅重保存汇总',
          sublabel: '匹配',
          value: 12400,
          percent: 36,
          color: '#15B37F'
        },
        {
          index: 2,
          label: '司机登记汇总',
          sublabel: '已填',
          value: 2455,
          percent: 66,
          color: '#F5A740'
        },
        {
          index: 3,
          label: '成品出门证填写汇总',
          sublabel: '已填',
          value: 750,
          percent: 40,
          color: '#EB755F'
        }
      ],
      cardBodyStyle: {
        height: '100%',
        padding: '16px'
      }
    }
  },
  created() {},
  mounted() {
    this.render()
    this.$nextTick(() => {
      setTimeout(() => {
        // 添加元素监听
        this.erd.listenTo(this.$refs.page, this.handleEleResize)
      }, 300)
    })
  },
  destroyed() {
    // 删除元素监听
    this.erd.uninstall(this.$refs.page)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleEleResize(element) {
      var width = element.offsetWidth
      var height = element.offsetHeight
      console.log('Size: ' + width + 'x' + height)
    },
    render() {
      this.$nextTick(() => {
        // 先销毁原图再渲染
        Object.keys(this.chartMap).forEach(key => {
          const chart = this.chartMap[key]
          if (chart && this[chart.name]) {
            this[chart.name].destroy()
            this[chart.name] = null
          }
        })
        setTimeout(() => {
          this.$http.get(this.$api.DASHBOARD_ANTV_G2).then(({ data }) => {
            this.data = data
            this.renderPolygon()
            this.renderLine()
            this.renderRing()
            this.renderLine1()
            this.renderLine2()
            this.renderBar()
          })
        }, 0)
      })
    },
    handleCalendarChange(dates) {
      if (dates.length === 1) {
        this.calendarDate = dates[0]
      } else {
        this.calendarDate = null
      }
    },
    disabledDate(current) {
      if (this.calendarDate) {
        const cal = this.calendarDate.format()
        return (
          (current &&
            current <
              this.$moment(cal)
                .add(-1, 'months')
                .startOf('day')) ||
          (current &&
            current >
              this.$moment(cal)
                .add(1, 'months')
                .endOf('day'))
        )
      }
    },
    // 全屏切换
    toggleFullscreen(refName) {
      if (this.screenfull.isEnabled) {
        if (refName) {
          this.screenfull.toggle(this.$refs[refName].$el).then(() => {
            this.$forceUpdate()
            const chart = this.chartMap[refName]
            if (chart && this[chart.name]) {
              this[chart.name].destroy()
              this[chart.name] = null
            }
            setTimeout(() => {
              chart.render()
            }, 500) // 给足够的时间等全屏切换完全结束后再处理，这样可以获取准确的图形元素宽高
          })
        } else {
          this.screenfull.toggle(this.$refs.page).then(() => {
            this.$forceUpdate()
          })
        }
      }
    },
    renderLine() {
      const wrapper = document.querySelector('.content-wrapper')
      this.chart = new G2.Chart({
        container: 'line',
        forceFit: true,
        width: wrapper.clientWidth,
        animate: false
      })
      let time = this.$moment().valueOf()
      let lastTime = this.$moment()
        .subtract(1, 'minutes')
        .valueOf()
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
    },
    renderRing() {
      const wrapper = this.$refs.ringRef.$el.querySelector('.card-body-content')
      const chart = new G2.Chart({
        container: 'ring',
        forceFit: true,
        width: wrapper.clientWidth,
        height: wrapper.clientHeight - 24,
        padding: 'auto'
      })
      chart.coord('theta', {
        radius: 0.6, // 半径
        innerRadius: 0.5, // 空心圆的半径
        startAngle: -Math.PI / 2 - Math.PI / 4,
        endAngle: (-Math.PI / 2 - Math.PI / 4) + Math.PI * 2
      })
      chart.source([
        { item: '原包材（RPM）车辆', count: 20, percent: 0.2 },
        { item: '成品车辆', count: 2, percent: 0.02 },
        { item: '废弃物车辆', count: 8, percent: 0.08 },
        { item: '工程车辆', count: 15, percent: 0.15 },
        { item: '爱索尔车辆', count: 10, percent: 0.1 },
        { item: '内仓转运车辆', count: 10, percent: 0.1 },
        { item: '其他', count: 5, percent: 0.05 },
        { item: '半成品车辆', count: 30, percent: 0.3 }
      ])
      chart.tooltip({
        showTitle: false
      })
      // 设置图例
      chart.legend({
        position: 'right', // 设置图例的显示位置
        marker: 'square', // 图例几何形状，默认circle
        itemGap: 20, // 图例项之间的间距
        clickable: false,
        hoverable: false
      })

      // eslint-disable-next-line
      const interval = chart
        .intervalStack()
        .position('count')
        .color('item')
      // interval.label('item', {
      //   textStyle: {
      //     fontSize: 12
      //   }
      // })
      chart.render()

      // const canvas = chart.get('canvas')
      // 设置点击事件
      chart.on('interval:click', ev => {
        const data = ev.data
        const shape = ev.shape
        if (shape.get('selected')) {
          if (data) {
            // 查询指定图例数据
            // const item = data._origin['item']
            // canvas.draw()
            // chart.repaint()
            this.selectedType = data._origin
          }
        } else {
          // 查询全量数据
          this.selectedType = null
        }
      })
      this.ringChart = chart

      this.drawRingLabel(chart)
    },
    drawRingLabel(chart) {
      // draw label
      const OFFSET = 20
      const APPEND_OFFSET = 10
      const LINEHEIGHT = 0
      const coord = chart.get('coord') // 获取坐标系对象
      const center = coord.center // 极坐标圆心坐标
      const r = coord.radius // 极坐标半径
      const canvas = chart.get('canvas')
      const canvasWidth = chart.get('width')
      const canvasHeight = chart.get('height')
      const labelGroup = canvas.addGroup()
      addPieLabel(chart)
      canvas.draw()
      // main
      function addPieLabel() {
        const halves = [[], []]
        const data = chart.get('data')
        let angle = -Math.PI / 2 - Math.PI / 4;

        for (let i = 0; i < data.length; i++) {
          const percent = data[i].percent
          const targetAngle = angle + Math.PI * 2 * percent
          const middleAngle = angle + (targetAngle - angle) / 2
          angle = targetAngle
          const edgePoint = getEndPoint(center, middleAngle, r)
          const routerPoint = getEndPoint(center, middleAngle, r + OFFSET)
          // label
          const label = {
            _anchor: edgePoint,
            _router: routerPoint,
            _data: data[i],
            x: routerPoint.x,
            y: routerPoint.y,
            r: r + OFFSET,
            fill: '#bfbfbf'
          }
          // 判断文本的方向
          if (edgePoint.x < center.x) {
            label._side = 'left'
            halves[0].push(label)
          } else {
            label._side = 'right'
            halves[1].push(label)
          }
        } // end of for

        const maxCountForOneSide = parseInt(canvasHeight / LINEHEIGHT, 10)
        halves.forEach(function(half, index) {
          // step 2: reduce labels
          if (half.length > maxCountForOneSide) {
            half.sort(function(a, b) {
              return b._percent - a._percent
            })
            half.splice(maxCountForOneSide, half.length - maxCountForOneSide)
          }

          // step 3: distribute position (x and y)
          half.sort(function(a, b) {
            return a.y - b.y
          })
          antiCollision(half, index)
        })
      }

      function getEndPoint(center, angle, r) {
        return {
          x: center.x + r * Math.cos(angle),
          y: center.y + r * Math.sin(angle)
        }
      }

      function drawLabel(label) {
        const _anchor = label._anchor,
          _router = label._router,
          fill = label.fill,
          y = label.y

        const labelAttrs = {
          y,
          fontSize: 12, // 字体大小
          fill: '#808080',
          text: label._data.item + '\n' + label._data.count,
          textBaseline: 'bottom'
        }
        const lastPoint = {
          y
        }

        if (label._side === 'left') {
          // 具体文本的位置
          lastPoint.x = APPEND_OFFSET
          labelAttrs.x = APPEND_OFFSET // 左侧文本左对齐并贴着画布最左侧边缘
          labelAttrs.textAlign = 'left'
        } else {
          lastPoint.x = canvasWidth - APPEND_OFFSET
          labelAttrs.x = canvasWidth - APPEND_OFFSET // 右侧文本右对齐并贴着画布最右侧边缘
          labelAttrs.textAlign = 'right'
        }

        // 绘制文本
        labelGroup.addShape('Text', {
          attrs: labelAttrs
        })
        // 绘制连接线
        let points = void 0
        if (_router.y !== y) {
          // 文本位置做过调整
          points = [
            [_anchor.x, _anchor.y],
            [_router.x, y],
            [lastPoint.x, lastPoint.y]
          ]
        } else {
          points = [
            [_anchor.x, _anchor.y],
            [_router.x, _router.y],
            [lastPoint.x, lastPoint.y]
          ]
        }

        labelGroup.addShape('polyline', {
          attrs: {
            points,
            lineWidth: 1,
            stroke: fill
          }
        })
      }

      function antiCollision(half, isRight) {
        const startY = center.y - r - OFFSET - LINEHEIGHT
        let overlapping = true
        let totalH = canvasHeight
        let i = void 0

        let maxY = 0
        let minY = Number.MIN_VALUE
        const boxes = half.map(function(label) {
          const labelY = label.y
          if (labelY > maxY) {
            maxY = labelY
          }
          if (labelY < minY) {
            minY = labelY
          }
          return {
            size: LINEHEIGHT,
            targets: [labelY - startY]
          }
        })
        if (maxY - startY > totalH) {
          totalH = maxY - startY
        }

        while (overlapping) {
          // eslint-disable-next-line no-loop-func
          boxes.forEach(box => {
            const target =
              (Math.min.apply(minY, box.targets) +
                Math.max.apply(minY, box.targets)) /
              2
            box.pos = Math.min(
              Math.max(minY, target - box.size / 2),
              totalH - box.size
            )
          })

          // detect overlapping and join boxes
          overlapping = false
          i = boxes.length
          while (i--) {
            if (i > 0) {
              const previousBox = boxes[i - 1]
              const box = boxes[i]
              if (previousBox.pos + previousBox.size > box.pos) {
                // overlapping
                previousBox.size += box.size
                previousBox.targets = previousBox.targets.concat(box.targets)

                // overflow, shift up
                if (previousBox.pos + previousBox.size > totalH) {
                  previousBox.pos = totalH - previousBox.size
                }
                boxes.splice(i, 1) // removing box
                overlapping = true
              }
            }
          }
        }

        // step 4: normalize y and adjust x
        i = 0
        boxes.forEach(function(b) {
          let posInCompositeBox = startY // middle of the label
          b.targets.forEach(function() {
            half[i].y = b.pos + posInCompositeBox + LINEHEIGHT / 2
            posInCompositeBox += LINEHEIGHT
            i++
          })
        })

        // (x - cx)^2 + (y - cy)^2 = totalR^2
        half.forEach(function(label) {
          const rPow2 = label.r * label.r
          const dyPow2 = Math.pow(Math.abs(label.y - center.y), 2)
          if (rPow2 < dyPow2) {
            label.x = center.x
          } else {
            const dx = Math.sqrt(rPow2 - dyPow2)
            if (!isRight) {
              // left
              label.x = center.x - dx
            } else {
              // right
              label.x = center.x + dx
            }
          }
          drawLabel(label)
        })
      }
    },
    renderLine1() {
      const data = [
        { date: '2020-07-01', value: 220 },
        { date: '2020-07-02', value: 460 },
        { date: '2020-07-03', value: 480 },
        { date: '2020-07-04', value: 622 },
        { date: '2020-07-05', value: 598 },
        { date: '2020-07-06', value: 682 },
        { date: '2020-07-07', value: 440 }

        // { date: '2020-07-08', value: 440 },
        // { date: '2020-07-09', value: 440 },
        // { date: '2020-07-10', value: 440 },
        // { date: '2020-07-11', value: 440 },
        // { date: '2020-07-12', value: 440 },
        // { date: '2020-07-13', value: 440 },
        // { date: '2020-07-14', value: 440 }
      ]
      const wrapper = this.$refs.lineRef1.$el.querySelector(
        '.card-body-content'
      )
      const chart = new G2.Chart({
        container: 'line1',
        forceFit: true,
        width: wrapper.clientWidth,
        height: wrapper.clientHeight - 24,
        padding: [20, 'auto', 45, 'auto']
      })
      chart.source(data, {
        value: { min: 0 }
      })
      chart
        .area()
        .position('date*value')
        .color('l(90) 0:#15B37F 1:#FFFFFF')
      chart
        .line()
        .position('date*value')
        .color('#15B37F')
        .label('value')
      chart.render()

      this.lineChart1 = chart
    },
    renderLine2() {
      const data = [
        { date: '2020-07-01', value: 220 },
        { date: '2020-07-02', value: 460 },
        { date: '2020-07-03', value: 480 },
        { date: '2020-07-04', value: 622 },
        { date: '2020-07-05', value: 598 },
        { date: '2020-07-06', value: 682 },
        { date: '2020-07-07', value: 440 },
        { date: '2020-07-08', value: 450 },
        { date: '2020-07-09', value: 400 },
        { date: '2020-07-10', value: 540 },
        { date: '2020-07-11', value: 610 },
        { date: '2020-07-12', value: 460 },
        { date: '2020-07-13', value: 520 },
        { date: '2020-07-14', value: 660 },
        { date: '2020-07-15', value: 780 }
      ]
      const wrapper = this.$refs.lineRef2.$el.querySelector(
        '.card-body-content'
      )
      const chart = new G2.Chart({
        container: 'line2',
        forceFit: true,
        width: wrapper.clientWidth,
        height: wrapper.clientHeight - 24,
        padding: [20, 10, 20, 'auto']
      })
      chart.source(data, {
        value: { min: 0 }
      })
      chart
        .area()
        .position('date*value')
        .color('l(90) 0:#0294FF 1:#FFFFFF')
      chart
        .line()
        .position('date*value')
        .color('#0294FF')
        .label('value')
      chart.render()

      this.lineChart2 = chart
    },
    renderBar() {
      if (!(this.data && this.data.bar)) return
      let data = this.data && this.data.bar
      data = data.map(d => ({
        type: d.supplier,
        value: d.count
      }))
      const wrapper = this.$refs.barRef.$el.querySelector('.card-body-content')
      const chart = new G2.Chart({
        container: 'bar',
        forceFit: true,
        width: wrapper.clientWidth,
        height: data.length * 80,
        padding: [20, 20, 'auto', 'auto']
      })
      chart.source(data, {
        // type: {
        //   range: [ 0, 1 ] // type字段与字段间的间距
        // },
        value: {
          min: 0
        }
      })
      chart.axis('type', {
        label: null,
        tickLine: null,
        line: null
      })
      chart.axis('value', {
        label: null,
        tickLine: null,
        line: null
      })
      chart.coord().transpose()
      chart
        .interval()
        .position('type*value')
        .size(20) // 条形大小
        .opacity(1)
        .label('value')

      // 添加辅助文本
      data.forEach(d => {
        chart.guide().text({
          top: true, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
          position: [d.type, 0],
          content: d.type,
          offsetY: -30,
          style: {
            fill: '#333', // 文本颜色
            fontSize: 12, // 文本大小
            fontWeight: 400 // 文本粗细
          }
        })
      })

      chart.render()

      this.barChart = chart
    },
    renderPolygon() {
      if (!(this.data && this.data.polygon)) return
      const { data, x, y } = this.data && this.data.polygon
      const source = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const obj = {}
        obj.name = item[0]
        obj.day = item[1]
        obj.count = item[2]
        source.push(obj)
      }
      const wrapper = this.$refs.polygonRef.$el.querySelector(
        '.card-body-content'
      )
      const chart = new G2.Chart({
        container: 'polygon',
        forceFit: true,
        width: wrapper.clientWidth,
        height: wrapper.clientHeight - 24,
        padding: 'auto'
      })
      chart.source(source, {
        // 定义 name 字段
        name: {
          // type 度量类型 https://g2-v3.antv.vision/zh/docs/api/scale
          // identity，常量类型的数值，也就是说数据的某个字段是不变的常量；
          // linear，连续的数字 [1,2,3,4,5]；
          // cat，分类，['男','女']；
          // time，连续的时间类型；
          // timeCat，非连续的时间，比如股票的时间不包括周末或者未开盘的日期；
          // log，连续非线性的 Log 数据 将 [1,10,100,1000] 转换成 [0,1,2,3]；
          // pow，连续非线性的 pow 数据 将 [2,4,8,16,32] 转换成 [1,2,3,4,5]。
          type: 'cat',
          values: x
        },
        day: {
          type: 'cat',
          values: y
        }
      })
      chart.axis('name', {
        tickLine: null,
        grid: null
      })
      chart.axis('day', {
        title: null,
        grid: null
      })
      chart.legend(false)
      chart
        .polygon()
        .position('name*day')
        .color('count', '#FFCCC7-#FF7875-#F5222D')
        .label('count', {
          offset: -2,
          textStyle: {
            fill: '#fff',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          }
        })
      chart.render()

      this.polygonChart = chart
    }
  }
}
</script>

<style lang="scss" scoped>
$text-color: #262626;
$text-color-secondary: #bfbfbf;
.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  > div:first-child {
    display: flex;
    align-items: center;
    flex: 1;
    > * {
      margin-right: 16px;
    }
    .ant-calendar-picker /deep/ .ant-calendar-picker-input {
      border-radius: 4px;
      border: none;
    }
  }
}
.overview-wrapper,
.dashboard-wrapper,
.polygon-wrapper {
  margin-bottom: 16px;
  .ant-row {
    margin-bottom: 16px;
  }
  .card-body-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $text-color;
      font-weight: 600;
    }
    .chart-wrapper {
      height: calc(100% - 24px);
      .ant-spin {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.overview-wrapper {
  margin-bottom: 16px;
  .ant-card {
    height: 160px;
    overflow: hidden;
  }
  .progress-wrapper {
    display: flex;
    align-items: center;
    > div:last-child {
      > p:first-child {
        font-size: 32px;
        font-weight: 600;
        color: $text-color;
      }
      > p:last-child {
        font-size: 12px;
        color: $text-color-secondary;
      }
    }
  }
  .ant-progress {
    margin-right: 24px;
    .ant-progress-description {
      > p:first-child {
        font-size: 12px;
        color: $text-color;
        margin-bottom: 6px;
        > span {
          font-size: 16px;
          font-weight: 600;
        }
      }
      > p:last-child {
        font-size: 12px;
        color: $text-color-secondary;
      }
    }
  }
}
.dashboard-wrapper {
  margin-bottom: 0;
  .ant-card {
    height: 337px;
    overflow: hidden;
  }
  .total-card {
    height: 142px;
    overflow: hidden;
    .card-body-content {
      > div:first-child {
        > p:first-child {
          color: $text-color-secondary;
          font-size: 12px;
        }
        > p:last-child {
          color: $text-color;
          font-size: 32px;
          font-weight: 600;
        }
      }
      .footer {
        color: $text-color-secondary;
      }
    }
  }
  .bar-card {
    height: 532px;
    overflow: hidden;
    .title {
      padding: 16px 16px 0 16px;
    }
    .chart-wrapper {
      padding: 0 16px 16px 16px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
.polygon-wrapper {
  .polygon-card {
    height: 542px;
    overflow: hidden;
  }
}
</style>
