<template>
  <div>
    <v-app-bar app dark>
      COMPANY LOGO HERE
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
      <div>
        <v-row>
          <v-col>
            <ProductVideo />
          </v-col>
        </v-row>

        <v-container fluid>
          <v-row justify="center">
            <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="4" lg="3">
              <ProductCard :product="product" />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard';
import ProductVideo from '../components/ProductVideo';
import { mapState } from 'vuex';

export default {
  name: 'Home',

  components: {
    ProductCard,
    ProductVideo
  },

  computed: {
    ...mapState({
      products: state => state.products.products,
      userSnipcart: state => state.usersSnipcart.user
    })
  },

  methods: {
    logout() {
      this.$store.dispatch('usersSnipcart/logout');
    }
  },

  created() {
    this.$store.dispatch('products/fetchProducts');

    // Snipcart.events.on('customer.signedin', customer => {
    //   this.$store.commit('usersSnipcart/SET_TOKEN', customer.sessionToken);
    //   this.$store.dispatch('usersSnipcart/getUserSession');
    // });
  }
};
</script>
