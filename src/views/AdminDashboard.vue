  <template>
  <div>
    <v-app-bar app clipped-left dark color="pink accent-4">
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer bottom app clipped v-model="toggle" dark color="dark" floating>
      <v-list nav dense>
        <v-tooltip right v-for="item in items" :key="item.title">
          <template v-slot:activator="{on}">
            <v-list-item :to="item.to" v-on="on">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{item.tooltip}}</span>
        </v-tooltip>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="pink accent-3" @click="signout" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <router-view></router-view>
    <v-snackbar :timeout="-1" v-model="status.active" bottom :color="status.color">
      {{ status.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" class="ml-3" x-small dark fab @click="status.active = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'admin-dashboard',

  data: () => ({
    toggle: false,

    items: [
      {
        title: 'Home',
        icon: 'mdi-home',
        to: '/admin-dashboard/home',
        tooltip: 'Edit your homepage'
      },
      {
        title: 'Products',
        icon: 'mdi-package',
        to: '/admin-dashboard/products',
        tooltip: 'Create, Edit, and Delete your products'
      }
    ]
  }),

  computed: {
    ...mapState({
      status: state => state.products.status
    })
  },

  methods: {
    toggleMenu() {
      this.toggle = !this.toggle;
    },

    signout() {
      this.$store.dispatch('usersFirebase/signout');
    }
  }
};
</script>

<style>
</style>