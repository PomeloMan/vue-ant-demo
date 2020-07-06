<template>
  <a-drawer
    placement="right"
    :closable="false"
    :visible="settingDrawerVisible"
    :get-container="false"
    :wrap-style="{ position: 'absolute' }"
    :body-style="{ padding: 0 }"
    @close="settingDrawerVisible = false"
  >
    <a-tabs size="small" default-active-key="1" style="display: inline-block">
      <a-tab-pane key="1" tab="个性化">
        <div class="tab-content">
          <!-- 颜色 -->
          <h3>{{$t('settings.color')}}</h3>
          <a-list size="small">
            <a-list-item :key="item.key" v-for="item in settingColors">
              <a-input
                slot="actions"
                size="small"
                type="color"
                style="width: 22px; padding: 0"
                :defaultValue="color[item.key]"
                @change="changeColor(item.key, $event.target.value)"
              ></a-input>
              <a-list-item-meta>
                <p slot="title">{{$t('settings.primary-color')}}</p>
                <p slot="description">{{$t('settings.primary-color-extra')}}</p>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <!-- 主题 -->
          <h3>{{$t('settings.theme')}}</h3>
          <a-list :grid="{ gutter: 16, column: 2 }" :data-source="settingThemes">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card
                class="theme-card"
                :class="`theme-${item.mode}`"
                :body-style="{ padding: 0, height: '100%' }"
                @click="changeTheme(item.mode)"
              >
                <a-row type="flex">
                  <a-col :span="6" :style="{backgroundColor: item.colors[0]}"></a-col>
                  <a-col :span="18">
                    <div :style="{backgroundColor: item.colors[1]}"></div>
                    <div :style="{backgroundColor: item.colors[2]}"></div>
                  </a-col>
                </a-row>
                <p class="center-x">{{$t(item.label)}}</p>
              </a-card>
            </a-list-item>
          </a-list>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="全局设置" force-render></a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>

<script>
import Store from '@/components/mixins/store.js'
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'
import { find } from '@/pipes'
export default {
  mixins: [Store],
  computed: {
    ...mapState({
      settingColors: state => state.setting.colors,
      settingThemes: state => state.setting.themes,
      color: state => state.common.color,
      theme: state => state.common.theme
    })
  },
  data() {
    this.changeColor = debounce(this.changeColor, 300, {
      leading: false,
      trailing: true
    })
    return {}
  },
  created() {
    Promise.all([this.initSettings()]).then()
  },
  methods: {
    // 初始化配置项
    initSettings() {
      return new Promise(resolve => {
        this.changeTheme(this.theme, true)
        resolve()
      })
    },
    // 更换主色调
    changeColor(key, value) {
      var vars = {}
      vars[key] = value
      const themeVars = find(this.theme, this.settingThemes, {
        keyStr: 'mode',
        returnKeyStr: 'vars'
      })
      window.less
        .modifyVars({ ...themeVars, ...vars })
        .then(() => {
          this.$store.dispatch('common/updateColor', { ...this.color, ...vars })
        })
        .catch(e => {
          console.error(e)
          this.$message.error(this.$t('message.update_failure'))
        })
    },
    // 更换主题
    changeTheme(themeMode, force) {
      if (themeMode === this.theme && !force) {
        return
      }
      const themeVars = find(themeMode, this.settingThemes, {
        keyStr: 'mode',
        returnKeyStr: 'vars'
      })
      window.less
        .modifyVars({ ...themeVars, ...this.color })
        .then(() => {
          this.$store.dispatch('common/updateTheme', themeMode)
        })
        .catch(e => {
          console.error(e)
          this.$message.error(this.$t('message.update_failure'))
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-content {
  padding: 0 12px;
}
.theme-card {
  cursor: pointer;
  height: 80px;
  // 主题样式
  .ant-row-flex {
    height: 100%;
  }
  .ant-col {
    height: inherit;
    > div:first-child {
      height: 25%;
    }
    > div:last-child {
      height: 75%;
    }
  }
}
</style>