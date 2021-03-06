<script lang="ts">
import Vue from 'vue'
import getApiService from '@/common/api.service'
import { Genre } from '@/models/Genre.ts'

const apiService = getApiService()

enum Statuses {
  RUMORED = 'Rumored',
  PLANNED = 'Planned',
  IN_PRODUCTION = 'In Production',
  POST_PRODUCTION = 'Post Production',
  RELEASED = 'Released',
  CANCELED = 'Canceled',
}
interface MovieDetailed {
  adult: boolean
  backdrop_path: string | null
  budget: boolean
  genre: Genre[]
  homepage: string | null
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  release_date: string // format: date
  revenue: number
  runtime: number
  status: Statuses[]
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export default Vue.extend({
  data: () => ({
    isLoading: true,
    movie: null as MovieDetailed | null,
  }),
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id
    this.fetchMovieDetailed(id)
    next()
  },
  methods: {
    async fetchMovieDetailed(id: string) {
      this.isLoading = true
      try {
        const res = await apiService.get(`/movie/${id}`)
        this.movie = res.data
      } catch (error) {
        // TODO: не хватает корректного errorHandling'a для отображения
        throw new Error(error)
      } finally {
        this.isLoading = false
      }
    },
  },

  computed: {
    entries(): any[] | null {
      if (!this.movie) return null
      return Object.entries(this.movie)
    },
  },

  async mounted() {
    const id = this.$route.params.id
    this.fetchMovieDetailed(id)
  },
})
</script>
<template>
  <div class="home-page">
    <div class="loading" v-if="isLoading">
      <v-progress-circular :size="100" color="primary" indeterminate />
    </div>
    <div class="content" v-else>
      <h1>{{ movie.title }}</h1>

      <div class="info">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  key
                </th>
                <th class="text-left">
                  value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in entries" :key="item[0]">
                <td>{{ item[0] }}</td>
                <td>{{ item[1] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
pre {
  font-size: 12px;
}
</style>
