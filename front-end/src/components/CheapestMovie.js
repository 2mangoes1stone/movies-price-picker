import React from 'react'

export default function Movie({
  movie
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{movie.Title}</h1>
      <h5>Relesed Year: {movie.Released}</h5>
      <p>Director: {movie.Director}</p>
      <p>Plot: {movie.Plot}</p>
      <h6>Price: {movie.Price}</h6>
      <img src={movie.Poster} alt={movie.Title} height="100" width="100" />
    </div>
  )
}
