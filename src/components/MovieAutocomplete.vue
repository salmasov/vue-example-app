<script lang="ts">
import Vue from 'vue'
import getApiService from '@/common/api.service'
import { debounce } from 'throttle-debounce'
const apiService = getApiService()

export default Vue.extend({
  watch: {
    search: debounce(500, function(
      this: { searchMovie: (value: string | null) => void },
      value: string | null,
    ) {
      this.searchMovie(value)
    }),
  },
  methods: {
    async searchMovie(value: string) {
      if (!value || value.length < 3) return
      const res = await apiService.get('/search/movie', { params: { query: value } })
      this.items = res.data.results
    },
  },
  data: () => ({
    select: null,
    loading: false,
    items: [],
    search: null,
  }),
})
</script>
<template>
  <div class="movie-autocomplete">
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Найти фильм"
      solo-inverted
    >
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>
