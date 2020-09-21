<template>
  <v-dialog persistent max-width="600" v-model="dialog">
    <template #activator="{on}">
      <v-btn v-on="on" absolute fab large right top color="indigo accent-4">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card light>
      <v-card-title>Custom Product Customization</v-card-title>

      <v-card-text>
        <v-expansion-panels multiple v-model="panel" inset focusable dark>
          <ProductCustomCardButtonExpansionPanel
            v-for="(item, i) in 6"
            :key="`brownie-expansion-panel-${i}`"
            :iteration="i"
            :item="item"
            @updatePanel="updatePanel"
          />
        </v-expansion-panels>
      </v-card-text>

      <v-container>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">{{brownies}}</v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="red darken-1" @click="close">Cancel</v-btn>
        <v-btn
          color="pink accent-4"
          dark
          @click="addToCart"
          class="snipcart-add-item"
          :data-item-id="customProduct.id"
          :data-item-price="customProduct.price"
          data-item-url="/"
          :data-item-description="customProduct.description"
          data-item-image="../assets/images/macaroons-custom.jpg"
          :data-item-name="customProduct.name"
          data-item-custom1-name="Brownie 1"
          data-item-custom1-options="chocolate-frosting|strawberry-frosting|vanilla-frosting"
          data-item-custom2-name="Brownie 2"
          data-item-custom2-options="chocolate|strawberry|vanilla"
          data-item-custom3-name="Brownie 3"
          data-item-custom3-options="chocolate|strawberry|vanilla"
          data-item-custom4-name="Brownie 4"
          data-item-custom4-options="chocolate|strawberry|vanilla"
          data-item-custom5-name="Brownie 5"
          data-item-custom5-options="chocolate|strawberry|vanilla"
          data-item-custom6-name="Brownie 6"
          data-item-custom6-options="chocolate|strawberry|vanilla"
        >Add to cart</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ProductCustomCardButtonExpansionPanel from '../components/ProductCustomCardButtonExpansionPanel';
import { mapState } from 'vuex';

export default {
  name: 'product-custom-card-button',

  props: {
    customProduct: {
      id: {
        type: String
      },
      name: {
        type: String
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
  },

  components: {
    ProductCustomCardButtonExpansionPanel
  },

  data: () => ({
    dialog: false,

    panel: []
  }),

  computed: {
    ...mapState({
      brownies: state => state.customProducts.brownies
    })
  },

  methods: {
    close() {
      this.dialog = false;
    },

    updatePanel(payload) {
      const { index, isComplete } = payload;

      // console.log(payload);

      if (isComplete) {
        this.panel.splice(0, 1); // close current panel
        this.panel.push(index + 1); //open next panel
      } else {
        this.panel.splice(0, 1); //close current panel
      }
    },

    addToCart() {
      //add to snipcart via event
      console.log('added to cart');
      this.dialog = false;
      // if (this.brownies.length === 6) {

      // } else {
      //   console.log('Need to select all brownies, before adding to cart!');
      // }
    }
  },

  watch: {
    panel: function(value) {
      value;
    }
  }
};
</script>

<style>
</style>