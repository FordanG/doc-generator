<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <upload-template />
        </v-col>
        <v-row>
          <v-col>
            <edit-schema />
          </v-col>
          <v-col>
            <form-preview />
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadTemplate from '@/components/UploadTemplate.vue'
import FormPreview from '@/components/FormPreview.vue'
import EditSchema from '@/components/EditSchema.vue'

export default Vue.extend({
  name: 'CreateForm',
  components: { UploadTemplate, FormPreview, EditSchema }
})
</script>

<style scoped></style>
