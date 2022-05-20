import React from 'react';
import './MyMovies.css';
import CardResult from '../components/CardResult';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';


export default function Search(props) {
  let imageUrl = 'https://image.tmdb.org/t/p/w500/'

  return(
      <div id="movies">
        <div id="movie-container">
          <div id="movie-title-container">
            <h1 id="movie-header"><a href="/">Results</a></h1>
            <div id="movie-search-container">
              <SearchBar setResults={props.setResults}/>
            </div>
            <div>
              <Filter/>
            </div>
          </div>
          <div id="grid-container">
            {props.results.map(
              movie => {
                return <CardResult 
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