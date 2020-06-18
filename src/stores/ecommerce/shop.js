export default {
  namespaced: true,
  state: {
    shops: [],
    status: [],
    tabs: [
      { label: '待审核', value: 0, icon: 'file-sync' },
      { label: '审核通过', value: 1, icon: 'file-done' },
      { label: '审核不通过', value: 2, icon: 'exception' }
    ],
    platforms: [
      { label: '淘宝', value: 0 },
      { label: '天猫', value: 1 },
    ]
  },
  mutations: {
    updateShops(state, shops) {
      state.shops = shops
    }
  },
  actions: {
    updateShops(context, shops) {
      context.commit('updateShops', shops)
    }
  }
}
