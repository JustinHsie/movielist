import React, {useEffect, useState} from 'react';
import './Movies.css';
import Card from '../components/Card';

const MoviesContext = React.createContext({
  movies: [], fetchMovies: () => {}
})

export default function Movies() {

  const[movies, setMovies] = useState([])

  const fetchMovies = async() => {
    const response = await fetch("http://localhost:8000/movies")
    const movies = await response.json()
    setMovies(movies.data)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return(
    <MoviesContext.Provider value={[movies, fetchMovies]}>
      <div id="movies">
        <div id="movie-container">
          <div id="movie-title-container">
            <h1 id="movie-header">Movie List</h1>
          </div>
          <div id="grid-container">
            {movies.map(
              movie => {
                return <Card 
                  id={movie.id}
                  title={movie.title}
                  director={movie.director}
                />
              }
            )}
          </div>
        </div>
      </div>
    </MoviesContext.Provider>
  )
}