import React from 'react'

export default function Movie({
  Title,
  Year,
  Poster
}) {
  return (
    <div>
      {
        <div className="movie">
          <h2>{Title}</h2>
          <h5>Year Released: {Year}</h5>
          <img src={Poster} alt={Title} height="100" width="100" />
        </div>
      }
    </div>
  )
}
