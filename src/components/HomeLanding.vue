<template>
  <video-background
    :src="require('../assets/videos/brownie-rough.mp4')"
    style="height: 85vh; border-radius: 5px"
  >
    <v-row class="fill-height" align="center" no-gutters>
      <v-col cols="12" md="6">
        <v-sheet
          dark
          class="d-flex flex-column justify-space-around align-center pa-5 text-left"
          height="500px"
          color="transparent"
        >
          <h1 class="display-3">{{company.title}}</h1>
          <h1 class="display-1">{{company.subtitle}}</h1>
          <p>{{company.description}}</p>
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
    company: {
      type: Object,
      default: () => {
        return {
          title: 'My Company Title',
          subtitle: 'My Company Subtitle',
          description: 'My Company description'
        };
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