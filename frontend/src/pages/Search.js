import React from 'react';
import './MyMovies.css';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
const axios = require('axios').default;


export default function Search(props) {

  console.log(props.results)

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
                return <Card 
                  id={movie.id}
                  title={movie.title}
                />
              }
            )}
          </div>
        </div>
      </div>
  )
}