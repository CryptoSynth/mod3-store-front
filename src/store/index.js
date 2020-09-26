import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import products from './modules/products';
import usersSnipcart from './modules/users.snipcart';
import usersFirebase from './modules/users.firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    products,
    usersSnipcart,
    usersFirebase
  }
});
