<template>
  <v-expansion-panel :readonly="isComplete">
    <v-expansion-panel-header :disable-icon-rotate="isComplete">
      <template #default="{open}">
        <v-row align="center">
          <v-col cols="4">Brownie #{{item}}</v-col>

          <v-col cols="8">
            <span v-if="open">Select a Batter & Frosting type:</span>
            <span v-else>Edit Batter & Frosting type</span>
          </v-col>
        </v-row>
      </template>

      <template #actions>
        <v-icon v-if="isComplete" color="green accent-4" @click="editSelection">mdi-pencil</v-icon>
        <v-icon v-else>$expand</v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import ProductCustomCardButtonSelect from '../components/ProductCustomCardButtonSelect';

export default {
  name: 'product-custom-card-button-expansion-panel',

  props: {
    iteration: {
      type: Number
    },
    item: {
      type: Number
    }
  },

  components: {
    ProductCustomCardButtonSelect
  },

  data: () => ({
    isComplete: false,

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
        this.isComplete = true;
        this.$emit('updatePanel', { index, isComplete: this.isComplete });
      } else {
        console.log('Please select the required options');
      }
    },

    editSelection(index) {
      this.isComplete = false;
      this.$emit('updatePanel', { index, isComplete: this.isComplete });
    }
  }
};
</script>

<style>
</style>