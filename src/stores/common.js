export default {
  namespaced: true,
  state: {
    collapsed: false, // 侧边栏展开/收缩
    dicts: [], // 字典数据
    mapOfDict: {} // 字典数据
  },
  mutations: {
    updateCollapsed(state, collapsed) {
      state.collapsed = collapsed
    },
    updateDicts(state, { dicts, locale }) {
      if (!locale) { locale = 'zh' }
      state.dicts = dicts
      const mapOfDict = new Object()
      dicts.forEach(dict => {
        const key = dict.code
        mapOfDict[key] = dict[`value_${locale}`]
      });
      state.mapOfDict = mapOfDict
    }
  },
  actions: {
    updateCollapsed(context, collapsed) {
      context.commit('updateCollapsed', collapsed)
    },
    updateDicts(context, { val, locale }) {
      context.commit('updateDicts', { dicts: val, locale })
    }
  }
}
