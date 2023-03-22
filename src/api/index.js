import axios from './config.js';

function getMovies() {
  return axios.get('/movies')
}

function getSessions() {
  return axios.get('/movieShows')
}

function getPlaces() {
  return axios.get('/showPlaces?movie_id=61&daytime=10:50&showdate=2021-06-27')
}

export default {
  getMovies,
  getSessions,
  getPlaces
}
