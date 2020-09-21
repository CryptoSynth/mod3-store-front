const state = () => ({
  batterType: null,
  frostingType: null,
  brownies: []
});

const mutations = {
  SET_BATTER_SELECTION: (state, selection) => {
    state.batterType = selection;
  },

  SET_FROSTING_SELECTION: (state, selection) => {
    state.frostingType = selection;
  },

  ADD_SELECTION: (state, index) => {
    state.brownies.push({
      id: `brownie-${index + 1}`,
      batterType: state.batterType.name,
      frostingType: state.frostingType.name
    });
  },

  UPDATE_SELECTION: (state, index) => {
    state.brownies.splice(index, 1, {
      id: `brownie-${index + 1}`,
      batterType: state.batterType.name,
      frostingType: state.frostingType.name
    });
  },

  CLEAR_SELECTION: (state, index) => {
    const current_id = `brownie-${index + 1}`;

    let selection = state.brownies.find(brownie => {
      return brownie.id === current_id;
    });

    state.brownies.splice(index, 1, {
      id: selection.id,
      batterType: '',
      frostingType: ''
    });
  }
};

const actions = {
  setSelection({ commit }, selection) {
    //if the selection type is BATTER than proceed to set selection
    if (selection.type === 'batter') {
      commit('SET_BATTER_SELECTION', selection);
    }

    //if the selection type is FROSTING than proceed to set selection
    if (selection.type === 'frosting') {
      commit('SET_FROSTING_SELECTION', selection);
    }
  },

  addSelection({ commit, state }, index) {
    const current_id = `brownie-${index + 1}`;

    const selection = state.brownies.find(brownie => {
      return brownie.id === current_id;
    });

    if (selection) {
      commit('UPDATE_SELECTION', index);
    } else {
      commit('ADD_SELECTION', index);
    }
  },

  clearSelection({ commit }, index) {
    commit('CLEAR_SELECTION', index);
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
