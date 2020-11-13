<script lang="ts">
import Vue from 'vue'

import MovieAutocomplete from '@/components/MovieAutocomplete.vue'

export default Vue.extend({
  components: {
    MovieAutocomplete,
  },
  mounted() {
    this.$store.dispatch('fetchGenres')
  },
})
</script>
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="content">
        <v-btn text to="/">На главную</v-btn>

        <movie-autocomplete class="autocomplete-offset" />
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
}
.autocomplete-offset {
  flex-grow: 5;
}
</style>
