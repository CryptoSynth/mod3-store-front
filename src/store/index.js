import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import usersSnipcart from './modules/users.snipcart';
import usersFirebase from './modules/users.firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    usersSnipcart,
    usersFirebase
  }
});
