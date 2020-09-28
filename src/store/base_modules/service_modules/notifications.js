//ENUM status
const STATUS = {
  //ERROR status
  ERROR: err => {
    console.log(err);
    return {
      msg: `
           Code: ${err.code || '0'}
           \nMessage: ${err.message ||
             err.msg ||
             'There seems to be an error, please try again.'} 
          
          `,
      color: 'error',
      active: true
    };
  },

  //SUCCESS status
  SUCCESS: msg => {
    return {
      msg: `${msg}`,
      color: 'success',
      active: true
    };
  }
};

const state = () => ({
  status: null
});

const mutations = {
  SET_STATUS: (state, message) => {
    console.log(message);
    state.status = message;
  }
};

const actions = {
  //====================================================
  //Set notifications from everypoint in our application that gives a success and error message
  //====================================================
  setStatus({ commit }, status) {
    if (status.type === 'error') {
      commit('SET_STATUS', STATUS.ERROR(status.message));
    } else {
      commit('SET_STATUS', STATUS.SUCCESS(status.message));
    }
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
