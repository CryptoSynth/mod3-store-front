const state = () => ({
  company: {}
});

const mutations = {
  SET_COMPANY: (state, company) => {
    state.company = company;
  }
};

const actions = {
  fetchCompany({ commit }, company) {
    commit('SET_COMPANY', company);
  },
  setCompany({ commit }, company) {
    commit('SET_COMPANY', company);
  },
  updateCompany({ commit }, company) {
    commit('SET_COMPANY', company);
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
