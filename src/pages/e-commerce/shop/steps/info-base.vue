<template>
  <div>
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item :label="$t('ecommerce.shop.logo')" :extra="$t('ecommerce.shop.logo_extra')">
        <!-- <a-input
          hidden
          v-decorator="['logo', {
            rules: [
              { required: true, message: $t('message.please_upload', {content: $t('ecommerce.shop.logo')}) }
            ]
          }]"
        ></a-input>-->
        <image-upload :multiple="false"></image-upload>
      </a-form-item>
      <!-- 店铺名称 -->
      <a-form-item :label="$t('ecommerce.shop.name')" :extra="$t('ecommerce.shop.name_extra')">
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
      <!-- 店铺所在平台 -->
      <a-form-item
        :label="$t('ecommerce.shop.platform')"
        :extra="$t('ecommerce.shop.platform_extra')"
      >
        <a-select
          mode="multiple"
          :placeholder="$t('ecommerce.shop.platform')"
          v-decorator="['platform', {
            initialValue: data.platform,
            rules: [
              { required: true, message: $t('message.please_select', {content: $t('ecommerce.shop.platform')}) }
            ]
          }]"
        >
          <a-select-option
            :key="item.value"
            :value="item.value"
            v-for="item in platforms"
          >{{item.label}}</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 店铺所在地 -->
      <a-form-item
        :label="$t('ecommerce.shop.location')"
        :extra="$t('ecommerce.shop.location_extra')"
      >
        <a-cascader
          change-on-select
          :options="areas"
          :show-search="{ filter }"
          :placeholder="$t('ecommerce.shop.location')"
          v-decorator="['areas', {
            initialValue: data.areas,
            rules: [
              { required: true, message: $t('message.please_select', {content: $t('ecommerce.shop.location')}) }
            ]
          }]"
        />
      </a-form-item>
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
  data() {
    return {
      refName: 'baseStep'
    }
  },
  computed: {
    ...mapState({
      platforms: state => state.ecshop.platforms
    })
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
  mounted() {
    if (this.$parent.scrollContainer) {
      this.$parent.scrollContainer.scrollTop = 0
    }
  },
  methods: {
    next() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (err) {
            values.province = values.areas[0]
            values.city = values.areas[1]
            values.district = values.areas[2]
            this.$emit('dataChange', { ...values })
            resolve(values)
          } else {
            reject(err)
          }
        })
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