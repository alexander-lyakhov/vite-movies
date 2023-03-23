import axios from './config.js';

function getMovies() {
  return axios.get('/movies')
}

function getSessions() {
  return axios.get('/movieShows')
}

function getPlaces({id = 61, daytime = '10:50', showdate = '2021-06-27'} = {}) {
  return axios.get(`/showPlaces?movie_id=${id}&daytime=${daytime}&showdate=${showdate}`)
}

export default {
  getMovies,
  getSessions,
  getPlaces
}
