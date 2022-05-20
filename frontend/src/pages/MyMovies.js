import React, { useEffect, useState } from 'react';
import './MyMovies.css';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
const axios = require('axios').default;


export default function MyMovies(props) {
  // Tracks if a movie has been updated
  const [updated, setUpdate] = useState();

  // Fetch movies from backend and set movies state
  const fetchMovies = async () => {
    const movies = await axios.get('http://localhost:8000/movies');
    props.setMovies(movies.data.data);
  }

  useEffect(() => {
    fetchMovies();
  }, [updated])

  return(
      <div id="movies">
        <div id="movie-container">
          <div id="movie-title-container">
            <h1 id="movie-header"><a href="/">Movie List</a></h1>
            <div id="movie-search-container">
              <SearchBar setResults={props.setResults}/>
            </div>
            <div>
              <Filter/>
            </div>
          </div>
          <div id="grid-container">
            {props.movies.map(
              movie => {
                return <Card 
                  id={movie.id}
                  title={movie.title}
                  rating={movie.rating}
                  setUpdate={setUpdate}
                />
              }
            )}
          </div>
        </div>
      </div>
  )
}