import React, { useState } from 'react';
import './Card.css';
import UIkit from 'uikit';
import { useNavigate } from 'react-router-dom';

const axios = require('axios').default;

export default function CardResult(props) {
  // Programmatic navigation
  let navigate = useNavigate();

  // State
  const [rating, setRating] = useState(0);

  // Rating slider change
  const handleSliderChange = e => {
    setRating(e.target.value);
  };

  // Add movie
  const handleAddMovie = () => {
    // Get current datetime
    let datetime = Date.now();

    let movie = {
      id: props.id,
      image: props.image,
      title: props.title,
      rating: rating,
      datetime: datetime,
      username: localStorage.getItem('username'),
    };

    // Config for auth header
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    // POST movie to backend
    axios
      .post('http://localhost:8001/movies', movie, config)
      .then(res => {
        // Display success notification
        UIkit.notification({
          message: 'Movie Added',
          status: 'success',
          pos: 'top-center',
          timeout: 3000,
        });
        navigate('/');
      })
      .catch(error => {
        let errorMessage = error.response.data.detail;
        // Display error notification
        UIkit.notification({
          message: errorMessage,
          status: 'warning',
          pos: 'top-center',
          timeout: 5000,
        });
      });
  };

  return (
    <div
      className="uk-card uk-card-default new-card"
      id={props.id}
      key={props.id}
    >
      <div
        className="uk-card-media-top images"
        style={{ backgroundImage: `url(${props.image})` }}
      ></div>
      <div className="uk-card-body card-container">
        <div className="card-info-container">
          <div className="card-info">
            <h3 className="uk-card-title card-title">{props.title}</h3>
            <p className="card-description">My Rating</p>
            <p className="card-description">{rating} / 10</p>
          </div>
          <form>
            <div className="uk-margin">
              <input
                className="uk-range"
                type="range"
                value={rating}
                onChange={handleSliderChange}
                min="0"
                max="10"
                step="1"
              />
            </div>
          </form>
          <div className="card-footer">
            <button
              onClick={handleAddMovie}
              className="uk-button uk-button-default new-button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
