<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12" sm="9" md="6" lg="5">
        <v-card
          dark
          elevation="20"
          class="rounded-xl d-flex flex-column align-center justify-space-around"
          min-height="500"
        >
          <v-card-title>
            <h1 class="display-2 text-uppercase">Admin Login</h1>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-form ref="adminForm">
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <v-text-field
                      clearable
                      v-model="email"
                      :rules="emailRule"
                      type="text"
                      label="Email"
                      outlined
                      color="pink accent-4"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :rules="passwordRule"
                      :type="show ? 'text' : 'password'"
                      label="Password"
                      outlined
                      color="pink accent-4"
                      :append-icon="show ? 'mdi-eye': 'mdi-eye-off'"
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-btn large @click="login" color="pink accent-4">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'admin-login',

  data: () => ({
    show: false,

    email: '',
    emailRule: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],

    password: '',
    passwordRule: [
      v => !!v || 'Password is required',
      v => (v && v.length > 8) || 'Password must be greater than 8 characters'
    ]
  }),

  methods: {
    login() {
      const isValid = this.$refs.adminForm.validate();

      if (isValid) {
        this.$store.dispatch('usersFirebase/login', {
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>

<style>
</style>