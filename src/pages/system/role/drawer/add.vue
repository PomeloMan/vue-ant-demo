<template>
  <div>
    <a-drawer
      :title="isnew ? $t('common.new_role') : $t('common.edit_role')"
      :visible="visible"
      :width="640"
      :bodyStyle="{
        overflow: 'auto',
        height: 'calc(100% - 108px)'
      }"
      @close="visible = false"
    >
      <a-form :form="form" layout="vertical">
        <!-- 字典码 -->
        <a-form-item :label="$t('common.dict_code')">
          <a-input
            v-decorator="[
              'name', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('common.dict_code') }) }
                ]
              }
            ]"
          />
        </a-form-item>
        <!-- 角色名 -->
        <a-form-item :label="$t('common.role_name')">
          <a-input
            v-decorator="[
              'displayName', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('common.role_name') }) }
                ]
              }
            ]"
          />
        </a-form-item>
        <!-- 角色权限 -->
        <a-form-item :label="$t('common.role_auth')">
          <a-tree-select
            treeCheckable
            v-decorator="[
              'authorities', {
              rules: [
                { required: true, message: $t('message.please_select', { content: $t('common.role_auth') }) }
              ]
            }]"
            :treeData="menuTreeData"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :showCheckedStrategy="showCheckedStrategy"
            :treeDefaultExpandAll="true"
          ></a-tree-select>
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
import { extractFields, buildTree } from '@/utils'
import { TreeSelect } from 'ant-design-vue'
export default {
  data() {
    return {
      isnew: true,
      visible: false,
      showCheckedStrategy: TreeSelect.SHOW_ALL, // TreeSelect.SHOW_PARENT
      menus: [], // 接口返回数据
      menuTreeData: [] // ant-tree 树形结构数据
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.initAuthData()
  },
  methods: {
    initAuthData() {
      this.$http
        .post(this.$api.SYS_MENU_LIST)
        .then(({ data }) => {
          this.menus = data.map(item => ({ ...item }))
          const list = extractFields(this.menus, {
            alias: {
              title: 'displayName',
              value: 'name',
              key: 'name',
              parent: 'parentName'
            }
          })
          this.menuTreeData = buildTree(list, {
            key: 'key',
            parentKey: 'parent'
          })
          console.log(this.menuTreeData)
        })
        .catch(err => {
          console.error(err)
          this.$message.error(err.message)
        })
    },
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
            url: this.$api.SYS_ROLE,
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
    checkNumber(rule, value, callback) {
      if (!/(^[1-9]\d*$)/.test(value)) {
        callback(
          this.$i18n.t('message.must_be_positive_integer', {
            name: this.$i18n.t('common.weights')
          })
        )
        return
      }
      callback()
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