<template>
  <v-row align="center" justify="space-between" no>
    <v-overlay v-show="isLoading" absolute>
      <div class="d-flex flex-column align-center justify-center">
        <v-progress-circular
          class="mb-5"
          indeterminate
          size="70"
          width="5"
          color="pink accent-4"
        ></v-progress-circular>
        <h1 class="mt-5  pink--text text--accent-4">
          Image Uploading...
        </h1>
      </div>
    </v-overlay>

    <!-- File Preview-->
    <v-col
      v-if="filePreview || existing.image.url"
      class="text-center"
      cols="12"
    >
      <v-card flat color="transparent" height="300" max-height="300">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="12">
                <v-img
                  max-height="300"
                  class="rounded-lg elevation-8"
                  :src="!existing.image.url ? filePreview : existing.image.url"
                >
                  <div class="d-flex align-start justify-end absolute">
                    <div class=" d-flex align-center justify-center">
                      <v-btn
                        v-if="!isStored"
                        :disabled="!!fileUploaded"
                        @click="uploadFile"
                        class="ma-3"
                        fab
                        small
                        color="success"
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-btn>

                      <v-btn
                        v-if="existing.image.url"
                        @click="deleteFile"
                        class="ma-3"
                        fab
                        small
                        color="red"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>

                      <v-btn
                        v-else
                        @click="clearPreviewFile"
                        class="ma-3"
                        fab
                        small
                        color="red"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </div></v-img
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <!--File Upload Field-->
    <v-col v-else cols="12">
      <v-file-input
        v-if="!isLoading"
        v-model="file"
        color="pink accent-4"
        :label="label"
        @change="previewFile"
        outlined
        prepend-inner-icon="mdi-upload"
        prepend-icon=""
        :rules="fileRule"
        accept="image/*"
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

  props: {
    label: {
      type: String
    },
    existing: {
      type: Object,
      default: () => {
        return {
          image: {
            name: null,
            type: null,
            url: null
          }
        };
      }
    },
    fileUploaded: {
      type: Object
    },
    product: {
      type: Object
    }
  },

  data: () => ({
    file: null,
    fileRule: [v => !!v || 'File is required']
  }),

  computed: {
    ...mapState({
      filePreview: state => state.services.uploads.filePreview,
      isLoading: state => state.services.progress.isLoading,
      isStored: state => state.services.uploads.isStored
    })
  },

  methods: {
    previewFile() {
      this.$store.dispatch('services/uploads/previewFile', this.file);
      this.$store.dispatch('services/uploads/checkFile', this.file);
    },

    clearPreviewFile() {
      this.$store.dispatch('services/uploads/clearPreviewFile');
      this.file = null;
    },

    uploadFile() {
      this.$store.dispatch('services/uploads/uploadFile', this.file);
      this.file = null;
    },

    deleteFile() {
      this.$store.dispatch('services/uploads/deleteFile', this.existing);
      this.existing.image.url = null;
    }
  },

  created() {
    console.log(!this.fileUploaded);
    if (this.existing.image.url) {
      this.$store.dispatch('services/uploads/checkFile', this.existing.image);
    }
  }
};
</script>

<style>
</style>