<script>
export default {
  computed: {
    collapsed: {
      get() {
        return this.$store.state.common.collapsed
      },
      set(val) {
        this.$store.dispatch('common/updateCollapsed', val)
      }
    },
    breadcrumbs: {
      get() {
        return this.$store.state.common.breadcrumbs
      },
      set(val) {
        this.$store.dispatch('common/updateBreadcrumbs', val)
      }
    },
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
    },
    mapOfDict: {
      get() {
        return this.$store.state.common.mapOfDict
      },
      set(locale) {
        this.$store.dispatch('common/updateMapOfDict', locale)
      }
    }
  }
}
</script>