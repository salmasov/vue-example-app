<script lang="ts">
import Vue from 'vue'
import getApiService from '@/common/api.service'

import { MovieListResult, PopularMovieResult } from '@/models/MovieListResult'

import MovieCard from '@/components/MovieCard.vue'

const apiService = getApiService()

export default Vue.extend({
  data: () => ({
    isLoading: true,
    movies: [] as MovieListResult[],
  }),

  components: {
    MovieCard,
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
    <div class="loading" v-if="isLoading">
      <v-progress-circular :size="100" color="primary" indeterminate />
    </div>
    <div class="content" v-else>
      <h1>Популярные фильмы</h1>
      <div class="movie-list">
        <movie-card v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.content {
  padding: 10px;
}
.movie-list {
  display: grid;
  grid-gap: 16px;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 300px);
}
</style>
