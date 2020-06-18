export default {
  namespaced: true,
  state: {
    brands: []
  },
  mutations: {
    updateBrands(state, brands) {
      state.brands = brands
    },
  },
  actions: {
    updateBrands(context, brands) {
      context.commit('updateBrands', brands)
    },
  }
}
