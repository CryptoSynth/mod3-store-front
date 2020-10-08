<template>
  <v-snackbar
    :timeout="-1"
    v-model="status.active"
    bottom
    :color="status.color"
  >
    {{ status.msg }}
    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" class="ml-3" x-small dark fab @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'notification',

  props: {
    status: {
      type: Object,
      default: () => {
        return {
          msg: null,
          color: null,
          active: false
        };
      }
    }
  },

  methods: {
    close() {
      this.status.active = false;
    }
  }
};
</script>

<style></style>
