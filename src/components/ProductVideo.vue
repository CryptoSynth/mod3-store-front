<template>
  <video-background
    :src="require('../assets/videos/brownie-rough.mp4')"
    style="height: 84vh; border-radius: 5px"
  >
    <v-row class="fill-height" align="center" no-gutters>
      <v-col cols="12" md="6">
        <v-sheet
          class="d-flex flex-column justify-space-around align-center pa-5 text-center"
          height="500px"
          color="transparent"
        >
          <h1 class="display-3">Company Title</h1>
          <h1 class="display-1">Company Moto</h1>
          <p>ELorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </v-sheet>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </video-background>
</template>

<script>
export default {
  name: 'product-video'
};
</script>

<style lang="css" scoped>
h1,
p {
  color: white;
}
</style>