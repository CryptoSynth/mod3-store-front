<template>
  <div>
    <span>
      <v-app-bar dark app>
        <v-skeleton-loader v-if="isLoading" type="avatar" loading></v-skeleton-loader>
        <h3 v-else>{{companyInfo.title}}</h3>

        <v-spacer></v-spacer>

        <span v-if="userSnipcart">
          <v-btn class="mr-3" color="red" text @click="logout">Logout</v-btn>
        </span>

        <v-btn v-else class="snipcart-customer-signin mr-3" color="pink accent-4">Login</v-btn>

        <v-btn color="pink accent-4" class="snipcart-checkout">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-app-bar>

      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-skeleton-loader type="image" :loading="isLoading">
              <HomeLanding :companyInfo="companyInfo" />
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="3">
            <v-skeleton-loader type="card" :loading="isLoading">
              <ProductCard :product="product" />
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </span>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard';
import HomeLanding from '../components/HomeLanding';
import { mapState } from 'vuex';

export default {
  name: 'Home',

  components: {
    ProductCard,
    HomeLanding
  },

  data: () => ({
    isLoading: true
  }),

  computed: {
    ...mapState({
      products: state => state.products.products,
      userSnipcart: state => state.usersSnipcart.user,
      companyInfo: state => state.home.companyInfo
    })
  },

  methods: {
    logout() {
      this.$store.dispatch('usersSnipcart/logout');
    }
  },

  async created() {
    try {
      await this.$store.dispatch('products/fetchProducts'); //get products
      await this.$store.dispatch('home/fetchCompanyInfo'); //get companyInfo

      this.isLoading = false; //fetches have finished loading
    } catch (err) {
      console.log(err);
    }

    Snipcart.events.on('customer.signedin', customer => {
      this.$store.commit('usersSnipcart/SET_TOKEN', customer.sessionToken);
      this.$store.dispatch('service/usersSnipcart/getUserSession');
    });
  }
};
</script>

<style lang="stylus" scoped></style>
