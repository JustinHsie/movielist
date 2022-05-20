import React, { useState } from 'react';
import './CardResult.css';
import UIkit from 'uikit';
import { useNavigate } from 'react-router-dom'

const axios = require('axios').default;

export default function CardResult(props){
    let navigate = useNavigate();

    const [rating, setRating] = useState(0);

    const handleChange = e => {
        setRating(e.target.value);
    }

    const handleOnClick = async () => {
        let movie = {
            "id": props.id,
            "title": props.title,
            "rating": rating
        }

        // POST movie to backend
        const res = await axios.post('http://localhost:8000/movies', movie);

        // Display success notification
        UIkit.notification({
            message: 'Movie Added',
            status: 'success',
            pos: 'top-center',
            timeout: 3000
        });

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
                        <button onClick={handleOnClick} className="uk-button uk-button-default new-button">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}