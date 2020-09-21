  <template>
  <div>
    <v-app-bar app clipped-left dark color="pink accent-4">
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <AdminUserMenu />
    </v-app-bar>

    <v-navigation-drawer app clipped v-model="toggle" dark color="dark" floating>
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
          <v-btn color="pink accent-3" to="/" block>Store</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <router-view></router-view>

    <v-snackbar v-model="product_status.active" bottom :color="product_status.color">
      {{ product_status.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="red "
          class="ml-3"
          dark
          text
          fab
          @click="product_status.active = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AdminUserMenu from '../components/AdminUserMenu';

export default {
  name: 'admin-dashboard',

  components: {
    AdminUserMenu
  },

  data: () => ({
    toggle: true,

    items: [
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
      product_status: state => state.products.product_status
    })
  },

  methods: {
    toggleMenu() {
      this.toggle = !this.toggle;
    }
  }
};
</script>

<style>
</style>