import axios from './init'

// get all movies
export function getCheapestMovie() {
  return axios.get('/api/cheapestMovie')
  .then(res => res.data)
}