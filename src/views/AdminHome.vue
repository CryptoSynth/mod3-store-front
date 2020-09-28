<template>
  <v-container fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="8">
        <v-skeleton-loader v-if="isLoading" type="card, actions" loading></v-skeleton-loader>

        <v-card v-else dark>
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

  data: () => ({
    isLoading: true
  }),

  computed: {
    ...mapState({
      fileUploaded: state => state.home.fileUploaded,
      loadingValue: state => state.home.loadingValue,
      companyInfo: state => state.home.companyInfo
    })
  },

  methods: {
    updateCompanyInfo() {
      this.$store.dispatch('home/updateCompanyInfo', this.companyInfo);
    }
  },

  async created() {
    try {
      await this.$store.dispatch('home/fetchCompanyInfo'); //get companyInfo
      this.isLoading = false; //fetches have finished loading
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
</style>