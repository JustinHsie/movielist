import React from 'react';
import './MyMovies.css';
import CardResult from '../components/CardResult';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

export default function Search(props) {
  // Image url for API request
  let imageUrl = 'https://image.tmdb.org/t/p/w500/';

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (props.results.length == 0) {
    return (
      <div id="movies">
        <div id="movie-container">
          <div id="movie-title-container">
            <h1 id="movie-header">
              <a href="/">Movie List</a>
            </h1>
            <a id="movie-logout" onClick={handleLogout}>
              Logout
            </a>
            <div id="movie-search-container">
              <SearchBar setResults={props.setResults} />
            </div>
            <div>
              <h1 id="movie-subheader">Sorry no results, please try again</h1>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="movies">
        <div id="movie-container">
          <div id="movie-title-container">
            <h1 id="movie-header">
              <a href="/">Movie List</a>
            </h1>
            <div id="movie-search-container">
              <SearchBar setResults={props.setResults} />
            </div>
            <div>
              <h1 id="movie-subheader">Results</h1>
            </div>
            <a id="movie-logout" onClick={handleLogout}>
              Logout
            </a>
          </div>
          <div id="grid-container">
            {props.results.map(movie => {
              return (
                <CardResult
                  key={movie.id}
                  id={movie.id}
                  image={imageUrl + movie.poster_path}
                  title={movie.title}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
