<script lang="ts">
import Vue from 'vue'
import getApiService from '@/common/api.service'

import { MovieListResult, PopularMovieResult } from '@/models/MovieListResult'

import MovieCard from '@/components/MovieCard.vue'
import MovieAutocomplete from '@/components/MovieAutocomplete.vue'

const apiService = getApiService()

export default Vue.extend({
  data: () => ({
    isLoading: true,
    movies: [] as MovieListResult[],
  }),

  components: {
    MovieCard,
    MovieAutocomplete,
  },

  async mounted() {
    try {
      const res = await apiService.get<PopularMovieResult>('/movie/popular')
      this.movies = res.data.results
    } catch (error) {
      throw new Error(error)
    } finally {
      this.isLoading = false
    }
  },
})
</script>
<template>
  <div class="home-page">
    <div class="loading" v-if="isLoading">loading...</div>
    <div class="content" v-else>
      <div class="search-bar">
        <movie-autocomplete />
      </div>
      <div class="movie-list">
        <movie-card v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  padding: 10px;
}
.movie-list {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
</style>
