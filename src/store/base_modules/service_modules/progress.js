const state = () => ({
  loadingValue: -1
});

const mutations = {
  SET_LOADING_STATUS: (state, loadingValue) => {
    state.loadingValue = loadingValue;
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
