import React from 'react';
import './MyMovies.css';
import CardResult from '../components/CardResult';
import SearchBar from '../components/SearchBar';


export default function Search(props) {
  // Image url for API request
  let imageUrl = 'https://image.tmdb.org/t/p/w500/'

  return(
      <div id="movies">
        <div id="movie-container">
          <div id="movie-title-container">
            <h1 id="movie-header"><a href="/">Movie List</a></h1>
            <div id="movie-search-container">
              <SearchBar setResults={props.setResults}/>
            </div>
            <div>
              <h1 id="movie-subheader">Results</h1>
            </div>
          </div>
          <div id="grid-container">
            {props.results.map(
              movie => {
                return <CardResult 
                  key={movie.id}
                  id={movie.id}
                  image={imageUrl + movie.poster_path}
                  title={movie.title}
                />
              }
            )}
          </div>
        </div>
      </div>
  )
}