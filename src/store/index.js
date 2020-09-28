import Vue from 'vue';
import Vuex from 'vuex';
import home from './base_modules/home';
import products from './base_modules/products';
import usersSnipcart from './base_modules/users.snipcart';
import usersFirebase from './base_modules/users.firebase';
import services from './base_modules/services';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    products,
    usersSnipcart,
    usersFirebase,
    services
  }
});
