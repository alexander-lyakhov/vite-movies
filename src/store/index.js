import { createStore } from "vuex";

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
        const res = await fetch('https://cinema-api-test.y-media.io/v1/movies')
        const { data } = await res.json()

        commit('SET_MOVIES', data)
      }
    },

    async fetchSessions({state, commit, dispatch}) {
      if (!state.movies.length) {
        await dispatch('fetchMovies')
      }
      
      const res = await fetch('https://cinema-api-test.y-media.io/v1/movieShows')
      const { data } = await res.json()

      commit('SET_SESSIONS', data)
      
    },
  }
});
