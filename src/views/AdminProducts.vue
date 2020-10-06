<template>
  <v-data-iterator
    :items="products"
    :items-per-page.sync="productsPerPage"
    hide-default-footer
  >
    <template v-slot:default="props">
      <v-container>
        <v-row align="center" justify="start">
          <v-col
            v-for="(product, index) in props.items"
            :key="index"
            cols="12"
            sm="6"
            md="3"
            lg="4"
          >
            <v-skeleton-loader :loading="isLoading" type="card">
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto rounded-xl" dark max-width="400">
                  <v-img
                    :aspect-ratio="16 / 9"
                    :src="
                      product.image.url ||
                        require('../assets/images/no-image-box.png')
                    "
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
                    <h3
                      class="display-1 font-weight-light pink--text accent-4 mb-2"
                    >
                      ${{ product.price }}
                    </h3>
                    <div class="font-weight-light title mb-2">
                      {{ product.description }}
                    </div>
                  </v-card-text>

                  <v-card-actions class="pb-3 pr-3">
                    <v-spacer></v-spacer>
                    <ProductEditButton :product="product" />
                    <ProductDeleteButton :product="product" />
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-skeleton-loader>
          </v-col>
          <v-col cols="12" sm="6" md="3" lg="4">
            <v-sheet
              color="transparent"
              class="rounded-xl d-flex flex-column align-center justify-center"
              height="350"
            >
              <ProductCreateButton />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-slot:no-data>
      <v-col cols="12" sm="6" md="3" lg="4">
        <v-sheet
          color="transparent"
          class="rounded-xl d-flex flex-column align-center justify-center"
          height="350"
        >
          <ProductCreateButton />
        </v-sheet>
      </v-col>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapState } from 'vuex';
import ProductEditButton from '../components/ProductEditButton';
import ProductCreateButton from '../components/ProductCreateButton';
import ProductDeleteButton from '../components/ProductDeleteButton';

export default {
  name: 'admin-dashboard-products',

  components: {
    ProductEditButton,
    ProductCreateButton,
    ProductDeleteButton
  },

  data: () => ({
    productsPerPage: 10,

    isLoading: true
  }),

  computed: {
    ...mapState({
      products: state => state.products.products
    })
  },

  async created() {
    try {
      await this.$store.dispatch('products/fetchProducts'); //get products

      this.isLoading = false; //fetches have finished loading
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

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