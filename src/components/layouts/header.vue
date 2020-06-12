<template>
  <div class="app-header" :class="type === 'bordered' ? 'app-header-bordered' : ''">
    <a-breadcrumb>
      <template v-for="item in breadcrumbs">
        <a-breadcrumb-item :key="item.name">
          <template v-if="!!item.url">
            <router-link
              v-if="item.url === '/'"
              :to="{ path: item.url, query: { t: Date.now() } }"
            >{{ $t(item.name) }}</router-link>
            <router-link v-else :to="item.url">{{ $t(item.name) }}</router-link>
          </template>
          <template v-else>{{ $t(item.name) }}</template>
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>

    <slot name="action-group"></slot>
    <template v-if="searchType === 'advanced'">
      <div>
        <a-button class="advanced-btn fs-13" type="link" @click="toggole">
          {{ $t('common.advance_search') }}
          <a-icon data-rotation="180" :type="'up'" style="transform: rotate(180deg)" />
        </a-button>
      </div>

      <div
        id="advancedWrapper"
        class="advanced-wrapper"
        :class="{ visible: isAdvancedWrapperVisible }"
      >
        <a-form id="advancedForm" :layout="'inline'" :form="advancedForm">
          <a-row :gutter="24" type="flex">
            <a-col :span="24 / column" :key="index" v-for="(item, index) in formItem">
              <a-form-item :label="item.label" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
                <!-- input -->
                <template v-if="item.type === 'input'">
                  <a-input v-decorator="[item.key]"></a-input>
                </template>
                <!-- select -->
                <template v-else-if="item.type === 'select'">
                  <a-select v-decorator="[item.key]">
                    <a-select-option
                      :key="option.value"
                      :value="option.value"
                      v-for="option in item.options"
                    >{{ option.label }}</a-select-option>
                  </a-select>
                </template>
                <!-- radio -->
                <template v-else-if="item.type === 'radio'">
                  <a-radio-group v-decorator="[item.key]" buttonStyle="solid">
                    <a-radio-button
                      :key="option.value"
                      :value="option.value"
                      v-for="option in item.options"
                    >{{ option.label }}</a-radio-button>
                  </a-radio-group>
                </template>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 重置和查询按钮 -->
          <a-row>
            <a-col :span="12">
              <a-form-item :wrapperCol="{ span: 20, offset: 4 }">
                <a-button @click="advancedForm.resetFields()">
                  <a-icon type="rest" />
                  {{ $t('common.reset') }}
                </a-button>
                <a-divider type="vertical" style="background: transparent"></a-divider>
                <a-button type="primary" @click="onAdvancedSearch">
                  <a-icon type="search" />
                  {{ $t('common.search') }}
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </template>
    <template v-if="searchType === 'simple'">
      <div>
        <a-input-search
          size="small"
          placeholder="Quick search"
          style="width: 200px"
          v-model="keyword"
          @search="onSimpleSearch"
        />
      </div>
    </template>
    <template v-if="searchType === 'refresh'">
      <div>
        <a-button type="link" size="small" @click="$emit('refresh')">
          <a-icon type="sync"></a-icon>
        </a-button>
      </div>
    </template>
    <template v-else>
      <div>
        <!-- none -->
      </div>
    </template>
  </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import { Breadcrumb, Button, Input } from 'ant-design-vue'

export default {
  name: 'app-header',
  components: {
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AButton: Button,
    AInputSearch: Input.Search
  },
  props: {
    type: {
      type: String,
      default: function() {
        return 'default'
      }
    },
    breadcrumbs: {
      type: Array,
      default: function() {
        return []
      }
    },
    searchType: {
      type: String, // 'simple' | 'advanced' | 'none'
      default: function() {
        return 'none'
      }
    },
    formItem: {
      type: Array,
      default: function() {
        return []
      }
    },
    column: {
      type: Number,
      default: function() {
        return 2
      }
    }
  },
  data() {
    return {
      isAdvancedWrapperVisible: false,
      keyword: undefined,
      advancedForm: this.$form.createForm(this),
      toUpTween: '',
      toDownTween: ''
    }
  },
  watch: {
    isAdvancedWrapperVisible(val) {
      // 计算 form 高度并赋值给 advance-wrapper 元素
      this.$nextTick(() => {
        const advFormEl = document.getElementById('advancedForm')
        const advWrapEl = document.getElementById('advancedWrapper')
        if (val) {
          if (advFormEl && advWrapEl) {
            advWrapEl.style.height = advFormEl.clientHeight + 'px'
          }
        } else {
          advWrapEl.style.height = '0px'
        }
      })
    }
  },
  mounted() {
    this.initTween()
    this.animate()
  },
  methods: {
    initTween() {
      const $this = this
      this.$nextTick(() => {
        const el = document.querySelector('.advanced-btn .anticon')
        if (el && el.dataset) {
          this.toUpTween = new TWEEN.Tween(el.dataset)
            .to({ rotation: 0 }, 300)
            .onUpdate(function(object) {
              $this.updateBox(el, object)
            })
          this.toDownTween = new TWEEN.Tween(el.dataset)
            .to({ rotation: 180 }, 300)
            .onUpdate(function(object) {
              $this.updateBox(el, object)
            })
        }
      })
    },
    onSimpleSearch() {
      this.$emit('onSimpleSearch', this.keyword)
    },
    onAdvancedSearch() {
      this.toggole()
      this.$emit('onAdvancedSearch', this.advancedForm.getFieldsValue())
    },
    // 开启/关闭高级搜索选项
    toggole() {
      this.isAdvancedWrapperVisible = !this.isAdvancedWrapperVisible
      if (this.isAdvancedWrapperVisible) {
        this.toUpTween.start()
      } else {
        this.toDownTween.start()
      }
    },
    updateBox(box, params) {
      var s = box.style,
        transform = 'rotate(' + Math.floor(params.rotation) + 'deg)'
      s.webkitTransform = transform
      s.mozTransform = transform
      s.transform = transform
    },
    animate(time) {
      requestAnimationFrame(this.animate)
      TWEEN.update(time)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 40px;

  &.app-header-bordered {
    background: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    box-shadow: 1px 2px 4px rgba($color: #eee, $alpha: 0.6);
  }

  > *:nth-child(1),
  > *:nth-child(3) {
    flex: 1;
  }
  > *:nth-child(1) {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  > *:nth-child(3) {
    text-align: right;
    margin-right: 4px;
  }
}
.advanced-wrapper {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 0;
  left: 0;
  z-index: 100;
  background: white;
  overflow: hidden;
  transition: all 0.3s;

  &.visible {
    // height: 200px; // 自适应，watch.isAdvancedWrapperVisible
    border-bottom: 1px solid #e8e8e8;
  }
  .ant-form {
    padding: 16px;
    .ant-form-item {
      display: flex;
      margin-bottom: 0;
    }
  }
}
</style>