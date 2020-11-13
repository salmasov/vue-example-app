<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { MovieListResult } from '@/models/MovieListResult'
import { Genre } from '@/models/Genre.ts'

// карточка отдельного фильма на главной странице
export default Vue.extend({
  props: {
    movie: {
      type: Object,
      required: true,
    } as PropOptions<MovieListResult>,
  },

  computed: {
    // отображает массив genre_id[] на Genre[]
    // нужно для корректного перевода тегов
    genresByIds(): Genre[] {
      function notUndefined<T>(x: T | undefined): x is T {
        return x !== undefined
      }

      const f = this.$store.getters['genreById'] as (id: string) => Genre | undefined
      const ids = this.movie.genre_ids.map(String)
      return ids.map(f).filter(notUndefined)
    },
    movieUrl(): string {
      return `/${this.movie.id}`
    },
    posterUrl(): string {
      const path = this.movie.backdrop_path
      // этот хардкод наверное надо было бы вынести
      return `https://image.tmdb.org/t/p/w500${path}`
    },
  },
})
</script>
<template>
  <v-card class="movie-card" :to="movieUrl">
    <v-img height="250" :src="posterUrl"></v-img>

    <v-card-title>{{ movie.title }}</v-card-title>

    <v-card-text>
      <div class="chips-container">
        <v-chip label v-for="genre in genresByIds" :key="genre.id" small>
          {{ genre.name }}
        </v-chip>
      </div>
    </v-card-text>
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
.chips-container {
  display: flex;
  flex-flow: row wrap;
  margin: -4px -4px;
  > * {
    margin: 4px 4px;
  }
}
</style>
