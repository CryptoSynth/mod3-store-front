<template>
  <v-dialog dark v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn fab dark color="red" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete Product</v-card-title>
      <v-card-text
        >Are you sure you want to delete {{ product.name }}?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark color="primary" text @click="close">Cancel</v-btn>
        <v-btn dark color="red" @click="deleteProduct(product)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'product-delete-button',

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
        type: Number
      }
    }
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    close() {
      this.dialog = false;
    },

    deleteProduct(product) {
      this.$store.dispatch('products/deleteProduct', product);
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>