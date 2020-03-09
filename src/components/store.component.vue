<script>
import { mapState } from 'vuex'
// 全局变量存储状态
export default {
  computed: {
    ...mapState({
      mapOfDict: state => state.common.mapOfDict // 字典表对象
    }),
    // 菜单栏是否折叠
    collapsed: {
      get() {
        return this.$store.state.common.collapsed
      },
      set(val) {
        this.$store.dispatch('common/updateCollapsed', val)
      }
    },
    // 字典表集合
    dicts: {
      get() {
        return this.$store.state.common.dicts
      },
      set(val) {
        this.$store.dispatch('common/updateDicts', {
          val: val,
          locale: this.$i18n.locale || 'zh'
        })
      }
    }
  }
}
</script>