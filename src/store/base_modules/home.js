import { db } from '../../services/firebase';

const state = () => ({
  companyInfo: null
});

const mutations = {
  SET_COMPANY: (state, existingCompanyInfo) => {
    state.companyInfo = existingCompanyInfo;
  },

  UPDATE_COMPANY: (state, updateCompanyInfo) => {
    state.companyInfo = updateCompanyInfo;
  }
};

const actions = {
  //====================================================
  //Get companyInfo from firebase collection home
  //====================================================
  async fetchCompanyInfo({ commit, dispatch }) {
    try {
      const home = await db.collection('home').get();

      home.forEach(companyInfo => {
        commit('SET_COMPANY', companyInfo.data());
      });
    } catch (err) {
      dispatch(
        'services/notifications/setStatus',
        { type: 'error', message: err },
        { root: true }
      );
    }
  },

  //====================================================
  //Update companyInfo from firebase collection home
  //====================================================
  updateCompanyInfo({ commit, dispatch }, updateCompanyInfo) {
    db.collection('home')
      .doc(updateCompanyInfo.id)
      .update(updateCompanyInfo)
      .then(() => {
        commit('UPDATE_COMPANY', updateCompanyInfo); //update success status
      })
      .catch(err => {
        dispatch(
          'services/notifications/setStatus',
          { type: 'error', message: err },
          { root: true }
        );
      });
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
