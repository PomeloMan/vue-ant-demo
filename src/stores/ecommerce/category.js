export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    updateCategories(state, categories) {
      state.categories = categories
    },
  },
  actions: {
    updateCategories(context, categories) {
      context.commit('updateCategories', categories)
    },
  }
}
