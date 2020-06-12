<template>
  <div>
    <a-form :form="form">
      <!-- 掌柜名称 -->
      <a-form-item
        :label="$t('ecommerce.shopkeeper.name')"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        :extra="$t('ecommerce.shopkeeper.name_extra')"
      >
        <a-input
          :placeholder="$t('ecommerce.shopkeeper.name')"
          v-decorator="['name', {
            initialValue: data.shopkeeper.name,
            rules: [
              { required: true, message: $t('message.please_input', {content: $t('ecommerce.shopkeeper.name')}) }
            ]
          }]"
        ></a-input>
      </a-form-item>
      <!-- 真实姓名 -->
      <a-form-item
        :label="$t('ecommerce.shopkeeper.actual_name')"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        :extra="$t('ecommerce.shopkeeper.actual_name_extra')"
      >
        <a-input
          :placeholder="$t('ecommerce.shopkeeper.actual_name')"
          v-decorator="['actualName', {
            initialValue: data.shopkeeper.actualName,
            rules: [
              { required: true, message: $t('message.please_input', {content: $t('ecommerce.shopkeeper.actual_name')}) }
            ]
          }]"
        ></a-input>
      </a-form-item>
      <!-- 掌柜联系方式 -->
      <a-form-item
        :label="$t('ecommerce.shopkeeper.contact')"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        :extra="$t('ecommerce.shopkeeper.contact_extra')"
      >
        <a-input
          :placeholder="$t('ecommerce.shopkeeper.contact')"
          v-decorator="['contact', {
            initialValue: data.shopkeeper.contact,
            rules: [
              { required: true, message: $t('message.please_input', {content: $t('ecommerce.shopkeeper.contact')}) }
            ]
          }]"
        ></a-input>
      </a-form-item>
      <a-form-item
        :label="$t('ecommerce.shopkeeper.ID_card_front')"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        :extra="$t('ecommerce.shopkeeper.ID_card_front_extra')"
      >
        <!-- <a-input
          hidden
          v-decorator="['logo', {
            rules: [
              { required: true, message: $t('message.please_upload', {content: $t('ecommerce.shop.logo')}) }
            ]
          }]"
        ></a-input>-->
        <image-upload :multiple="false" :width="182">
          <img class="template-image" src="~@/assets/images/shop/id_card_front.png" />
        </image-upload>
      </a-form-item>
      <a-form-item
        :label="$t('ecommerce.shopkeeper.ID_card_back')"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        :extra="$t('ecommerce.shopkeeper.ID_card_back_extra')"
      >
        <!-- <a-input
          hidden
          v-decorator="['logo', {
            rules: [
              { required: true, message: $t('message.please_upload', {content: $t('ecommerce.shop.logo')}) }
            ]
          }]"
        ></a-input>-->
        <image-upload :multiple="false" :width="182">
          <img class="template-image" src="~@/assets/images/shop/id_card_back.png" />
        </image-upload>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ImageUpload from '@/components/plugins/image-upload'
export default {
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
      refName: 'shopkeeperStep'
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    if (!this.data.shopkeeper) {
      this.data.shopkeeper = {}
    }
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
}
.image-upload .template-image {
  max-width: 50%;
  max-height: 104px;
}
</style>
<style scoped>
.ant-form >>> .ant-form-item-children > div {
  display: flex;
}
</style>