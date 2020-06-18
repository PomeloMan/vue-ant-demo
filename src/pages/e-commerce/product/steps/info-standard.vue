<template>
  <!-- 商品规格参数（SKU/SPU） -->
  <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
    <!-- 商品编码 -->
    <a-form-item :label="$t('ecommerce.product.code')" :extra="$t('ecommerce.product.code_extra')">
      <a-input
        v-decorator="['code', {
        initialValue: data.code,
        rules: [
          { min: 1, message: $t('message.field_length_min', {min: 1}) },
          { max: 20, message: $t('message.field_length_max', {max: 20}) }
        ]
      }]"
      ></a-input>
    </a-form-item>
    <!-- 规格标准模板 -->
    <a-form-item
      :label="$t('ecommerce.product.standard')"
      :extra="$t('ecommerce.product.standard_extra')"
    >
      <a-select
        allowClear
        @change="handleStandardChange"
        v-decorator="['standardId', { initialValue: data.standardId }]"
      >
        <a-select-option :key="item.id" :value="item.id" v-for="item in ecStandards">{{item.name}}</a-select-option>
      </a-select>
    </a-form-item>
    <!-- 商品规格 -->
    <a-form-item :label="$t('ecommerce.product.sku')" :extra="$t('ecommerce.product.sku_extra')">
      <a-row :gutter="12">
        <a-col :span="20">
          <a-input v-model="skuAttr" @keyup.enter.native="addSku"></a-input>
        </a-col>
        <a-col :span="4">
          <a-button type @click="addSku">{{$t('common.add')}}</a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-spin :spinning="loadingStandards">
      <a-form-item :wrapper-col="{ offset: 6, span: 12 }">
        <div class="sku-wrap" v-if="skuArr && skuArr.length > 0">
          <div :key="index" v-for="(item, index) in skuArr" class="sku-item">
            <p>
              {{item.name}}
              <template v-if="form.getFieldValue('standardId') != null">
                <a-popover :content="$t('ecommerce.product.sync_standard_default')">
                  <a-popconfirm
                    :title="$t('message.is_confirm_sync')"
                    @confirm="syncSkuAttrDefault(item)"
                  >
                    <a-button type="link" size="small">
                      <a-icon :type="item.loading?'loading':'sync'"></a-icon>
                    </a-button>
                  </a-popconfirm>
                </a-popover>
              </template>
            </p>
            <a-checkbox-group
              v-model="item.selected"
              :options="item.default"
              @change="refreshSkuTable"
            ></a-checkbox-group>
          </div>
        </div>
        <!-- <a-empty v-else /> -->
      </a-form-item>
    </a-spin>
    <a-form-item :wrapper-col="{ span: 24 }" v-if="skus && skus.length > 0">
      <sku-table v-model="skus"></sku-table>
    </a-form-item>
    <!-- 商品参数 -->
    <a-form-item :label="$t('ecommerce.product.spu')" :extra="$t('ecommerce.product.spu_extra')">
      <a-row :gutter="12">
        <a-col :span="20">
          <a-input v-model="spuAttr" @keyup.enter.native="addSpu"></a-input>
        </a-col>
        <a-col :span="4">
          <a-button type @click="addSpu">{{$t('common.add')}}</a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-spin :spinning="loadingStandards">
      <a-form-item :wrapper-col="{ offset: 6, span: 12 }">
        <a-descriptions bordered :size="'small'" :column="3" v-if="spuArr && spuArr.length > 0">
          <a-descriptions-item
            :label="item.name"
            :span="3"
            :key="index"
            v-for="(item, index) in spuArr"
          >
            <a-input :value="item.default"></a-input>
          </a-descriptions-item>
        </a-descriptions>
        <!-- <a-empty v-else /> -->
      </a-form-item>
    </a-spin>
  </a-form>
</template>

