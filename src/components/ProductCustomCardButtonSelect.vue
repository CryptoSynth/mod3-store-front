<template>
  <v-select
    light
    v-model="select"
    :items="items"
    item-text="name"
    :item-value="`brownie-${iteration}`"
    chips
    :label="label"
    solo
    color="pink accent-4"
    return-object
    :rules="selectionRule"
  >
    <template #selection="{item}">
      <v-chip dark color="pink accent-4">
        <v-avatar left>
          <v-img :src="require(`../assets/images/${item.image}`)"></v-img>
        </v-avatar>
        {{item.name}}
      </v-chip>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'product-custom-card-button-select',

  props: {
    items: {
      type: Array
    },
    label: {
      type: String
    },
    iteration: {
      type: Number
    }
  },

  data: () => ({
    select: null,
    selectionRule: [v => !!v || `Selection is required`]
  }),

  watch: {
    select: function(selection) {
      this.$store.dispatch('customProducts/setSelection', {
        id: `brownie-${this.iteration}-${selection.type}`,
        ...selection
      });
    }
  }
};
</script>

<style>
</style>