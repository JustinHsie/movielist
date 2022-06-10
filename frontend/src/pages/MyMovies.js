import React, { useEffect, useState } from 'react';
import './MyMovies.css';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import Sort from '../components/Sort';
import { useNavigate } from 'react-router-dom';
import { handleSortRatingHighest, 
         handleSortRatingLowest, 
         handleSortNewest, 
         handleSortOldest } from '../functions';

const axios = require('axios').default;

export default function MyMovies(props) {
  let navigate = useNavigate();

  // Current sort order
  const [sort, setSort] = useState(() => handleSortNewest);
  // Frontend copy of movies
  const [movies, setMovies] = useState([])
  // Tracks if a movie card has been updated
  const [cardUpdated, setCardUpdate] = useState();

  
  // On movie card update:
  // Fetch movies from backend
  useEffect(() => {
    fetchMovies();
  }, [cardUpdated])

  // On sort change:
  // Sort movies, then set frontend movies 
  // (No fetch from backend)
  useEffect(() => {
    let sortedMovies = sort(movies);
    setMovies(sortedMovies);
  }, [sort])

  // Config for auth header
  let config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
  }

  const fetchMovies = () => {
    // Fetch movies from backend
    axios.get('http://localhost:8001/movies', config)
      .then((res) => {
        // Sort movies then set to frontend
        let sortedMovies = sort(res.data);
        setMovies(sortedMovies);
      })
      .catch((error) => {
        // If error navigate to login page
        navigate('/login')
      })
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  return(
      <div id="movies">
        <div id="movie-container">
          <div id="movie-title-container">
            <h1 id="movie-header"><a href="/">Movie List</a></h1>
            <a id="movie-logout" onClick={handleLogout}>Logout</a>
            <div id="movie-search-container">
              <SearchBar setResults={props.setResults}/>
            </div>
            <div>
              <Sort
                // Change sort state, will trigger useEffect to sort
                onClickRatingHighest={() => {
                  setSort(() => handleSortRatingHighest);
                }}
                onClickRatingLowest={() => {
                  setSort(() => handleSortRatingLowest);
                }}
                onClickNewest={() => {
                  setSort(() => handleSortNewest);
                }}
                onClickOldest={() => {
                  setSort(() => handleSortOldest);
                }}
              />
            </div>
          </div>
          <div id="grid-container">
            {movies.map(
              movie => {
                return <Card 
                  key={movie.id}
                  id={movie.id}
                  image={movie.image}
                  title={movie.title}
                  rating={movie.rating}
                  setCardUpdate={setCardUpdate}
                />
              }
            )}
          </div>
        </div>
      </div>
  )
}