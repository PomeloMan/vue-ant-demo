export default {
  namespaced: true,
  state: {
    standards: []
  },
  mutations: {
    updateStandards(state, standards) {
      state.standards = standards
    },
  },
  actions: {
    updateStandards(context, standards) {
      context.commit('updateStandards', standards)
    },
  }
}
