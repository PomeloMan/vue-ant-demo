<template>
  <div>
    <a-drawer
      :title="$t('common.new_project')"
      :visible="visible"
      :width="640"
      :bodyStyle="{
        overflow: 'auto',
        height: 'calc(100% - 108px)'
      }"
      @close="visible = false"
    >
      <!-- <a-form :form="form" layout="vertical" hideRequiredMark> -->
      <a-form :form="form" layout="vertical">
        <a-form-item :label="$t('project.name')">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: $t('message.please_input', {
                      content: $t('project.name')
                    })
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('project.description')">
          <a-textarea
            :autosize="{ minRows: 3 }"
            v-decorator="['description']"
          ></a-textarea>
        </a-form-item>
      </a-form>
      <footer class="drawer-footer">
        <a-button :style="{ marginRight: '8px' }" @click="visible = false">
          {{ $t('common.cancel') }}
        </a-button>
        <a-button
          type="primary"
          :disabled="!form.getFieldValue('name')"
          @click="submitForm"
        >
          {{ $t('common.submit') }}
        </a-button>
      </footer>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    submitForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          // this.$http.post(this.$api)
          this.visible = false
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