<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { MovieListResult } from '@/models/MovieListResult'

export default Vue.extend({
  props: {
    movie: {
      type: Object,
      required: true,
    } as PropOptions<MovieListResult>,
  },
  computed: {
    posterUrl() {
      const path = this.movie.backdrop_path
      return `https://image.tmdb.org/t/p/w500${path}`
    },
  },
})
</script>
<template>
  <v-card class="movie-card">
    <v-img height="250" :src="posterUrl"></v-img>

    <v-card-title>{{ movie.title }}</v-card-title>

    <v-card-text>
      <div class="grey--text rating-nowrap">
        <v-rating
          :value="movie.vote_average"
          length="10"
          color="amber"
          dense
          readonly
          size="14"
        ></v-rating>
        {{ movie.vote_average }} ({{ movie.vote_count }})
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.rating-nowrap {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
</style>
