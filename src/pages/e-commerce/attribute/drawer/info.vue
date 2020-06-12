<template>
  <div>
    <a-drawer
      :title="(isnew ? $t('common.new') : $t('common.edit')) + $t('ecommerce.attribute._')"
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
          <!-- 属性名称 -->
          <a-form-item
            :label="$t('ecommerce.attribute.name')"
            :extra="$t('ecommerce.attribute.name_extra', {
              current: form.getFieldValue('name')? form.getFieldValue('name').length: 0,
              limit: 20
            })"
          >
            <a-input
              :maxLength="20"
              :placeholder="$t('message.please_input', { content:$t('ecommerce.attribute.name') })"
              v-decorator="['name', {
                initialValue: attribute.name,
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('ecommerce.attribute.name') }) }
                ]
              }
            ]"
            />
          </a-form-item>
          <!-- 所属规格标准 -->
          <a-form-item
            :label="$t('ecommerce.attribute.standard')"
            :extra="$t('ecommerce.attribute.standard_extra')"
          >
            <a-select
              disabled
              v-decorator="['entryMethod', {
                initialValue: attribute.standardId
              }]"
            >
              <a-select-option
                :key="item.id"
                :value="item.id"
                v-for="item in ecStandards"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <!-- 属性录入方式 -->
          <a-form-item
            :label="$t('ecommerce.attribute.entry_method')"
            :extra="$t('ecommerce.attribute.entry_method_extra')"
          >
            <a-radio-group
              v-decorator="['entryMethod', {
                initialValue: attribute.entryMethod || 0,
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('ecommerce.attribute.name') }) }
                ]
              }]"
            >
              <a-radio :value="0">{{$t('ecommerce.attribute.entry_method_value0')}}</a-radio>
              <a-radio :value="1">{{$t('ecommerce.attribute.entry_method_value1')}}</a-radio>
            </a-radio-group>
          </a-form-item>
          <!-- 属性预设值 -->
          <a-form-item
            :label="$t('ecommerce.attribute.default')"
            :extra="$t('ecommerce.attribute.default_extra')"
          >
            <a-textarea
              :auto-size="{ minRows: 3, maxRows: 6 }"
              allowClear
              v-decorator="['default', {
                initialValue: attribute.default,
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('ecommerce.attribute.default') }) }
                ]
              }]"
            ></a-textarea>
          </a-form-item>
        </a-form>
      </a-spin>
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      id: undefined, // 属性ID
      isnew: true, // 是否为新建，此字段值根据字段id判断
      visible: false, // 是否显示
      loading: false, // 是否加载数据
      standardId: undefined, // 规格标准ID
      attribute: {} // 属性对象
    }
  },
  computed: {
    ...mapState({
      ecStandards: state => state.ecstandard.standards
    })
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          // 每次打开更新
          if (this.id !== 0) {
            this.isnew = false
            this.getData()
          } else {
            // 重置数据
            this.isnew = true
            this.attribute = {}
          }
          this.attribute.standardId = this.standardId
        }
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {},
  methods: {
    getData() {
      this.loading = true
      this.$http
        .get(this.$api.ECOMMERCE_ATTRIBUTE_INFO(this.$parent.tabIndex, this.id))
        .then(({ data }) => {
          this.loading = false
          this.attribute = data
          this.form.setFieldsValue({
            name: this.attribute.name // 初始化字数计算
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    submitForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          let method = 'post' // 新建
          if (!this.isnew) {
            method = 'put' // 修改
          }
          method = 'get' // mock
          this.$http({
            method: method,
            url: this.$api.OPERACTION_SUCCESS,
            data: values
          }).then(() => {
            this.visible = false
            this.$message.success(this.$t('message.save_success'))
            this.$emit('refresh')
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