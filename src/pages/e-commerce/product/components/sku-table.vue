<template>
  <div>
    <a-form :form="skuform">
      <a-table
        bordered
        :rowKey="record => record.id"
        :columns="columns"
        :dataSource="skus"
        :loading="loading"
        size="small"
        :pagination="false"
      >
        <template v-for="slot in ['id','price','stock']" :slot="slot" slot-scope="val, record">
          <a-form-item :key="slot" style="margin-bottom:0;">
            <a-input
              v-decorator="[
                `skus[${record.id}][${slot}]`, {
                  initialValue: val,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: $t('message.field_required')
                    },
                    { min: 1, message: $t('message.field_length_min', {min: 1}) },
                    { max: 8, message: $t('message.field_length_max', {max: 8}) }
                  ]
                }]"
            ></a-input>
          </a-form-item>
        </template>
        <span slot="picture">
          <image-upload :multiple="false"></image-upload>
        </span>
      </a-table>
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
    prop: 'skus',
    event: 'skusChange'
  },
  props: {
    skus: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    columns: {
      get() {
        return [
          {
            title: this.$t('common.number'),
            width: 50,
            align: 'center',
            customRender: function(text, record, index) {
              return index + 1
            }
          },
          {
            title: this.$t('ecommerce.product.sku'),
            dataIndex: 'sku',
            width: 120,
            align: 'center'
          },
          {
            title: this.$t('ecommerce.product.sku_code'),
            dataIndex: 'id',
            width: 150,
            align: 'center',
            scopedSlots: { customRender: 'id' }
          },
          {
            title: this.$t('common.price'),
            dataIndex: 'price',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'price' }
          },
          {
            title: this.$t('common.stock'),
            dataIndex: 'stock',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'stock' }
          },
          {
            title: this.$t('common.picture'),
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'picture' }
          }
        ]
      }
    }
  },
  beforeCreate() {
    this.skuform = this.$form.createForm(this)
  },
  created() {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 300)
    console.log(this.skus)
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped>
.image-upload >>> .ant-upload {
  width: 64px;
  height: 64px;
}

.ant-form >>> .ant-form-explain {
  position: absolute;
}
</style>