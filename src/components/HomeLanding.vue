<template>
  <video-background
    :src="require('../assets/videos/brownie-rough.mp4')"
    style="height: 85vh; border-radius: 5px"
    overlay="rgba(0, 0, 0, .3)"
  >
    <v-row class="fill-height" align="center" no-gutters>
      <v-col cols="12" md="6">
        <v-sheet
          dark
          class="d-flex flex-column justify-space-around align-center pa-5 text-left"
          height="500px"
          color="transparent"
        >
          <h1 class="display-3">{{ companyInfo.title }}</h1>
          <h2 class="display-2">{{ companyInfo.subtitle }}</h2>
          <h2>{{ companyInfo.description }}</h2>
        </v-sheet>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </video-background>
</template>

<script>
export default {
  name: 'home-landing',

  props: {
    companyInfo: {
      id: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: null
      },
      subtitle: {
        type: String,
        default: null
      },
      file: {
        type: Object,
        default: function() {
          return {
            name: null,
            type: null,
            url: null
          };
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
h1,
p {
  color: white;
}
</style>
