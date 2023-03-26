import { createStore } from "vuex";
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
      console.log('SET_MOVIES', data)
      state.movies = data
    },

    SET_FILTERED_MOVIES(state, data) {
      console.log('SET_FILTERED_MOVIES', data)
      state.filteredMovies = data
    },


    SET_SESSIONS(state, data) {
      console.log('SET_SESSIONS', data)
      state.sessions = data
    }
  },

  actions: {
    async fetchMovies({state, commit}) {
      commit('SET_SRC', 'movies')

      if (!state.movies.length) {
        const data = await api.getMovies()
        commit('SET_MOVIES', data)
      }
    },

    async searchMovies({state, commit}, search) {
      const data = await api.searchMovies(search.name, search.genre)
      
      commit('SET_SRC', 'filteredMovies')
      commit('SET_FILTERED_MOVIES', data)
    },

    async fetchSessions({state, commit, dispatch}) {
      if (!state.sessions.length) {
        await dispatch('fetchMovies')
        commit('SET_SESSIONS', await api.getSessions())
        return state.sessions
      
      } else {
        return state.sessions
      }
    },

    async getMovieById({state, getters}, id) {
      let movie = getters.getMovieById(id)

      if (!movie) {
        movie = await api.getMovieById(id)
      }
      return movie
    }
  }
});
