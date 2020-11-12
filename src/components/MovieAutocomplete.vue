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
    onSelectedItemChange(value: number) {
      this.$router.push({ name: 'MovieDetailed', params: { id: String(value) } })
    },
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
      @change="onSelectedItemChange"
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="mx-4"
      flat
      hide-details
      item-text="title"
      item-value="id"
      label="Найти фильм"
      solo-inverted
    >
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <!-- <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle> -->
        </v-list-item-content>
        <!-- <v-list-item-action>
          <v-icon>mdi-bitcoin</v-icon>
        </v-list-item-action> -->
      </template>
    </v-autocomplete>
  </div>
</template>
