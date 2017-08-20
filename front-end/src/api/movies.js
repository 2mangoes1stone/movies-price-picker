import axios from './init'

// get all movies
export function getAllMovies() {
  return axios.get('/api/moviesList')
  .then(res => res.data)
}