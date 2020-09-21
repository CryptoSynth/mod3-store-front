<template>
  <v-form v-model="valid" ref="form">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <ProductCustomCardButtonSelect
          :label="'Batter Type'"
          :items="batters"
          :iteration="iteration"
          :key="`${iteration}-batter`"
        />
        <ProductCustomCardButtonSelect
          :label="'Frosting Type'"
          :items="frostings"
          :iteration="iteration"
          :key="`${iteration}-frosting`"
        />
        <v-btn
          color="pink accent-4"
          :disabled="!valid"
          @click="addSelection(iteration)"
        >Add Selection</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import ProductCustomCardButtonSelect from '../components/ProductCustomCardButtonSelect';

export default {
  name: 'product-custom-card-button-form',

  props: {
    iteration: {
      type: Number
    }
  },

  components: {
    ProductCustomCardButtonSelect
  },

  data: () => ({
    valid: false,

    batters: [
      {
        type: 'batter',
        name: 'chocolate',
        image: 'chocolate-batter.jpg'
      },
      {
        type: 'batter',
        name: 'strawberry',
        image: 'strawberry-batter.jpg'
      },
      {
        type: 'batter',
        name: 'vanilla',
        image: 'vanilla-batter.jpg'
      }
    ],

    frostings: [
      {
        type: 'frosting',
        name: 'chocolate',
        image: 'chocolate-frosting.jpg'
      },
      {
        type: 'frosting',
        name: 'strawberry',
        image: 'strawberry-frosting.jpg'
      },
      {
        type: 'frosting',
        name: 'vanilla',
        image: 'vanilla-frosting.jpg'
      }
    ]
  }),

  methods: {
    addSelection(index) {
      const isValid = this.$refs.form.validate();

      if (isValid) {
        this.$store.dispatch('customProducts/addSelection', index);
        this.$emit('isComplete', true);
      } else {
        console.log('Please select the required options');
      }
    }
  }
};
</script>

<style>
</style>