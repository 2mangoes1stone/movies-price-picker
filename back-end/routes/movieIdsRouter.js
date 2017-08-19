const express = require('express');
const fetch = require('node-fetch');
const _ = require('lodash');
const router = express.Router()
const Q = require('q');

var movies = []

router.get('/movieIds', (req, res) => {

  cinemaWorldMoviesIdsarray = []
  filmWorldMoviesIdsarray = []

    const cinemaWorldMovieIds = fetch('http://webjetapitest.azurewebsites.net/api/cinemaworld/movies',{
      headers: {
        "x-access-token": process.env.API_TOKEN
      }
    })
      .catch((error) => {}) 
      .then((apiRes) => apiRes.json())
      .then((json) => {
        json.Movies.map((movie) => {
          cinemaWorldMoviesIdsarray.push(movie.ID)
        })
      })

    const filmWorldMovieIds = fetch('http://webjetapitest.azurewebsites.net/api/filmworld/movies',{
      headers: {
        "x-access-token": process.env.API_TOKEN
      }
    })
      .catch((error) => {})  
      .then((apiRes) => apiRes.json())
      .then((json) => {
        json.Movies.map((movie) => {
          filmWorldMoviesIdsarray.push(movie.ID)
        })
      })
  
  Q.allSettled([cinemaWorldMovieIds, filmWorldMovieIds])
  .then((results) => {
    var movieIds = {
      cinemaWorld: cinemaWorldMoviesIdsarray,
      filmWorld: filmWorldMoviesIdsarray
    }

    cinemaWorldMovies = () => {
      return new Promise((resolve,reject) => {
        movieIds.cinemaWorld.map((id) => {
          fetch(`http://webjetapitest.azurewebsites.net/api/cinemaworld/movie/${id}`,{
            headers: {
              "x-access-token": process.env.API_TOKEN
            }
          })
          .catch((error) => {})  
          .then((apiResponse) => apiResponse.json())
          .then(json => {
            movies.push(json)
          })
        })
        resolve(movies);
      })
    }
    
    filmWorldMovies = () => {
      return new Promise((resolve,reject) => {
        movieIds.filmWorld.map((id) => {
          fetch(`http://webjetapitest.azurewebsites.net/api/filmworld/movie/${id}`,{
            headers: {
              "x-access-token": process.env.API_TOKEN
            }
          })
          .catch((error) => {})  
          .then((apiResponse) => apiResponse.json())
          .then(json => {
            movies.push(json)
          })
        })
        resolve(movies);
      })
    }

    Q.allSettled([cinemaWorldMovies(), filmWorldMovies()])
    .then((results) => {
      res.json(results[0].value)
    })
  })
})

module.exports = router;