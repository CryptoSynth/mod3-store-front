import { auth } from '../../services/firebase';
import router from '../../router/index';

const state = () => ({
  user: null
});

const mutations = {
  SET_USER: (state, user) => (state.user = user),

  CLEAR_USER: state => (state.user = null)
};

const actions = {
  login({ commit }, payload) {
    const { email, password } = payload;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        commit('SET_USER', res.user);
        router.push('/admin-dashboard');
      })
      .catch(err => {
        const { code, message } = err;
        console.log(`${code}: ${message}`);
      });
  },

  signout({ commit }) {
    auth
      .signOut()
      .then(() => {
        commit('CLEAR_USER');
        router.push('/admin-login');
      })
      .catch(err => {
        const { code, message } = err;
        console.log(`${code}: ${message}`);
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
