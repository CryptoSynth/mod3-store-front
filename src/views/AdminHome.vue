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
                  <v-col cols="12">
                    <v-text-field
                      color="pink accent-4"
                      outlined
                      label="Company Title"
                      v-model="company.title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      color="pink accent-4"
                      outlined
                      label="Company Subtitle"
                      v-model="company.subtitle"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      auto-grow
                      color="pink accent-4"
                      outlined
                      label="Company Description"
                      v-model="company.description"
                    ></v-textarea>

                    <!-- <v-col cols="12">
              <v-row align="center" justify="center" no-gutters>
                <v-col class="text-center" cols="12" sm="12">
                  <v-card
                    min-height="250"
                    max-height="300"
                    class="d-flex flex-column justify-center align-center absolute"
                    flat
                    v-if="loadingValue || product.image.url"
                  >
                    <v-img
                      v-if="imageUploaded || product.image.url"
                      class="rounded-lg elevation-8"
                      max-height="250px"
                      :src=" product.image.url || imageUploaded.url"
                    ></v-img>
                    <v-card-actions
                      v-if="imageUploaded  ||  product.image.url"
                      class="align-self-end"
                    >
                      <v-btn class="mt-5" @click="deleteImage" color="red accent-4" dark rounded>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-progress-circular
                      v-else
                      :size="90"
                      :width="9"
                      :rotate="360"
                      :value="loadingValue"
                      color="pink accent-4"
                    >{{loadingValue}}%</v-progress-circular>
                  </v-card>
                </v-col>

                <v-col v-if="!imageUploaded  && !product.image.url" class="text-center" cols="12">
                  <v-file-input
                    v-model="image"
                    color="pink accent-4"
                    label="Upload Image"
                    prepend-icon
                    prepend-inner-icon="mdi-upload"
                    @change="uploadImage"
                    outlined
                    :rules="imageRule"
                  >
                    <template #selection="{text}">
                      <v-chip small label color="pink accent-4">{{text}}</v-chip>
                    </template>
                  </v-file-input>
                </v-col>
              </v-row>
                    </v-col>-->
                  </v-col>

                  <v-col></v-col>
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
export default {
  name: 'admin-dashboard-home',

  data: () => ({
    company: {
      title: 'Brownie Inc.',
      subtitle: 'Welcome!',
      description:
        "ELorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  })
};
</script>

<style>
</style>