<template>
  <v-row align="center" justify="center">
    <!-- File Preview-->
    <v-col
      v-if="fileUploaded || existingFile.url"
      class="text-center"
      cols="12"
    >
      <v-card flat color="transparent" height="300" max-height="300">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="12" sm="10">
                <v-img
                  max-height="300"
                  class="rounded-lg elevation-8"
                  :src="existingFile.url || fileUploaded"
                ></v-img>
              </v-col>
              <v-col class="text-center" cols="12" sm="2">
                <v-btn
                  class="mt-5"
                  @click="clearPreviewFile"
                  color="red accent-4"
                  fab
                  dark
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <!--File Upload Field-->
    <v-col v-else class="text-center" cols="12">
      <v-file-input
        v-model="file"
        v-if="!isLoading"
        color="pink accent-4"
        :label="label"
        prepend-icon
        prepend-inner-icon="mdi-upload"
        @change="previewFile"
        outlined
        :rules="fileRule"
      >
        <template #selection="{text}">
          <v-chip small label color="pink accent-4">{{ text }}</v-chip>
        </template>
      </v-file-input>

      <v-progress-circular
        v-else
        indeterminate
        color="pink accent-4"
      ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'admin-file-upload',
  props: ['fileUploaded', 'label', 'existingFile', 'isLoading', 'product'],
  // props: {
  //   loadingValue: {
  //     type: Number
  //   },
  //   label: {
  //     type: String
  //   },
  //   existingFile: {
  //     type: Object,
  //     default: () => {
  //       return {
  //         name: null,
  //         type: null,
  //         url: null
  //       };
  //     }
  //   },
  //   fileUploaded: {
  //     type: Object
  //   },
  //   product: {
  //     type: Object
  //   }
  // },

  data: () => ({
    file: null,
    fileRule: [v => !!v || 'File is required']
  }),

  computed: {
    ...mapState({
      filePreview: state => state.services.uploads.filePreview
    })
  },

  methods: {
    previewFile() {
      this.$store.dispatch('services/uploads/previewFile', this.file);
    },

    clearPreviewFile() {
      this.$store.dispatch('services/uploads/clearPreviewFile');
    },

    uploadFile() {
      if (this.file) {
        this.$store.dispatch('services/uploads/uploadFile', this.file);
        this.file = null;
      }
    },

    deleteFile() {
      const fileToUpload = this.file || this.existingFile;

      this.$store.dispatch('services/uploads/deleteFile', {
        file: fileToUpload,
        product: this.product
      });

      this.file = null;
      this.existingFile.url = null;
    }
  }
};
</script>

<style>
</style>