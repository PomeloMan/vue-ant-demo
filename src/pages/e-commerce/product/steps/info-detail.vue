<template>
  <div>
    <a-form :form="form" layout="vertical">
      <!-- 商品详情 -->
      <a-form-item>
        <tinymce-editor v-model="data.details"></tinymce-editor>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import TinymceEditor from '@/components/plugins/tinymce-editor'
export default {
  components: { TinymceEditor },
  model: {
    prop: 'data',
    event: 'dataChange'
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      refName: 'detailStep'
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {},
  mounted() {},
  methods: {
    // 下一步，保留更改数据，需校验数据
    next() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('dataChange', { ...this.data, ...values })
            resolve(values)
          } else {
            reject(err)
          }
        })
      })
    },
    // 上一步，保留更改数据，无需校验数据
    prev() {
      return new Promise(resolve => {
        const values = this.form.getFieldsValue()
        this.$emit('dataChange', { ...this.data, ...values })
        resolve(values)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-form {
  width: 80%;
  margin: auto;
}
</style>