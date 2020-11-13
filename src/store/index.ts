import Vue from 'vue'
import Vuex, { StoreOptions, MutationTree, GetterTree, ActionTree } from 'vuex'
import getApiService from '@/common/api.service'

import { Genre, GenreResult } from '@/models/Genre.ts'

const apiService = getApiService()

Vue.use(Vuex)

// при желании эту логику можно вынести в отдельный module store/genres.ts
interface RootState {
  genres: Genre[]
}

const mutations: MutationTree<RootState> = {
  SET_GENRES: (state, payload) => {
    state.genres = payload
  },
}

const getters: GetterTree<RootState, RootState> = {
  genreById: (state) => (id: string) =>
    state.genres.find((genre: Genre) => genre.id === Number(id)),
}

const actions: ActionTree<RootState, RootState> = {
  async fetchGenres({ commit }) {
    try {
      const res = await apiService.get<GenreResult>('/genre/movie/list')
      commit('SET_GENRES', res.data.genres)
    } catch (error) {
      throw new Error(error)
    }
  },
}

const store: StoreOptions<RootState> = {
  state: {
    genres: [],
  },
  mutations,
  getters,
  actions,
  modules: {},
}

export default new Vuex.Store<RootState>(store)
