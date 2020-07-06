<template>
  <div>
    <a-drawer
      :title="(isnew ? $t('common.new') : $t('common.edit')) + $t('ecommerce.category._')"
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
          <!-- 分类缩图 -->
          <a-form-item :label="$t('ecommerce.category.thumbnail')">
            <image-upload :multiple="false"></image-upload>
          </a-form-item>
          <!-- 分类名称 -->
          <a-form-item :label="$t('ecommerce.category.name')">
            <a-input
              v-decorator="[
              'name', {
                rules: [
                  { required: true, message: $t('message.please_input', { content: $t('ecommerce.category.name') }) }
                ]
              }
            ]"
            />
          </a-form-item>
          <!-- 层级 -->
          <a-form-item
            :label="$t('ecommerce.category.level')"
            :extra="$t('ecommerce.category.level_extra')"
          >
            <!-- <a-tree-select
              :treeData="categories"
              :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
              :placeholder="$t('ecommerce.category.level_default')"
              v-decorator="['parentId', { initialValue: category.parentId }]"
            ></a-tree-select>-->
            <a-cascader
              change-on-select
              :options="categories"
              :placeholder="$t('ecommerce.category.level_default')"
              v-decorator="['parentId', { initialValue: category.parentId }]"
            ></a-cascader>
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
import ImageUpload from '@/components/plugins/image-upload'
import { mapState } from 'vuex'
import { extractFields } from '@/utils'
export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      id: '',
      isnew: true,
      visible: false,
      loading: false,
      categories: [],
      category: {}
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
          // a-tree-select.treeData
          // this.categories = extractFields(this.ecCategories, {
          //   alias: { title: 'name', value: 'id', key: 'id' }
          // })
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
    getData() {
      this.loading = true
      this.$http
        .get(`${this.$api.SYS_ROLE}/${this.id}`)
        .then(({ data }) => {
          this.loading = false
          const formData = {
            name: data.name,
            displayName: data.displayName,
            authorities: data.authorities.map(item => item.name)
          }
          this.form.setFieldsValue(formData)
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
            this.$store.dispatch('eccategory/updateCategories') // 清空缓存，重新获取数据
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
</style>