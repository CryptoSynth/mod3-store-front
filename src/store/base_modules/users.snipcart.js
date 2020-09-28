import { SECRET_API_KEY } from '../../configs/snipcart.config.json';
import axios from 'axios';
import Cookies from 'js-cookie';

//Global axios header
const headers = {
  Authorization: `Basic ${btoa(SECRET_API_KEY)}`,
  Accept: 'application/json'
};

const state = () => ({
  user: null,
  token: null
});

const mutations = {
  SET_TOKEN: (state, session_token) => {
    state.token = session_token;
  },
  CLEAR_TOKEN: () => {
    Cookies.remove('snipcart-customer');
    location.reload();
  },

  SET_USER: (state, user) => (state.user = user)
};

const actions = {
  getUserSession({ commit, state, dispatch }) {
    //if user is currently logged in
    if (state.token) {
      axios
        .get(`https://app.snipcart.com/api/usersessions/${state.token}`, {
          headers
        })
        .then(res => {
          commit('SET_USER', res.data);
        })
        .catch(err => {
          dispatch(
            'services/notifications/setStatus',
            { type: 'error', message: err },
            { root: true }
          );
        });
    } else {
      dispatch(
        'services/notifications/setStatus',
        { type: 'error', message: new Error('User is not signed in!') },
        { root: true }
      );
    }
  },

  logout({ commit }) {
    commit('CLEAR_TOKEN');
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
