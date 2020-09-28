<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-tooltip top>
          <template #activator="{ on }">
            <v-sheet color="transparent">
              <v-btn light x-large fab color="cyan accent-2" v-on="on" @click.stop="dialog = true">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-sheet>
          </template>
          <span>Click Here to Create a Product!</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card dark>
        <v-card-title class="headline">Create Product Menu</v-card-title>
        <v-card-text>
          <v-form ref="productCreateForm">
            <v-row justify="center" align="center">
              <v-col cols="12">
                <v-text-field
                  color="pink accent-4"
                  :rules="nameRule"
                  v-model="name"
                  clearable
                  label="Name"
                  outlined
                  counter="50"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <FormFileUpload
                  :label="'Upload Image'"
                  :loadingValue="loadingValue"
                  :fileUploaded="fileUploaded"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  :rules="descriptionRule"
                  color="pink accent-4"
                  outlined
                  clearable
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
                  v-model="price"
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
                  placeholder="1"
                  v-model="quantity"
                  :rules="quantityRule"
                  clearable
                  label="Quantity"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="createProduct">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormFileUpload from '../components/FormFileUpload';
import { mapState } from 'vuex';

export default {
  name: 'product-create-button',

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
      v =>
        (v && v <= 100000000) || 'Price cannot be greater than $1,000,000.00',
      v => (v && v > 0) || 'Price cannot be less than $0.00'
    ],

    quantity: '',
    quantityRule: [
      v => !!v || 'Quantity is required',
      v => (v && v <= 100000000) || 'Quantity cannot be greater than 1,000,000',
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

    createProduct() {
      const isValid = this.$refs.productCreateForm.validate(); //validate create form

      if (isValid) {
        const newProduct = {
          name: this.name,
          image: this.fileUploaded,
          description: this.description,
          price: this.price,
          quantity: this.quantity
        };

        this.$store.dispatch('products/createProduct', { newProduct });
        this.$refs.productCreateForm.reset(); //reset form

        this.close(); // close dialog

        //reset values after creating product
        this.name = '';
        this.$store.commit('uploads/CLEAR_UPLOADED_FILE');
        this.description = '';
        this.price = '';
        this.quantity = '';
      }
    }
  }
};
</script>

<style>
</style>