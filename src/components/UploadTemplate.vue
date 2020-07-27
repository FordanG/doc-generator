<template>
  <div>
    <v-file-input @change="onFilePicked" label="Upload Template"></v-file-input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { angularParser } from '@/templateLoader'
import InspectModule from 'docxtemplater/js/inspect-module.js'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { generateSchema } from '@/templateLoader'

export default Vue.extend({
  name: 'UploadTemplate',
  data: () => {
    return {
      currentFile: undefined,
      progress: 0,
      message: ''
    }
  },
  methods: {
    onFilePicked(file: Blob | null) {
      const reader = new FileReader()
      console.log(typeof file)
      file ? reader.readAsBinaryString(file) : null
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const content = reader.result
          const zip = new PizZip(content)
          const inspector = InspectModule()
          new Docxtemplater(zip, {
            parser: angularParser,
            modules: [inspector]
          })

          const x = inspector.getAllTags()
          console.log(inspector.getAllStructuredTags())
          this.$store.dispatch('setSchema', generateSchema(x))
        }
      }
    }
  }
})
</script>

<style scoped></style>
