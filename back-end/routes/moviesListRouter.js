const express = require('express');
const fetch = require('node-fetch');
const Q = require('q');
const router = express.Router();

// route to get the cheapest movie object
router.get('/moviesList', (req, res) => {
  
    moviesListArray = []
      
      // Fetch movies Ids of all cimenaWorld Movies
      const cinemaWorldMovieIds = fetch('http://webjetapitest.azurewebsites.net/api/cinemaworld/movies',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": process.env.API_TOKEN
        }
      })
        .then((apiResponse) => apiResponse.json())
        .then((json) => {
          json.Movies.map((movie) => {
            moviesListArray.push(movie)
          })
        })
        .catch((error) => {
          return error
        }) 
  
      // Fetch movies Ids of all filmWorld Movies
      const filmWorldMovieIds = fetch('http://webjetapitest.azurewebsites.net/api/filmworld/movies',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": process.env.API_TOKEN
        }
      })  
        .then((apiResponse) => apiResponse.json())
        .then((json) => {
          json.Movies.map((movie) => {
            moviesListArray.push(movie)
          })
        })
        .catch((error) => {
          return error
        })
        
      // Use 'q' library to store resolved promises
      Q.allSettled([cinemaWorldMovieIds, filmWorldMovieIds])
      .then((results) => {
        res.json(
          movieIds = {
            moviesListArray
          }
        ) 
      })
})  

module.exports = router;