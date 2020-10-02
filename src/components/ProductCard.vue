<template>
  <v-hover v-slot:default="{ hover }">
    <v-card d class="mx-auto rounded-xl" dark>
      <v-img
        :aspect-ratio="13 / 10"
        :src="product.image.url || require('../assets/images/no-image-box.png')"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out pink accent-4 darken-2 v-card--reveal display-1 white--text"
            style="height: 100%;"
          >
            {{ product.name }}
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-6" style="position: relative;">
        <v-btn
          class="white--text snipcart-add-item"
          :data-item-id="product.id"
          :data-item-price="parseInt(product.price)"
          data-item-url="/"
          :data-item-description="product.description"
          :data-item-image="product.image.url"
          :data-item-name="product.name"
          absolute
          color="pink accent-4"
          fab
          large
          right
          top
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <h3 class="display-1 font-weight-light pink--text accent-4 mb-2">
          ${{ product.price }}
        </h3>
        <div class="font-weight-light title mb-2">
          {{ product.description }}
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'product-card',

  props: {
    product: {
      id: {
        type: String
      },
      name: {
        type: String
      },
      image: {
        type: Object
      },
      description: {
        type: String
      },
      price: {
        type: String
      },
      quantity: {
        type: String
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
