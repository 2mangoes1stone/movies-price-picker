const express = require('express');
const fetch = require('node-fetch');
const Q = require('q');
const _ = require('lodash');
const router = express.Router()

var movies = []

// route to get the cheapest movie object
router.get('/cheapestMovie', (req, res) => {

  cinemaWorldMoviesIdsarray = []
  filmWorldMoviesIdsarray = []
    
    // Fetch movies Ids of all cimenaWorld Movies
    const cinemaWorldMovieIds = fetch('http://webjetapitest.azurewebsites.net/api/cinemaworld/movies',{
      method: 'GET',
      mode :'cors',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": process.env.API_TOKEN
      }
    })
      .then((apiResponse) => apiResponse.json())
      .then((json) => {
        json.Movies.map((movie) => {
          cinemaWorldMoviesIdsarray.push(movie.ID)
        })
      })
      .catch((error) => {
        return error
      }) 

    // Fetch movies Ids of all filmWorld Movies
    const filmWorldMovieIds = fetch('http://webjetapitest.azurewebsites.net/api/filmworld/movies',{
      method: 'GET',
      mode :'cors',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": process.env.API_TOKEN
      }
    })  
      .then((apiResponse) => apiResponse.json())
      .then((json) => {
        json.Movies.map((movie) => {
          filmWorldMoviesIdsarray.push(movie.ID)
        })
      })
      .catch((error) => {
        return error
      })
      
    // Use 'q' library to store resolved promises
    Q.allSettled([cinemaWorldMovieIds, filmWorldMovieIds])
    .then((results) => {
      var movieIds = {
        cinemaWorld: cinemaWorldMoviesIdsarray,
        filmWorld: filmWorldMoviesIdsarray
      }

    // function fetches a new object for each ID fetched from cinemaworld movies
    //  returns a promise to be handled later once all movies objects are returned 
    cinemaWorldMovies = () => {
      return new Promise((resolve,reject) => {
        movieIds.cinemaWorld.map((id) => {
          fetch(`http://webjetapitest.azurewebsites.net/api/cinemaworld/movie/${id}`,{
            headers: {
              "x-access-token": process.env.API_TOKEN
            }
          }) 
          .then((apiResponse) => apiResponse.json())
          .then(json => {
            movies.push(json)
          })
          .catch((error) => {
            return error
          }) 
        })
        resolve(movies);
      })
    }
    
    // function fetches a new object for each ID fetched from filmworld movies
    //  returns a promise to be handled later once all movies objects are returned 
    filmWorldMovies = () => {
      return new Promise((resolve,reject) => {
        movieIds.filmWorld.map((id) => {
          fetch(`http://webjetapitest.azurewebsites.net/api/filmworld/movie/${id}`,{
            headers: {
              "x-access-token": process.env.API_TOKEN
            }
          }) 
          .then((apiResponse) => apiResponse.json())
          .then(json => {
            movies.push(json)
          })
          .catch((error) => {
            return error
          }) 
        })
        resolve(movies);
      })
    }

    // Use 'q' library to return all resolved promises
    // used the returned object an use lodash library
    // to return the cheapest movie object
    Q.allSettled([cinemaWorldMovies(), filmWorldMovies()])
    .then((results) => {
      moviesObject = results[0].value
      res.json(_.minBy(moviesObject, 'Price'));
    })
  })
})

module.exports = router;