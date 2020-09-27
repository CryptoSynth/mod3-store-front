<template>
  <v-app dark>
    <v-main class="background">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  created() {
    console.log('App created!');
  }
};
</script>

<style scoped>
.background {
  background-color: #7f5a83;
  background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
}
</style>