<script>
import { mapState } from 'vuex'
import SkuTable from '../components/sku-table'
import debounce from 'lodash/debounce'
import { combineAll, toString36 } from '@/utils'
export default {
  components: { SkuTable },
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
    'data.skus': function(val) {
      this.skus = val
    },
    'data.spuAttrs': function(val) {
      this.spuArr = val
    },
    'data.standardId': function(val) {
      if (this.$parent.current !== 1) {
        this.handleStandardChange(val)
      }
    }
  },
  data() {
    this.refreshSkuTable = debounce(this.refreshSkuTable, 300, {
      leading: true,
      trailing: false
    })
    return {
      refName: 'standardStep',
      loadingStandards: false,
      skuArr: [], // SKU集合
      spuArr: [], // SPU集合
      skuAttr: undefined, // 手动新增SKU
      spuAttr: undefined, // 手动新增SPU
      skus: [] // sku组合
    }
  },
  computed: {
    ...mapState({
      ecStandards: state => state.ecstandard.standards
    })
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {},
  mounted() {},
  methods: {
    // 下一步，保留更改数据，需校验数据
    next() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err && this.skus && this.skus.length > 0) {
            this.$emit('dataChange', {
              ...this.data,
              ...values,
              skus: this.skus
            })
            resolve(values)
          } else {
            this.$message.warn(
              this.$t('message.please_input', {
                content: this.$t('ecommerce.product.sku')
              })
            )
            reject(err)
          }
        })
      })
    },
    // 上一步，保留更改数据，无需校验数据
    prev() {
      return new Promise(resolve => {
        const values = this.form.getFieldsValue()
        this.$emit('dataChange', { ...this.data, ...values, skus: this.skus })
        resolve(values)
      })
    },
    // 规格标准模板变更
    handleStandardChange(val) {
      // 加载指定规格标准SKU/SPU信息
      this.loadingStandards = true
      this.$http
        .get(this.$api.ECOMMERCE_ATTRIBUTE_LIST(val))
        .then(({ data }) => {
          this.loadingStandards = false
          this.skuArr = data.filter(d => d.type === 1)
          this.spuArr = data.filter(d => d.type === 2)
          // 将SKU选项值转数组
          this.skuArr.forEach(s => {
            s.default = this.split(s.default)
            // 设置预选值
            const attr = this.data.skuAttrs.find(a => a.name === s.name)
            if (attr) {
              s.selected = attr.selected
            }
          })
        })
        .catch(() => {
          this.loadingStandards = false
        })
    },
    // 添加 SKU 属性
    addSku() {
      if (this.skuAttr) {
        const kv = this.skuAttr.split('=')
        // 判断输入格式是否正确
        if (kv.length === 2) {
          const index = this.skuArr.findIndex(s => s.name === kv[0])
          if (index > -1) {
            let originDefaults = this.skuArr[index].default
            if (!(originDefaults instanceof Array)) {
              originDefaults = this.split(originDefaults)
            }
            // 存在则往原数据添加增量
            const defaults = new Set(originDefaults)
            // 根据空格(' ')或逗号(',')获取输入集合
            let values = this.split(kv[1])
            values.forEach(v => {
              defaults.add(v)
            })
            this.skuArr[index].default = Array.from(defaults)
          } else {
            // 不存在则新建规格
            this.skuArr.push({
              name: kv[0],
              default: this.split(kv[1]),
              type: 1 // sku标识
            })
          }
        } else {
          this.$message.warn(this.$t('message.format_error'))
        }
        this.skuAttr = undefined
      } else {
        this.$message.warn(
          this.$t('message.must_not_be_empty', {
            name: this.$t('ecommerce.product.sku')
          })
        )
      }
    },
    // 同步SKU属性预设值到所属规格标准
    syncSkuAttrDefault(sku) {
      sku.loading = true
      this.$forceUpdate()
      this.$http
        .get(this.$api.OPERACTION_SUCCESS, {
          params: { ...sku, default: sku.default.join(' ') }
        })
        .then(() => {
          sku.loading = false
          this.$message.success(this.$t('message.sync_success'))
          this.$forceUpdate()
        })
        .catch(() => {
          sku.loading = false
          this.$forceUpdate()
        })
    },
    // 根据所选属性值更新SKU表信息
    refreshSkuTable() {
      // 将选中SKU集合转成SKU组合
      let skuCombine = combineAll(
        this.skuArr
          .filter(s => s.selected && s.selected.length > 0)
          .map(s => s.selected)
      )
      if (skuCombine.length === 1 && skuCombine[0] instanceof Array) {
        skuCombine = skuCombine[0]
      }
      const skus = skuCombine.map(s => {
        // 计算SKU编码，SKU编码规则：商品编码+属性名(1位)+属性值(1位)+属性名(1位)+属性值(1位)+...
        const code = this.data.code + this.calcSkuCode(s)
        return {
          id: code,
          sku: s, // SKU组合
          price: 0, // 价格
          stock: 0 // 库存
        }
      })
      // 合并已有数据
      this.skus = skus.map(s => {
        const origin = this.skus.find(o => o.sku === s.sku)
        if (origin) {
          // 存在返回原数据
          return origin
        } else {
          return s
        }
      })
    },
    // 添加 SPU 属性
    addSpu() {
      if (this.spuAttr) {
        const kv = this.spuAttr.split('=')
        // 判断输入格式是否正确
        if (kv.length === 2) {
          const index = this.spuArr.findIndex(s => s.name === kv[0])
          if (index > -1) {
            // 属性名已存在提示
            this.$message.warn(
              this.$t('common.existed', {
                name: this.$t('ecommerce.product.spu')
              })
            )
          } else {
            // 不存在则新建规格
            this.spuArr.push({
              name: kv[0],
              default: kv[1],
              type: 2 // sku标识
            })
          }
        } else {
          this.$message.warn(this.$t('message.format_error'))
        }
        this.spuAttr = undefined
      } else {
        this.$message.warn(
          this.$t('message.must_not_be_empty', {
            name: this.$t('ecommerce.product.spu')
          })
        )
      }
    },
    // ---------- private ----------
    split(val) {
      if (typeof val === 'string') {
        if (val.indexOf(' ') > -1) {
          return val.split(' ')
        } else {
          return val.split(',')
        }
      }
    },
    // 通过sku组合值（红色*34码）计算SKU编码
    calcSkuCode(sku) {
      const sel = sku.split('*')
      let code = ''
      this.skuArr.forEach((s, i) => {
        const index = s.selected.findIndex(sl => sl === sel[i])
        code += toString36(s.id, 1) + toString36(index, 1)
      })
      return code
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-form {
  width: 80%;
  margin: auto;
}
</style>