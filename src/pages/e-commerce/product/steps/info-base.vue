<template>
  <div>
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <!-- 所属店铺 -->
      <a-form-item :label="$t('ecommerce.product.shop')">
        <a-select
          :placeholder="$t('ecommerce.product.shop')"
          v-decorator="['shopId', {
            initialValue: data.shopId,
            rules: [
              { required: true, message: $t('message.please_select', {content: $t('ecommerce.product.shop')}) }
            ]
          }]"
        >
          <a-select-option :key="item.id" :value="item.id" v-for="item in ecShops">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 商品名称 -->
      <a-form-item
        :label="$t('ecommerce.product.name')"
        :extra="$t('ecommerce.product.name_extra', {
          current: form.getFieldValue('name')? form.getFieldValue('name').length: 0,
          limit: 50
        })"
      >
        <a-input
          :placeholder="$t('ecommerce.shop.name')"
          v-decorator="['name', {
            initialValue: data.name,
            rules: [
              { required: true, message: $t('message.please_input', {content: $t('ecommerce.shop.name')}) }
            ]
          }]"
        ></a-input>
      </a-form-item>
      <!-- 商品品牌 -->
      <a-form-item :label="$t('ecommerce.product.brand')">
        <a-select
          :placeholder="$t('ecommerce.product.brand')"
          v-decorator="['brandId', {
            initialValue: data.brandId,
            rules: [
              { required: true, message: $t('message.please_select', {content: $t('ecommerce.product.brand')}) }
            ]
          }]"
        >
          <a-select-option :key="item.id" :value="item.id" v-for="item in ecBrands">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 商品分类 -->
      <a-form-item :label="$t('ecommerce.product.category')">
        <a-cascader
          change-on-select
          :options="categories"
          :placeholder="$t('ecommerce.product.category')"
          v-decorator="['categoryId', {
            initialValue: data.categoryId,
            rules: [
              { required: true, message: $t('message.please_select', {content: $t('ecommerce.product.category')}) }
            ]
          }]"
        ></a-cascader>
      </a-form-item>
      <!-- 商品地址 -->
      <a-form-item
        :label="$t('ecommerce.product.location')"
        :extra="$t('ecommerce.product.location_extra')"
      >
        <a-cascader
          change-on-select
          :options="areas"
          :show-search="{ filter }"
          :placeholder="$t('ecommerce.product.location')"
          v-decorator="['areas', { initialValue: data.areas }]"
        />
      </a-form-item>
      <a-form-item
        :label="$t('ecommerce.product.picture')"
        :extra="$t('ecommerce.product.picture_extra', { width: 512, height: 512, size: 10, length: 8 })"
      >
        <!-- <a-input
          hidden
          v-decorator="['logo', {
            rules: [
              { required: true, message: $t('message.please_upload', {content: $t('ecommerce.shop.logo')}) }
            ]
          }]"
        ></a-input>-->
        <image-upload :fileList="fileList" :multiple="true"></image-upload>
      </a-form-item>
      <!-- 权重 -->
      <a-form-item
        :label="$t('common.weights')"
        :extra="$t('common.weights_extra', {min: minValue , max: maxValue})"
      >
        <a-input-number
          :placeholder="$t('common.weights')"
          v-decorator="['sequence', {
            initialValue: data.sequence,
            rules: [
              { required: true, message: $t('message.please_input', {content: $t('common.weights')}) },
              { validator: sequenceValidator }
            ]
          }]"
        ></a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImageUpload from '@/components/plugins/image-upload'
import Area from '@/components/mixins/area'
import Validator from '@/components/mixins/validator'
import { extractFields, toString36 } from '@/utils'
import { find } from '@/pipes'
import { v1 as uuidv1 } from 'uuid'
export default {
  mixins: [Area, Validator],
  components: {
    ImageUpload
  },
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
  watch: {
    'data.pictures': function(val) {
      this.fileList = val.map(v => ({
        uid: uuidv1(),
        status: 'done',
        url: v,
        thumbUrl: v
      }))
    }
  },
  data() {
    return {
      refName: 'baseStep',
      needCalcCode: true,
      fileList: []
    }
  },
  computed: {
    ...mapState({
      ecShops: state => state.ecshop.shops,
      ecCategories: state => state.eccategory.categories,
      ecBrands: state => state.ecbrand.brands
    }),
    categories: {
      get() {
        return extractFields(this.ecCategories, {
          alias: { label: 'name', value: 'id', key: 'id' }
        })
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.data.areas = [
      this.data.province,
      this.data.city,
      this.data.district
    ].filter(d => d) // 清空空值
  },
  mounted() {},
  methods: {
    next(activeKey) {
      return new Promise(resolve => {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (values.areas) {
              values.province = values.areas[0]
              values.city = values.areas[1]
              values.district = values.areas[2]
            }
            if (this.needCalcCode) {
              this.calcCode(values).then(() => {
                if (
                  this.data.code &&
                  values.code !== this.data.code &&
                  activeKey === 1
                ) {
                  this.showCodeConfirmNotification(values.code)
                }
                this.$emit('dataChange', {
                  ...this.data,
                  ...values,
                  code: this.data.code
                })
                resolve(values)
              })
            } else {
              this.$emit('dataChange', {
                ...this.data,
                ...values,
                code: this.data.code
              })
              resolve(values)
            }
          }
        })
      })
    },
    // 计算并获取商品编码序号
    calcCode(values) {
      const brandCode = find(values.brandId, this.ecBrands, {
        keyStr: 'id',
        returnKeyStr: 'code'
      })
      const shopCode = toString36(values.shopId)
      const categoryCode = toString36(values.categoryId)
      const date = this.$moment().format('YYYYMMDD')
      const code = `${brandCode}${shopCode}${categoryCode}${date}`
      return this.$http
        .get(this.$api.ECOMMERCE_PRODUCT_CODE_NUMBER(code))
        .then(({ data }) => {
          values.code = code + data.codeNumber
        })
    },
    // 计算商品编号与原商品编号不符则通知是否覆盖原编号
    showCodeConfirmNotification(code) {
      const $this = this
      const key = `code-confirm-notification`
      this.$notification.open({
        key,
        message: $this.$t('ecommerce.product.code_differ_confirm_msg'),
        description: $this.$t('ecommerce.product.code_differ_confirm_desc'),
        class: key,
        style: { padding: '12px' },
        btn: h => {
          return [
            // 不再提示
            h(
              'a-button',
              {
                props: { type: 'default', size: 'small' },
                on: {
                  click: () => {
                    $this.needCalcCode = false
                    $this.$notification.close(key)
                  }
                }
              },
              $this.$t('common.not_remind')
            ),
            h('a-divider', {
              props: { type: 'vertical' },
              style: { background: 'transparent' }
            }),
            // 确认覆盖
            h(
              'a-button',
              {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    $this.data.code = code
                    $this.$emit('dataChange', { ...$this.data })
                    $this.$notification.close(key)
                  }
                }
              },
              $this.$t('common.ok')
            )
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-form {
  width: 80%;
  margin: auto;
  .image-upload {
    display: flex;
  }
}
</style>