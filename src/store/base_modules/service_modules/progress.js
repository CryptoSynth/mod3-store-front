const state = () => ({
  isLoading: true
});

const mutations = {
  SET_LOADING_STATUS: (state, loaded) => {
    state.loaded = loaded;
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
