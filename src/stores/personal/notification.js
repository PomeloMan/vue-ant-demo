export default {
  namespaced: true,
  state: {
    types: [ // 通知类型
      { label: '系统通知', value: 1, icon: 'setting' },
      { label: '项目通知', value: 2, icon: 'project' },
      { label: '自定义通知', value: 3, icon: 'user' }
    ]
  }
}
