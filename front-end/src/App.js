import React, { Component } from 'react';
import MoviesList from './components/MoviesList'
import CheapestMovie from './components/CheapestMovie'
import * as moviesApi from './api/movies';
import * as cheapestMovieApi from './api/cheapestMovie';

class App extends Component {
  state = {
    error: null,
    movies: null,
    cheapestMovie: null
  }

  getCheapestMovie = () => [
    cheapestMovieApi.getCheapestMovie()
      .then((cheapestMovie) => {
        this.setState({ cheapestMovie: cheapestMovie })
      })
      .catch(error => {
        this.setState({ error })
      })
  ]

  fetchAllMovies = () => {
    moviesApi.getAllMovies()
      .then((movies) => {
        this.setState({ movies: movies.moviesListArray })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error, movies, cheapestMovie } = this.state
    return (
      <main>
        { !!error && <p>{ error.message }</p> }
        { !!cheapestMovie ? (
          <CheapestMovie
            oncheck={ this.checkCheapestMovie }
            movie={ cheapestMovie }
          />
        ) :
          !!movies ? (
            <div style={{ textAlign: "center", marginTop: "10px"}}>
              <button
                type="button"
                onClick={ this.getCheapestMovie }  
              >Click to check cheapest movie</button>
              <MoviesList items={ movies } />
            </div>
          ) : (
            'Loading movies…'
          )
        }
      </main>
    );
  }
  componentDidMount() {
    this.fetchAllMovies()
  }
}

export default App;
