import { createStore } from "vuex";
import api from '@/api';

export default createStore({
  strict: true,

  state: () => ({
    movies: [],
    sessions: []
  }),

  getters: {
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
    SET_MOVIES(state, data) {
      console.log('SET_MOVIES', data)
      state.movies = data
    },
    SET_SESSIONS(state, data) {
      console.log('SET_SESSIONS', data)
      state.sessions = data
    }
  },

  actions: {
    async fetchMovies({state, commit}) {
      if (!state.movies.length) {
        const data = await api.getMovies()
        commit('SET_MOVIES', data)
      }
    },

    async fetchSessions({state, commit, dispatch}) {
      await dispatch('fetchMovies')
      const data = await api.getSessions()
      commit('SET_SESSIONS', data)
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
