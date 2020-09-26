<template>
  <v-container fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card dark>
          <v-card-title>Home Page Edit</v-card-title>
          <v-card-text>
            <v-form ref="homeForm">
              <v-row class="fill-height" align="center" justify="center">
                <v-col cols="12" md="5">
                  <v-row align="center" justify="center">
                    <v-col cols="12">
                      <v-text-field
                        color="pink accent-4"
                        outlined
                        label="Company Title"
                        v-model="companyInfo.title"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        color="pink accent-4"
                        outlined
                        label="Company Subtitle"
                        v-model="companyInfo.subtitle"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <FormFileUpload
                        :label="'Upload Video'"
                        :loadingValue="loadingValue"
                        :fileUploaded="fileUploaded"
                      />
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" md="7">
                  <v-textarea
                    rows="10"
                    color="pink accent-4"
                    outlined
                    label="Company Description"
                    v-model="companyInfo.description"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" @click="updateCompanyInfo">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar :timeout="-1" v-model="status.active" bottom :color="status.color">
      {{ status.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" class="ml-3" x-small dark fab @click="status.active = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import FormFileUpload from '../components/FormFileUpload';
import { mapState } from 'vuex';

export default {
  name: 'admin-dashboard-home',

  components: {
    FormFileUpload
  },

  computed: {
    ...mapState({
      fileUploaded: state => state.home.fileUploaded,
      loadingValue: state => state.home.loadingValue,
      companyInfo: state => state.home.companyInfo,
      status: state => state.products.status
    })
  },

  methods: {
    updateCompanyInfo() {
      console.log(this.companyInfo);

      this.$store.dispatch('home/updateCompanyInfo', this.companyInfo);
    }
  },

  created() {
    this.$store.dispatch('home/fetchCompanyInfo'); //get companyInfo
  }
};
</script>

<style>
</style>