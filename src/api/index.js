import axios from './config.js';

function getMovies() {
  return axios.get('/movies')
}

function getSessions() {
  return axios.get('/movieShows')
}

export default {
  getMovies,
  getSessions
}
