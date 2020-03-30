<template>
  <div>
    <a-drawer
      :title="isnew ? $t('common.new_user') : $t('common.edit_user')"
      :visible="visible"
      :width="640"
      :bodyStyle="{
        overflow: 'auto',
        height: 'calc(100% - 108px)'
      }"
      @close="visible = false"
    >
      <a-spin :spinning="loading">
        <a-form :form="form" layout="vertical">
          <!-- 账号 -->
          <a-form-item :label="$t('common.account')">
            <a-input
              v-decorator="[
              'username', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('common.account') }) }
                ]
              }
            ]"
            />
          </a-form-item>
          <!-- 昵称 -->
          <a-form-item :label="$t('common.nick_name')">
            <a-input
              v-decorator="[
              'displayName', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('common.nick_name') }) }
                ]
              }
            ]"
            />
          </a-form-item>
          <!-- 昵称 -->
          <a-form-item :label="$t('common.email')">
            <a-input
              v-decorator="[
              'email', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('common.email') }) }
                ]
              }
            ]"
            />
          </a-form-item>
          <!-- 角色 -->
          <a-form-item :label="$t('common.role')">
            <a-select
              mode="multiple"
              v-decorator="[
            'roles', {
              rules: [
                { required: true, message: $t('message.please_select', { content: $t('common.role') }) }
              ]
            }
          ]"
            >
              <a-select-option v-for="item in roles" :key="item.name">{{item.displayName}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-spin>
      <footer class="drawer-footer">
        <a-button :style="{ marginRight: '8px' }" @click="visible = false">{{ $t('common.cancel') }}</a-button>
        <a-button
          type="primary"
          :disabled="!form.getFieldValue('username') || loading"
          @click="submitForm"
        >{{ $t('common.submit') }}</a-button>
      </footer>
    </a-drawer>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      isnew: true,
      visible: false,
      loading: false,
      roles: [] // 接口返回数据
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.initRoleData()
  },
  methods: {
    initRoleData() {
      this.$http
        .post(this.$api.SYS_ROLE_LIST)
        .then(({ data }) => {
          this.roles = data.map(item => ({ ...item }))
          console.log(this.roles)
        })
        .catch(err => {
          console.error(err)
          this.$message.error(err.message)
        })
    },
    submitForm: _.debounce(
      function() {
        this.form.validateFields((err, values) => {
          if (!err) {
            let method = 'post' // 新建
            if (!this.isnew) {
              // 修改
              method = 'put'
            }
            this.$http({
              method: method,
              url: this.$api.SYS_USER,
              data: values
            })
              .then(() => {
                this.visible = false
                this.$message.success(this.$i18n.t('message.save_success'))
                this.$emit('refresh')
              })
              .catch(err => {
                this.visible = false
                this.$message.error(err.message)
              })
          }
        })
      },
      1000,
      { leading: true, trailing: false } // leading 延迟前执行，trailing 延迟后执行
    )
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