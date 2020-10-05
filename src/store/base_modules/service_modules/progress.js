const state = () => ({
  isLoading: false
});

const mutations = {
  SET_LOADING_STATUS: (state, value) => {
    state.isLoading = value;
  }
};

const actions = {
  setProgress({ commit }, value) {
    commit('SET_LOADING_STATUS', value); //image loading
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
