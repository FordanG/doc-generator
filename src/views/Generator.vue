<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col lg="6" sm="10" class="pa-6 ma-2">
          <Form />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Form from '@/components/Form.vue'

export default Vue.extend({
  name: 'Generator',
  components: {
    Form
  }
})
</script>

<style scoped></style>
