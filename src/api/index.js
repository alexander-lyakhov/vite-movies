import axios from './config.js';

async function getMovies() {
  return axios.get('/movies')
}

async function getMovieById(id) {
  try {
    const data = await axios.get(`/movies?movie_id=${id}`)
    return data[0]
  }
  catch(e) {
    return {}
  }
}

async function getSessions() {
  return axios.get('/movieShows')
}

async function getPlaces({id, daytime, showdate}) {
  return axios.get(`/showPlaces?movie_id=${id}&daytime=${daytime}&showdate=${showdate}`)
}

export default {
  getMovies,
  getMovieById,
  getSessions,
  getPlaces
}
