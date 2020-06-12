<template>
  <div>
    <a-drawer
      :title="(isnew ? $t('common.new') : $t('common.edit')) + $t('ecommerce.standard._')"
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
          <!-- 标准名称 -->
          <a-form-item :label="$t('ecommerce.standard.name')">
            <a-input
              :placeholder="$t('message.please_input', { content:$t('ecommerce.standard.name') })"
              v-decorator="['name', {
                initialValue: standard.name,
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('ecommerce.standard.name') }) }
                ]
              }
            ]"
            />
          </a-form-item>
          <!-- 所属分类 -->
          <a-form-item :label="$t('ecommerce.standard.category')">
            <a-cascader
              change-on-select
              :options="categories"
              :placeholder="$t('message.please_select', { content:$t('ecommerce.standard.category') })"
              v-decorator="['category', {
                initialValue: standard.categoryId || [],
                rules: [
                  { required: true, message: $t('message.please_select', { content: $t('ecommerce.standard.category') }) }
                ]
              }]"
            ></a-cascader>
          </a-form-item>
          <a-form-item :label="$t('ecommerce.standard.shop')">
            <a-select
              mode="multiple"
              label-in-value
              :placeholder="$t('message.please_select', { content: $t('ecommerce.standard.shop') })"
              :filter-option="false"
              :not-found-content="loadingShopData ? undefined : null"
              @search="loadShopData"
              @change="handleShopDataChange"
              style="width: 100%"
              v-decorator="['shop', {
                initialValue: standard.shop || [],
                rules: [
                  { required: true, message: $t('message.please_select', { content: $t('ecommerce.standard.shop') }) }
                ]
              }]"
            >
              <a-spin v-if="loadingShopData" slot="notFoundContent" size="small" />
              <a-select-option v-for="d in shopData" :key="d.value">{{ d.text }}</a-select-option>
            </a-select>
          </a-form-item>
          <!-- 权重 -->
          <a-form-item :label="$t('common.weights')">
            <a-input-number
              :placeholder="$t('message.please_input', { content:$t('common.weights') })"
              v-decorator="['sequence', {
                initialValue: standard.sequence,
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('common.weights') }) }
                ]
              }]"
            ></a-input-number>
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
import { extractFields } from '@/utils'
import debounce from 'lodash/debounce'
export default {
  data() {
    this.loadShopData = debounce(this.loadShopData, 800)
    return {
      id: '',
      isnew: true,
      visible: false,
      loading: false,
      loadingShopData: false, // 远程加载店铺信息
      standard: {},
      categories: [],
      lastSearchValue: '', // 上次搜索值，用于判断两次搜索内容一致时不请求后台
      shopData: [] // 店铺列表
    }
  },
  computed: {
    ...mapState({
      ecCategories: state => state.eccategory.categories
    })
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          // 每次打开更新
          this.categories = extractFields(this.ecCategories, {
            alias: { label: 'name', value: 'id', key: 'id' }
          })
        }
      }
    },
    id: {
      handler() {
        if (this.id !== 0) {
          this.isnew = false
          this.getData()
        } else {
          this.isnew = true
        }
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {},
  methods: {
    getData() {},
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
            this.$store.dispatch('eccategory/updateCategories') // 清空缓存，重新获取数据
            this.$emit('refresh')
          })
        }
      })
    },
    // 异步加载店铺数据
    loadShopData(value) {
      if (value === this.lastSearchValue) {
        return
      }
      this.shopData = []
      this.loadingShopData = true
      new Promise(resolve => {
        setTimeout(() => {
          this.loadingShopData = false
          this.lastSearchValue = value
          this.shopData = [
            { text: '测试1', value: 1 },
            { text: '测试2', value: 2 }
          ]
          resolve()
        }, 2000)
      })
    },
    handleShopDataChange(value) {
      Object.assign(this, {
        value,
        shopData: [],
        loadingShopData: false
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