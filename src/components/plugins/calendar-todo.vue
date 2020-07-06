<template>
  <div class="calendar-todo">
    <a-calendar @select="onSelect">
      <ul slot="dateCellRender" slot-scope="value" class="events">
        <li v-for="item in getDayEvent(value)" :key="item.title" :title="item.title">
          <a-badge :status="item.type" :text="item.title" />
        </li>
      </ul>
    </a-calendar>

    <!-- 具体日期待办列表 -->
    <a-drawer
      placement="right"
      :title="selectedValue | date('YYYY-MM-DD')"
      :visible="drawerVisible"
      :get-container="false"
      :width="'66%'"
      :bodyStyle="{
        overflow: 'auto',
        height: 'calc(100% - 108px)'
      }"
      :wrap-style="{ position: 'absolute' }"
      @close="onClose"
    >
      <a-list :data-source="selectedEvents">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta :description="`${item.content}`">
            <span slot="title">{{ `${(index + 1)}. ${item.title}` }}</span>
          </a-list-item-meta>
          <a slot="actions" @click="showEventModal(item)">{{$t('common.edit')}}</a>
          <a slot="actions">{{$t('common.delete')}}</a>
        </a-list-item>
      </a-list>
      <footer class="drawer-footer">
        <a-button
          :style="{ marginRight: '8px' }"
          @click="drawerVisible = false"
        >{{ $t('common.cancel') }}</a-button>
        <a-button type="primary" @click="showEventModal()">{{ $t('common.add') }}</a-button>
      </footer>
    </a-drawer>

    <!-- 新增/编辑待办事件模态框 -->
    <a-modal
      :visible="modalVisible"
      :title="(selectedEvent.id? $t('common.edit'): $t('common.add')) + $t('common.todo')"
      @cancel="modalVisible = false"
      @ok="saveEvent"
    >
      <a-form-model
        ref="form"
        :model="selectedEvent"
        :rules="formRules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
      >
        <!-- 标题 -->
        <a-form-model-item
          ref="title"
          :label="$t('personal.todo.title')"
          :extra="$t('personal.todo.title_extra', { current: selectedEvent.title? selectedEvent.title.length: 0, total: limit.title })"
          prop="title"
        >
          <a-input :maxLength="limit.title" v-model="selectedEvent.title" />
        </a-form-model-item>
        <!-- 开始 -->
        <a-form-model-item
          ref="startDateTime"
          :label="$t('personal.todo.start_date')"
          prop="startDateTime"
          class="date-time-field"
        >
          <!-- 开始日期 -->
          <a-col :span="12">
            <a-form-model-item
              ref="startDate"
              prop="startDate"
              style="margin-right: 12px;"
              class="date-field"
            >
              <a-date-picker
                v-model="selectedEvent.startDate"
                :disabled-date="disabledStartDate"
                format="YYYY-MM-DD"
                @change="dateChange"
              />
            </a-form-model-item>
          </a-col>
          <!-- 开始时间 -->
          <a-col :span="12">
            <a-form-model-item ref="startTime" prop="startTime" class="time-field">
              <a-time-picker
                v-model="selectedEvent.startTime"
                :disabledHours="disabledStartHours"
                :disabledMinutes="disabledStartMinutes"
                format="HH:mm"
                @change="dateChange"
              />
            </a-form-model-item>
          </a-col>
        </a-form-model-item>
        <!-- 结束 -->
        <a-form-model-item
          ref="endDateTime"
          :label="$t('personal.todo.end_date')"
          prop="endDateTime"
          class="date-time-field"
        >
          <!-- 结束日期 -->
          <a-col :span="12">
            <a-form-model-item
              ref="endDate"
              prop="endDate"
              style="margin-right: 12px;"
              class="date-field"
            >
              <a-date-picker
                v-model="selectedEvent.endDate"
                :disabled-date="disabledEndDate"
                format="YYYY-MM-DD"
                @change="dateChange"
              />
            </a-form-model-item>
          </a-col>
          <!-- 结束时间 -->
          <a-col :span="12">
            <a-form-model-item ref="endTime" prop="endTime" class="time-field">
              <a-time-picker
                v-model="selectedEvent.endTime"
                :disabledHours="disabledEndHours"
                :disabledMinutes="disabledEndMinutes"
                format="HH:mm"
                @change="dateChange"
              />
            </a-form-model-item>
          </a-col>
        </a-form-model-item>
        <!-- 内容 -->
        <a-form-model-item
          ref="content"
          :label="$t('personal.todo.content')"
          :extra="$t('personal.todo.content_extra', { current: selectedEvent.content? selectedEvent.content.length: 0, total: limit.content })"
          prop="content"
        >
          <a-textarea
            allow-clear
            :maxLength="limit.content"
            v-model="selectedEvent.content"
            :autoSize="{ minRows: 4, maxRows: 6 }"
          ></a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getDateBetween } from '@/utils'
