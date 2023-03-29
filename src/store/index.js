import { createStore } from "vuex";
import { showError } from '@/utils'
import api from '@/api';

export default createStore({
  strict: true,

  state: () => ({
    movies: [],
    filteredMovies: [],
    sessions: {},
    src: 'movies'
  }),

  getters: {
    movies(state) {
      return state[state.src]
    },

    sessions(state) {
      return state.movies.map(el => {
        return {
          id: el.id,
          name: el.name,
          image: el.image,
          sessions: state.sessions[el.id]
        }
      })
    },

    getMovieById(state) {
      return (id) => state.movies.find(el => el.id.toString() === id)
    }
  },

  mutations: {
    SET_SRC(state, src) {
      state.src = src
    },

    SET_MOVIES(state, data) {
      state.movies = data
    },

    SET_FILTERED_MOVIES(state, data) {
      state.filteredMovies = data
    },


    SET_SESSIONS(state, data) {
      state.sessions = data
    }
  },

  actions: {
    async fetchMovies({state, commit}) {
      commit('SET_SRC', 'movies')

      try {
        if (!state.movies.length) {
          const data = await api.getMovies()
          data.sort((a, b) => a.id - b.id)
          commit('SET_MOVIES', data)
          return data
        }
      }
      catch(e) {
        showError(e)
      }
    },

    async searchMovies({state, commit}, search) {
      commit('SET_SRC', 'filteredMovies')

      try {
        const data = await api.searchMovies(search.name, search.genre)
        data.sort((a, b) => a.id - b.id)
        commit('SET_FILTERED_MOVIES', data)
        return data
      }
      catch(e) {
        showError(e)
      }
    },

    async fetchSessions({state, commit, dispatch}) {
      if (!state.sessions.length) {
        try {
          await dispatch('fetchMovies')
          commit('SET_SESSIONS', await api.getSessions())
          return state.sessions
        }
        catch(e) {
          showError(e)
        }
      } else {
        return state.sessions
      }
    },

    async getMovieById({state, getters}, id) {
      let movie = getters.getMovieById(id)

      if (movie) {
        return movie
      }

      try {
        const movie = await api.getMovieById(id)
        return movie
      }
      catch(e) {
        showError(e)
        return {}
      }
    }
  }
});
