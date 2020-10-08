<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <h1 class="display-4 text-center pink--text text--accent-4">404</h1>

        <h3 class="display-2 text-center white--text">
          This page does not exist
        </h3>
      </v-col>

      <v-col class="text-center" cols="12">
        <v-btn to="/" fab dark color="pink accent-4">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'page-not-found'
};
</script>

<style></style>
