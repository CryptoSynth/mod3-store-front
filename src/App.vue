<template>
  <v-app dark>
    <v-main class="background">
      <v-system-bar
        v-if="env === 'development'"
        class="text-center"
        dark
        app
        color="black"
        height="30"
      >
        <h2 class="green--text">
          Currently in
          <span class="text-capitalize">
            {{ env }}
          </span>
          mode
        </h2>
      </v-system-bar>

      <router-view></router-view>

      <Notification v-if="status" :status="status" />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Notification from './components/Notification';

export default {
  name: 'App',

  components: {
    Notification
  },

  computed: {
    ...mapState({
      status: state => state.services.notifications.status
    }),

    env() {
      return process.env.NODE_ENV;
    }
  }
};
</script>

<style scoped>
.background {
  background-color: #7f5a83;
  background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
}
</style>
