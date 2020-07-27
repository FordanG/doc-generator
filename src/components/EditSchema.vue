<template>
  <div>
    <v-card v-for="field in fields" :key="field.title">
      <v-card-title>{{ field.title }}</v-card-title>
      <v-card-actions>
        <v-select :items="items" solo label="Type"></v-select>
        <v-checkbox label="Required"></v-checkbox>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  name: 'EditSchema',
  data: () => {
    return {
      items: ['Word/s', 'Date', 'Number']
    }
  },
  computed: {
    ...mapGetters(['schema', 'fields'])
  }
})
</script>

<style scoped></style>
