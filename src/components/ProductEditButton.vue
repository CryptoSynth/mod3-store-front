<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn class="mr-3" fab dark color="primary" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card dark>
      <v-card-title class="headline">{{ product.name }} Menu</v-card-title>
      <v-card-text>
        <v-form ref="productEditForm">
          <v-row justify="center" align="center">
            <v-col cols="12">
              <v-text-field
                color="pink accent-4"
                v-model="product.name"
                :rules="nameRule"
                clearable
                label="Name"
                single-line
                outlined
                counter="50"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <FormFileUpload
                :label="'Upload Image'"
                :loadingValue="loadingValue"
                :existingFile="product.image"
                :fileUploaded="fileUploaded"
                :product="product"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="product.description"
                :rules="descriptionRule"
                color="pink accent-4"
                clearable
                outlined
                auto-grow
                label="Product Description"
                rows="4"
                row-height="30"
                counter="255"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <vuetify-money
                backgroundColor="dark"
                v-model="product.price"
                :rules="priceRule"
                :label="'Price'"
                :placeholder="'0.00'"
                :outlined="true"
                :clearable="true"
                :options="options"
              ></vuetify-money>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="pink accent-4"
                v-model="product.quantity"
                :rules="quantityRule"
                clearable
                label="Quantity"
                single-line
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="updateProduct(product)"
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import FormFileUpload from '../components/FormFileUpload';

export default {
  name: 'product-edit-button',

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

  components: {
    FormFileUpload
  },

  data: () => ({
    dialog: false,

    name: '',
    nameRule: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 50) || 'Name cannot be greater than 50 characters',
      v => (v && v.length >= 5) || 'Name cannot be less than 5 characters'
    ],

    description: '',
    descriptionRule: [
      v => !!v || 'Description is required',
      v =>
        (v && v.length <= 255) ||
        'Description cannot be greater than 255 characters',
      v =>
        (v && v.length >= 5) || 'Description cannot be less than 5 characters'
    ],

    price: '',
    priceRule: [
      v => !!v || 'Price is required',
      v => {
        return (
          (v && v <= 100000) || 'Price cannot be greater than $1,000,000.00'
        );
      },

      v => (v && v > 0) || 'Price cannot be less than $0.00'
    ],

    quantity: '',
    quantityRule: [
      v => !!v || 'Quantity is required',
      v => (v && v <= 1000000) || 'Quantity cannot be greater than 1,000,000',
      v => (v && v >= 1) || 'Quantity cannot be less than 1'
    ],

    options: {
      locale: 'en-US',
      prefix: '$',
      precision: 2
    }
  }),

  computed: {
    ...mapState({
      fileUploaded: state => state.services.uploads.fileUploaded,
      loadingValue: state => state.services.progress.loadingValue
    })
  },

  methods: {
    close() {
      this.dialog = false;
    },

    updateProduct(current_product) {
      const isValid = this.$refs.productEditForm.validate(); //validate edit form

      const updateProduct = {
        id: current_product.id,
        name: current_product.name,
        image: this.fileUploaded || current_product.image,
        description: current_product.description,
        price: current_product.price,
        quantity: current_product.quantity
      };

      if (isValid) {
        this.$store.dispatch('products/updateProduct', updateProduct);

        this.dialog = false; // close dialog
      }
    }
  }
};
</script>

<style>
</style>