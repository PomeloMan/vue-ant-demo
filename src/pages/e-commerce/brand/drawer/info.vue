<template>
  <div>
    <a-drawer
      :title="(isnew ? $t('common.new') : $t('common.edit')) + $t('ecommerce.brand._')"
      :visible="visible"
      :width="640"
      :bodyStyle="{
        overflow: 'auto',
        height: 'calc(100% - 108px)'
      }"
      @close="visible = false"
    >
      <a-form :form="form" layout="vertical">
        <!-- 品牌LOGO -->
        <a-form-item :label="$t('ecommerce.brand.logo')">
          <image-upload :multiple="false"></image-upload>
        </a-form-item>
        <!-- 品牌名称 -->
        <a-form-item :label="$t('ecommerce.brand.name')">
          <a-input
            v-decorator="[
              'name', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('ecommerce.brand.name') }) }
                ]
              }
            ]"
          />
        </a-form-item>
        <!-- 权重 -->
        <a-form-item :label="$t('common.weights')">
          <a-input-number
            v-decorator="[
              'sequence', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('common.weights') }) }
                ]
              }
            ]"
          ></a-input-number>
        </a-form-item>
      </a-form>
      <footer class="drawer-footer">
        <a-button :style="{ marginRight: '8px' }" @click="visible = false">{{ $t('common.cancel') }}</a-button>
        <a-button
          type="primary"
          :disabled="!form.getFieldValue('name')"
          @click="submitForm"
        >{{ $t('common.submit') }}</a-button>
      </footer>
    </a-drawer>
  </div>
</template>

<script>
import ImageUpload from '@/components/plugins/image-upload'
export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      isnew: true,
      visible: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {},
  methods: {
    submitForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let method = 'post' // 新建
          if (!this.isnew) {
            // 修改
            method = 'put'
          }
          this.$http({
            method: method,
            url: this.$api.OPERACTION_SUCCESS,
            data: values
          })
            .then(() => {
              this.visible = false
              this.$message.success(this.$t('message.save_success'))
              this.$emit('refresh')
            })
            .catch(() => {
              this.visible = false
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-form {
  .ant-form-item {
    margin-bottom: 16px;
  }
}
.drawer-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
}
</style>