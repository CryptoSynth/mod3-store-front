<template>
  <v-row align="center" justify="center">
    <!--File Preview-->

    <v-col v-if="fileUploaded || existingFile.url" class="text-center" cols="12">
      <v-card flat color="transparent" max-height="300">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="12" sm="10">
                <v-img
                  max-height="300"
                  class="rounded-lg elevation-8"
                  :src="existingFile.url || fileUploaded.url"
                ></v-img>
              </v-col>
              <v-col class="text-center" cols="12" sm="2">
                <v-btn class="mt-5" @click="deleteFile" color="red accent-4" fab dark>
                  <v-icon>mdi-delete</v-icon>
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
        v-if="loadingValue < 0"
        v-model="file"
        color="pink accent-4"
        label="Upload Image"
        prepend-icon
        prepend-inner-icon="mdi-upload"
        @change="uploadFile"
        outlined
        :rules="fileRule"
      >
        <template #selection="{text}">
          <v-chip small label color="pink accent-4">{{text}}</v-chip>
        </template>
      </v-file-input>

      <v-progress-circular
        v-else
        :size="90"
        :width="9"
        :rotate="360"
        :value="loadingValue"
        color="pink accent-4"
      >{{loadingValue}}%</v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'admin-file-upload',

  props: {
    loadingValue: {
      type: Number
    },
    existingFile: {
      type: Object,
      default: () => {
        return {
          name: null,
          url: null
        };
      }
    },
    fileUploaded: {
      type: Object
    }
  },

  data: () => ({
    file: null,
    fileRule: [v => !!v || 'File is required']
  }),

  methods: {
    uploadFile() {
      if (this.file) {
        this.$store.dispatch('products/uploadFile', this.file);
        this.file = null;
      }
    },

    deleteFile() {
      const fileToUpload = this.file || this.existingFile;

      this.$store.dispatch('products/deleteFile', fileToUpload);

      this.file = null;
      this.existingFile.url = null;
    }
  }
};
</script>

<style>
</style>