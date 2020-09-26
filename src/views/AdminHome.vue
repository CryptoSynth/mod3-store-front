<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card dark>
          <v-card-title>Home Page Edit</v-card-title>
          <v-card-text>
            <v-form ref="homeForm">
              <v-container>
                <v-row align="center" justify="center">
                  <v-col cols="12" md="6">
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

                  <v-col cols="12" md="6">
                    <v-col cols="12">
                      <v-textarea
                        auto-grow
                        color="pink accent-4"
                        outlined
                        label="Company Description"
                        v-model="companyInfo.description"
                      ></v-textarea>
                    </v-col>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green">Update</v-btn>
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

  methods: {},

  computed: {
    ...mapState({
      fileUploaded: state => state.home.fileUploaded,
      loadingValue: state => state.home.loadingValue,
      companyInfo: state => state.home.companyInfo
    })
  }
};
</script>

<style>
</style>