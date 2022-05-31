import React, { useState } from 'react';
import './Card.css';
import UIkit from 'uikit';

const axios = require('axios').default;

export default function Card(props){

    // State
    const [rating, setRating] = useState(props.rating);
    const [disabled, setDisabled] = useState(true);

    // Slider state change
    const handleChange = e => {
        setRating(e.target.value);
        if (e.target.value === props.rating) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    // Save movie update
    const handleSave = async () => {
        let movie = {
            "id": props.id,
            "rating": rating
        }

        // PUT rating change to backend
        const res = await axios.put('http://localhost:8001/movies', movie);
        // Change state so MyMovies re-renders and re-fetches movies
        props.setCardUpdate(res);

        // Display success notification
        UIkit.notification({
            message: 'Movie Updated',
            status: 'success',
            pos: 'top-center',
            timeout: 3000
        });

        // Reset disabled button after updating rating
        setDisabled(true);
    }

    // Delete movie
    const handleDelete = async () => {
        let movie = {
            "id": props.id
        }
        // 2nd param is axios-dictated sytax to send a request body
        const res = await axios.delete('http://localhost:8001/movies', {data: movie});
        // Change state so MyMovies re-renders and re-fetches movies
        props.setCardUpdate(res);

        // Display delete notification
        UIkit.notification({
            message: 'Movie Deleted',
            status: 'success',
            pos: 'top-center',
            timeout: 3000
        });
    }

    return(
        <div className="uk-card uk-card-default new-card" id={props.id} key={props.id}>
            <div className="uk-card-media-top images" style={{backgroundImage: `url(${props.image})`}}>
            </div>
            <div className="uk-card-body card-container">
                <div className="card-info-container">
                    <div className="card-info">
                        <h3 className="uk-card-title card-title">{props.title}</h3>
                        <p className="card-description">Rating</p>
                        <p className="card-description">{rating} / 10</p>
                    </div>
                    <form>
                        <div className="uk-margin">
                             <input 
                                className="uk-range" 
                                type="range" 
                                value={rating} 
                                onChange={handleChange}
                                min="0" 
                                max="10" 
                                step="1"/>
                        </div>
                    </form>
                    <div className="card-footer">
                        <button 
                            onClick={handleSave} 
                            className="uk-button uk-button-default new-button"
                            disabled={disabled}>
                        Save
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="uk-icon-button" 
                            uk-icon="trash">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}