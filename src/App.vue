<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app>
      <span>&copy; 2020 Mandocdoc & Fordan.</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

document.title = 'MF Document Generator'

export default {
  name: 'App',
  components: {
    NavBar
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || 'Document Generator'
    }
  },
  mounted() {
    this.$store.dispatch('loadDocuments').then(() => {
      console.log(this.$store.getters.documents)
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
