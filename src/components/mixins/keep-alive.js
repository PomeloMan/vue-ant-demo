import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      keepAliveList: state => state.common.keepAliveList
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$options.name.indexOf('keepalive') > -1) {
        if (!vm.keepAliveList.includes(vm.$options.name)) {
          vm.keepAliveList.push(vm.$options.name)
        }
        vm.$store.dispatch('common/updateKeepAliveList', vm.keepAliveList)
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'system-role' && from.name == 'system-user') {
      // user -> role 取消 user 缓存
      this.$store.dispatch('common/updateKeepAliveList', this.keepAliveList.filter(k => k != this.$options.name))
    }
    next()
  }
}