<template>
  <div>
    <app-header type="bordered" :breadcrumbs="$route.meta.breadcrumbs || []"></app-header>
    <div class="scroll-wrapper no-footer" style="padding: 0;">
      <a-spin :spinning="loadingData" wrapperClassName="grid-spin">
        <div id="scrollContainer" style="padding: 16px 16px 24px;">
          <div style="min-height: calc(100% + 1px);">
            <section class="overview-section">
              <draggable
                class="draggable-overview"
                v-model="rows"
                @start="dragging = true"
                @end="dragging = false"
              >
                <transition-group>
                  <a-row :gutter="24" :key="row.index" v-for="row in rows">
                    <draggable
                      :list="row.items"
                      v-bind="dragOptions"
                      :group="{ name: 'row' }"
                      @start="dragging = true"
                      @end="dragging = false"
                    >
                      <a-col :span="6" v-for="item in row.items" :key="item.title">
                        <a-card
                          class="overview-item"
                          :bodyStyle="{
                        'color': 'white',
                        'background-color': item.color[0],
                        'background-image': `linear-gradient(${item.color[0]}, ${item.color[1]})`
                      }"
                        >
                          <div>
                            <h2>{{ item.count }}</h2>
                            <p>{{ $t(`${item.title}`) }}</p>
                          </div>
                          <a-icon :type="item.icon" :style="{'color': item.color[2]}"></a-icon>
                        </a-card>
                      </a-col>
                    </draggable>
                  </a-row>
                </transition-group>
              </draggable>
            </section>

            <section class="calendar-section">
              <a-row>
                <a-col :span="12">
                  <a-card :bodyStyle="{ padding: 0 }">
                    <calendar-todo
                      v-model="now"
                      :dayEvents="monthEvents"
                      @refresh="refreshMonthEvents"
                    ></calendar-todo>
                  </a-card>
                </a-col>
                <a-col :span="12"></a-col>
              </a-row>
            </section>
            <a-back-top :target="scrollWrapper" :visibilityHeight="100"></a-back-top>
          </div>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import PerfectScrollbar from '@/components/mixins/perfect-scrollbar'
import CalendarTodo from '@/components/plugins/calendar-todo'
export default {
  mixins: [PerfectScrollbar],
  components: {
    Draggable,
    CalendarTodo
  },
  data() {
    return {
      now: this.$moment(),
      rows: [],
      overview: [],
      dragging: false,
      loadingData: false, // 加载列表
      monthEvents: {}
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'overview',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  created() {
    this.getOverview()
    this.getMonthEvents()
  },
  methods: {
    getOverview() {
      this.getOverviewMockData()
    },
    getMonthEvents() {
      const month = this.now.format('MM')
      this.getMonthEventsMockData(month)
    },
    refreshMonthEvents({ reload, dates, event }) {
      console.log(dates, event)
      if (reload) {
        this.getMonthEvents()
      } else {
        // 不重新请求手动回填数据
        // 更新现有集合中的数据
        let _dates = [...dates]
        Object.keys(this.monthEvents).forEach(date => {
          if (_dates.includes(date)) {
            // 包含事件则跟新，不包含则添加
            let dayEvents = this.monthEvents[date]
            if (event.id) {
              const index = dayEvents.findIndex(e => e.id === event.id)
              if (index > -1) {
                dayEvents[index] = event
              }
            } else {
              dayEvents.push(event)
            }
            dayEvents = [...dayEvents]
            // 删除已经处理的日期
            _dates = _dates.filter(d => d != date)
          }
        })
        // 添加现有集合中不存在的数据
        _dates.forEach(d => {
          this.monthEvents[d] = [{ ...event }]
        })
        this.monthEvents = { ...this.monthEvents }
      }
    },
    //
    getOverviewMockData() {
      this.$http.get(this.$api.PERSONAL_OVERVIEW).then(({ data }) => {
        this.rows = data
      })
    },
    getMonthEventsMockData(month) {
      this.$http
        .get(this.$api.PERSONAL_MONTH_EVENTS(month))
        .then(({ data }) => {
          this.monthEvents = data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
// 总览(待办，已完成，已拒绝，待定)
.draggable-overview {
  .ant-row:not(:last-child) {
    margin-bottom: 12px;
  }
  .overview-item /deep/ .ant-card-body {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      color: white;
    }
    > div {
      flex: 1;
    }
    &:hover .anticon {
      font-size: 56px;
    }
    .anticon {
      font-size: 48px;
      transition: 600ms;
      cursor: pointer;
    }
  }
  .ant-card {
    cursor: move;
  }
}
.ghost > .ant-card {
  opacity: 0.6;
  background: white;
}
</style>