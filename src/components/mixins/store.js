import { mapState } from 'vuex'
// 全局变量存储状态
export default {
  computed: {
    ...mapState({
      mapOfDict: state => state.common.mapOfDict // 字典表对象
    }),
    locale: {
      get() {
        return this.$store.state.common.locale
      },
      set(val) {
        this.$store.dispatch('common/updateLocale', val)
      }
    },
    // 菜单栏是否折叠
    collapsed: {
      get() {
        return this.$store.state.common.collapsed
      },
      set(val) {
        this.$store.dispatch('common/updateCollapsed', val)
      }
    },
    // 设置面板是否显示
    settingDrawerVisible: {
      get() {
        return this.$store.state.common.settingDrawerVisible
      },
      set(val) {
        this.$store.dispatch('common/updateSettingDrawerVisible', val)
      }
    },
    // 字典表集合
    dicts: {
      get() {
        return this.$store.state.common.dicts
      },
      set(val) {
        console.log()
        this.$store.dispatch('common/updateDicts', {
          val: val,
          locale: this.$constants.DEFAULT_LOCALE_NAME
        })
      }
    }
  }
}