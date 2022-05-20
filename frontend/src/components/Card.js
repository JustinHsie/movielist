import React, { useState } from 'react';
import './Card.css';
import UIkit from 'uikit';
import { useNavigate } from 'react-router-dom'

const axios = require('axios').default;

export default function Card(props){
    let navigate = useNavigate();

    const [rating, setRating] = useState(props.rating);
    const [disabled, setDisabled] = useState(true);

    const handleChange = e => {
        setRating(e.target.value);
        if (e.target.value == props.rating) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const handleOnClick = async () => {
        let movie = {
            "id": props.id,
            "title": props.title,
            "rating": rating
        }

        // PUT rating change to backend
        const res = await axios.put('http://localhost:8000/movies', movie);
        // Change state so MyMovies re-renders and re-fetches movies
        props.setUpdate(res);

        // Display success notification
        UIkit.notification({
            message: 'Movie Updated',
            status: 'success',
            pos: 'top-center',
            timeout: 3000
        });

        // Reset disabled button after updating rating
        setDisabled(true);
        
        navigate("/");
    }
    return(
        <div className="uk-card uk-card-default new-card" id={props.id} key={props.id}>
            <div className="uk-card-media-top images" style={{backgroundImage: `url(${props.background})`}}>
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
                            onClick={handleOnClick} 
                            className="uk-button uk-button-default new-button"
                            disabled={disabled}
                        >
                        Save
                        </button>
                        <button href="" className="uk-icon-button" uk-icon="trash"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}