export default {
  namespaced: true,
  state: {
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
  },
  actions: {
  }
}
