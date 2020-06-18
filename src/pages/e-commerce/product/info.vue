<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs"></app-header>
    <div class="steps-wrapper no-footer">
      <div class="content-wrapper">
        <a-steps
          v-model="current"
          type="navigation"
          size="small"
          :style="stepStyle"
          @change="handleStepChange"
        >
          <a-step
            v-for="item in steps"
            :status="item.status"
            :key="item.title"
            :title="item.title"
            :description="item.subtitle"
            :disabled="!data.status && item.index === 3"
          />
        </a-steps>
        <div id="scrollContainer" class="steps-content">
          <base-step ref="baseStep" v-show="current === 0" v-model="data"></base-step>
          <standard-step ref="standardStep" v-show="current === 1" v-model="data"></standard-step>
          <detail-step ref="detailStep" v-show="current === 2" v-model="data"></detail-step>
          <wait-for-approval-step v-show="current === 3"></wait-for-approval-step>
          <a-back-top :target="scrollWrapper" :visibilityHeight="100"></a-back-top>
        </div>
        <div class="steps-action">
          <a-button v-if="current > 0 && current <= 2" @click="prev">{{$t('common.previous_step')}}</a-button>
          <a-divider type="vertical"></a-divider>
          <a-button v-if="current < 2" type="primary" @click="next">{{$t('common.next_step')}}</a-button>
          <a-button v-if="current == 2" type="primary" @click="next">{{$t('common.complete')}}</a-button>
          <a-button
            v-if="current == 3"
            type="primary"
            @click="$router.push('/main/e-commerce/product')"
          >{{$t('common.back')}}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInfo from '@/components/mixins/base-info'
import PerfectScrollbar from '@/components/mixins/perfect-scrollbar'
import Steps from './mixins/steps'
import BaseStep from './steps/info-base'
import StandardStep from './steps/info-standard'
import DetailStep from './steps/info-detail'
import WaitForApprovalStep from './steps/wait-for-approval'
import GlobalData from '../index'
export default {
  mixins: [BaseInfo, PerfectScrollbar, Steps, GlobalData],
  components: {
    BaseStep,
    StandardStep,
    DetailStep,
    WaitForApprovalStep
  },
  data() {
    return {
      current: 0, // 当前有效 tab 索引
      last: 0, // 前一次有效 tab 索引
      refs: { 0: 'baseStep', 1: 'standardStep', 2: 'detailStep' },
      stepStyle: {
        paddingLeft: '20%',
        paddingRight: '20%',
        marginBottom: '16px',
        boxShadow: '0px -1px 0 0 #e8e8e8 inset'
      },
      data: {}
    }
  },
  created() {
    if (this.id !== '0') {
      this.getData()
    }
  },
  mounted() {},
  methods: {
    // 获取商品详情
    getData() {
      this.$http
        .get(this.$api.ECOMMERCE_PRODUCT_INFO(this.id))
        .then(({ data }) => {
          this.data = data
        })
    },
    // 点击Step导航栏切换事件
    handleStepChange(activeKey) {
      this.current = this.last
      if (activeKey > this.current) {
        this.next().then(() => {
          this.last = this.current = activeKey
        })
      } else if (activeKey < this.current) {
        this.prev().then(() => {
          this.last = this.current = activeKey
        })
      }
    },
    next() {
      return this.$refs[this.refs[this.current]].next().then(() => {
        console.log(this.data)
        this.current++
        this.scrollContainer.scrollTop = 0
        if (this.current === 3) {
          this.save()
        }
      })
    },
    prev() {
      return this.$refs[this.refs[this.current]].prev().then(() => {
        console.log(this.data)
        this.current--
        this.scrollContainer.scrollTop = 0
      })
    },
    save() {
      this.$message.success('提交成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
}
.steps-content {
  height: 100%;
}
.steps-action {
  height: 56px;
  line-height: 56px;
  text-align: center;
  .ant-divider {
    background-color: transparent;
  }
  > div:first-child.ant-divider,
  > div:last-child.ant-divider {
    display: none;
  }
}
</style>