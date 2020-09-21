<template>
  <v-hover v-slot:default="{ hover }">
    <v-card d class="mx-auto rounded-xl" dark>
      <v-img :aspect-ratio="13/10" :src="require('../assets/images/macaroons-custom.jpg')">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out pink accent-4 darken-2 v-card--reveal display-1 white--text"
            style="height: 100%;"
          >{{customProduct.name}}</div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-6" style="position: relative;">
        <ProductCustomCardButton :customProduct="customProduct" />
        <h3 class="display-1 font-weight-light pink--text accent-4 mb-2">${{customProduct.price}}</h3>
        <div class="font-weight-light title mb-2">{{customProduct.description}}</div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import ProductCustomCardButton from '../components/ProductCustomCardButton';

export default {
  name: 'product-custom-card',

  data: () => ({
    customProduct: {
      id: 'custom-product-id',
      name: 'Custom Product',
      description: 'This is a custom product description',
      price: '100.00',
      quantity: 100
    }
  }),

  components: {
    ProductCustomCardButton
  }
};
</script>

<style  scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>