import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; //Vuesax styles
import { Plugin } from 'vue-responsive-video-background-player';
import VuetifyMoney from 'vuetify-money';
import { auth } from './services/firebase';

Vue.use(VuetifyMoney);
Vue.use(Plugin);
Vue.use(Vuesax);

Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});
