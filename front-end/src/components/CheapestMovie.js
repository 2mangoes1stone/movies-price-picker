import React from 'react'

export default function Movie({
  movie
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{movie.Title}</h1>
      <h4>Relesed Year: {movie.Released}</h4>
      <p>Director: {movie.Director}</p>
      <p>Plot: {movie.Plot}</p>
      <p style={{ fontSize: "25px" }}>Price: ${movie.Price}</p>
      <img src={movie.Poster} alt={movie.Title} height="100" width="100" />
    </div>
  )
}
