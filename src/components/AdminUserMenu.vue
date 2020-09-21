<template>
  <v-menu nudge-bottom="5px" rounded="b-xl" offset-y>
    <template #activator="{on }">
      <v-btn large v-on="on" light class="ma-2" color="white">
        <v-avatar size="35px" left>
          <v-img :src="require('../assets/images/user_image.png')"></v-img>
        </v-avatar>
        <span class="ml-3">My Account</span>
      </v-btn>
    </template>

    <v-list nav dense>
      <v-list-item link to="/profile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="signout">
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'Profile',
        icon: 'mdi-account'
      },
      {
        title: 'Logout',
        icon: 'mdi-exit-to-app'
      }
    ]
  }),

  methods: {
    signout() {
      this.$store.dispatch('usersFirebase/signout');
    }
  }
};
</script>

<style>
</style>