export default {
  props: {
    /**
     * 当前月份所有事件数据，e.g.
     * {
     *  1: [
     *    { type: 'warning', content: 'This is warning event.' },
     *    { type: 'success', content: 'This is usual event.' }
     *  ]
     * }
     */
    dayEvents: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      drawerVisible: false,
      modalVisible: false,
      selectedValue: undefined,
      selectedEvents: [],
      selectedEvent: {},
      limit: {
        title: 50,
        content: 200
      }
    }
  },
  computed: {
    formRules: {
      get() {
        return {
          title: [
            { required: true, message: this.$t('message.field_required') }
          ],
          startDateTime: [{ validator: this.dateTimeValidator }],
          endDateTime: [{ validator: this.dateTimeValidator }],
          startDate: [
            { required: true, message: this.$t('message.field_required') }
          ],
          startTime: [
            { required: true, message: this.$t('message.field_required') }
          ],
          endDate: [
            { required: true, message: this.$t('message.field_required') }
          ],
          endTime: [
            { required: true, message: this.$t('message.field_required') }
          ]
        }
      }
    }
  },
  methods: {
    onSelect(value) {
      this.selectedValue = value
      this.selectedEvents = this.getDayEvent(value)
      this.drawerVisible = true
    },
    onClose() {
      this.drawerVisible = false
    },
    // 获取日期事件列表
    getDayEvent(value) {
      if (value) {
        const events = this.dayEvents[value.format('YYYYMMDD')] || []
        if (events) {
          events.forEach(event => {
            event.startDate = event.startTime = event.startDateTime
            event.endDate = event.endTime = event.endDateTime
          })
        }
        return events
      }
      return []
    },
    showEventModal(event) {
      this.modalVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        event.startDate = event.startTime = this.$moment(event.startDateTime)
        event.endDate = event.endTime = this.$moment(event.endDateTime)
        this.selectedEvent = { ...event } || {}
      })
    },
    // 保存事件
    saveEvent() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.selectedEvent.id) {
            // 修改/更新
          } else {
            // 新增
          }
          this.$http({
            method: 'get',
            url: this.$api.OPERACTION_SUCCESS,
            data: {}
          })
            .then(() => {
              this.modalVisible = false

              // 如果是新增可以直接添加进数组，不重新调用接口刷新；
              // 如果是修改，考虑到跨时间的待办/事件，最简单的方法是重新调接口刷新数据，也可以重新遍历原数据更新数据
              if (!this.selectedEvent.id) {
                this.selectedEvents.push(this.selectedEvent)
                // const dates = getDateBetween(
                //   this.selectedEvent.startDate,
                //   this.selectedEvent.endDate
                // )
                // this.$emit('refresh', {
                //   dates: [...dates],
                //   event: { ...this.selectedEvent }
                // })
              } else {
                // this.$emit('refresh', {
                //   reload: true
                // })
                // 更新原数组对象
                const index = this.selectedEvents.findIndex(
                  e => e.id === this.selectedEvent.id
                )
                if (index > -1) {
                  this.selectedEvents[index] = { ...this.selectedEvent }
                }
                this.selectedEvents = [...this.selectedEvents]
              }
              const dates = getDateBetween(
                this.selectedEvent.startDate,
                this.selectedEvent.endDate
              )
              this.$emit('refresh', {
                dates: [...dates],
                event: { ...this.selectedEvent }
              })
            })
            .catch(() => {
              this.modalVisible = false
            })
        } else {
          return false
        }
      })
    },

    /******************** 时间校验 ********************/
    // 开始/结束日期不可选判断（开始日期不能超过结束日期，结束日期不能早于开始日期）
    disabledStartDate(startValue) {
      const endValue = this.selectedEvent.endDate
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.selectedEvent.startDate
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    // 开始/结束时间不可选判断（如果日期相同，开始时间不能超过结束时间，结束时间不能早于开始时间）
    disabledStartHours() {
      if (
        this.selectedEvent.startDate &&
        this.selectedEvent.endDate &&
        this.selectedEvent.startDate.format('YYYYMMDD') ===
          this.selectedEvent.endDate.format('YYYYMMDD')
      ) {
        // 日期相同
        const disabledHours = []
        if (this.selectedEvent.endTime) {
          for (let h = this.selectedEvent.endTime.hours() + 1; h < 24; h++) {
            disabledHours.push(h)
          }
        }
        return disabledHours
      } else {
        return []
      }
    },
    disabledEndHours() {
      if (
        this.selectedEvent.startDate &&
        this.selectedEvent.endDate &&
        this.selectedEvent.startDate.format('YYYYMMDD') ===
          this.selectedEvent.endDate.format('YYYYMMDD')
      ) {
        // 日期相同
        const disabledHours = []
        if (this.selectedEvent.startTime) {
          for (let h = 0; h < this.selectedEvent.startTime.hours(); h++) {
            disabledHours.push(h)
          }
        }
        return disabledHours
      } else {
        return []
      }
    },
    disabledStartMinutes(selectedHour) {
      if (
        this.selectedEvent.startDate &&
        this.selectedEvent.endDate &&
        this.selectedEvent.startDate.format('YYYYMMDD') ===
          this.selectedEvent.endDate.format('YYYYMMDD')
      ) {
        // 日期相同
        const disabledMinutes = []
        if (
          this.selectedEvent.endTime &&
          selectedHour === this.selectedEvent.endTime.hours()
        ) {
          // 小时相同
          for (let m = this.selectedEvent.endTime.minutes() + 1; m < 60; m++) {
            disabledMinutes.push(m)
          }
        }
        return disabledMinutes
      } else {
        return []
      }
    },
    disabledEndMinutes(selectedHour) {
      if (
        this.selectedEvent.startDate &&
        this.selectedEvent.endDate &&
        this.selectedEvent.startDate.format('YYYYMMDD') ===
          this.selectedEvent.endDate.format('YYYYMMDD')
      ) {
        // 日期相同
        const disabledMinutes = []
        if (
          this.selectedEvent.startTime &&
          selectedHour === this.selectedEvent.startTime.hours()
        ) {
          // 小时相同
          for (let m = 0; m < this.selectedEvent.startTime.minutes(); m++) {
            disabledMinutes.push(m)
          }
        }
        return disabledMinutes
      } else {
        return []
      }
    },
    dateTimeValidator(rule, value, callback) {
      if (
        this.selectedEvent.startDate &&
        this.selectedEvent.startTime &&
        this.selectedEvent.endDate &&
        this.selectedEvent.endTime
      ) {
        const startDateTime =
          this.selectedEvent.startDate.format('YYYYMMDD') +
          this.selectedEvent.startTime.format('HHmm')
        const endDateTime =
          this.selectedEvent.endDate.format('YYYYMMDD') +
          this.selectedEvent.endTime.format('HHmm')
        if (startDateTime > endDateTime) {
          this.selectedEvent.startDateTime = undefined
          this.selectedEvent.endDateTime = undefined
          callback(
            this.$t('message.a_must_less_than_b', {
              a: this.$t('personal.todo.start_date'),
              b: this.$t('personal.todo.end_date')
            })
          )
        } else {
          this.selectedEvent.startDateTime = this.$moment(
            startDateTime,
            'YYYYMMDDHHmmss'
          )
          this.selectedEvent.endDateTime = this.$moment(
            endDateTime,
            'YYYYMMDDHHmmss'
          )
        }
      }
      callback()
    },
    dateChange() {
      this.$refs.form.validateField('startDateTime')
      this.$refs.form.validateField('endDateTime')
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-todo {
  display: flex;
  .detail-wrap {
    width: 200px;
    background: white;
  }
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
    .ant-badge-status {
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      text-overflow: ellipsis;
      font-size: 12px;
    }
    .ant-badge {
      cursor: pointer;
      &:hover /deep/ .ant-badge-status-text {
        color: #1890ff;
      }
    }
  }
}

// 设置开始时间和结束时间的错误样式
.date-time-field {
  margin-bottom: 0;
  :not(.date-field),
  :not(.time-field) {
    /deep/ .has-error .ant-form-explain {
      position: absolute;
      bottom: 0;
    }
  }
  .date-field,
  .time-field {
    /deep/ .has-error .ant-form-explain {
      position: initial;
      bottom: initial;
    }
  }
}
</style>