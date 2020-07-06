<template>
  <div>
    <a-drawer
      :title="$t('common.new_menu')"
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
        <!-- 菜单名 -->
        <a-form-item :label="$t('common.menu_name')">
          <a-input
            v-decorator="[
              'displayName', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('common.menu_name') }) }
                ]
              }
            ]"
          />
        </a-form-item>
        <!-- 父级菜单 -->
        <a-form-item :label="$t('common.menu_parent')">
          <a-tree-select
            v-decorator="['parentName']"
            :treeData="menuTreeData"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          ></a-tree-select>
        </a-form-item>
        <!-- 链接地址 -->
        <a-form-item :label="$t('common.url')">
          <a-input v-decorator="[ 'url' ]" />
        </a-form-item>
        <!-- 图标名称 -->
        <a-form-item :label="$t('common.menu_icon')">
          <a-input v-decorator="['icon']" />
        </a-form-item>
        <!-- 图标层级 -->
        <a-form-item :label="$t('common.level')">
          <a-input
            type="number"
            v-decorator="[
              'level', {
                rules: [
                  { required: true, validator: checkNumber },
                ]
              }
            ]"
          />
        </a-form-item>
        <!-- 权重 -->
        <a-form-item :label="$t('common.weights')">
          <a-input
            type="number"
            v-decorator="[
              'sequence', {
                rules: [
                  { required: true, validator: checkNumber },
                ]
              }
            ]"
          />
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
export default {
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      menuTreeData: []
    }
  },
  watch: {
    menus() {
      if (this.menus) {
        // 将菜单集合转成树形结构数据，且使用 a-tree-select 数据结构
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
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    submitForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$http
            .post(this.$api.SYS_MENU, values)
            .then(() => {
              this.visible = false
              this.$message.success(this.$t('message.save_success'))
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
          this.$t('message.must_be_positive_integer', {
            name: this.$t('common.weights')
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
</style>