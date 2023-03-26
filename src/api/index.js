import axios from './config.js';

async function getMovies() {
  return axios.get('/movies')
}

async function searchMovies(name, genre) {
  return axios.get(`/movies?name=${name}&genres=${genre || ''}`)
}

async function getMovieById(id) {
  try {
    const data = await axios.get(`/movies?movie_id=${id}`)
    return data[0]
  }
  catch(e) {
    throw e
  }
}

async function getSessions() {
  return axios.get('/movieShows')
}

async function getPlaces({id, daytime, showdate}) {
  return axios.get(`/showPlaces?movie_id=${id}&daytime=${daytime}&showdate=${showdate}`)
}

async function bookTicket(data) {
  return axios.post('/bookPlace', data)
}

export default {
  getMovies,
  searchMovies,
  getMovieById,
  getSessions,
  getPlaces,
  bookTicket
}
