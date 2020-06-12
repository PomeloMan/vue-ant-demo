<template>
  <div>
    <app-header :breadcrumbs="breadcrumbs"></app-header>
    <div class="steps-wrapper no-footer">
      <div class="content-wrapper">
        <a-steps v-model="current" type="navigation" size="small" :style="stepStyle">
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
          <base-step ref="baseStep" v-if="current === 0" v-model="data"></base-step>
          <qualification-step ref="qualificationStep" v-else-if="current === 1" v-model="data"></qualification-step>
          <shopkeeper-step ref="shopkeeperStep" v-else-if="current === 2" v-model="data"></shopkeeper-step>
          <wait-for-approval-step v-else-if="current === 3"></wait-for-approval-step>
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
            @click="$router.push('/main/e-commerce/shop')"
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
import QualificationStep from './steps/info-qualification'
import ShopkeeperStep from './steps/info-shopkeeper'
import WaitForApprovalStep from './steps/wait-for-approval'
export default {
  mixins: [BaseInfo, PerfectScrollbar, Steps],
  components: {
    BaseStep,
    QualificationStep,
    ShopkeeperStep,
    WaitForApprovalStep
  },
  data() {
    return {
      current: 0,
      refs: { 0: 'baseStep', 1: 'qualificationStep', 2: 'shopkeeperStep' },
      stepStyle: {
        paddingLeft: '20%',
        paddingRight: '20%',
        marginBottom: '16px',
        boxShadow: '0px -1px 0 0 #e8e8e8 inset'
      },
      data: {}
    }
  },
  created() {},
  mounted() {},
  methods: {
    next() {
      this.$refs[this.refs[this.current]].next().then(() => {
        console.log(this.data)
        this.current++
        if (this.current === this.steps.length) {
          this.save()
        }
      })
    },
    prev() {
      this.current--
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