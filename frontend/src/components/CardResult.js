import React from 'react';
import './CardResult.css';
import UIkit from 'uikit';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const axios = require('axios').default;

export default function CardResult(props){
    let navigate = useNavigate();

    const handleOnClick = async () => {
        let movie = {
            "id": props.id,
            "title": props.title
        }

        // POST movie to backend
        const res = await axios.post('http://localhost:8000/movies', movie)

        // Display success notification
        UIkit.notification({
            message: 'Movie Added',
            status: 'success',
            pos: 'top-center',
            timeout: 3000
        });

        navigate("/")
    }

    return(
        <div className="uk-card uk-card-default new-card" id={props.id} key={props.id}>
            <div className="uk-card-media-top images" style={{backgroundImage: `url(${props.background})`}}>
            </div>
            <div className="uk-card-body card-container">
                <div className="card-info-container">
                    <div className="card-info">
                        <h3 className="uk-card-title card-title">{props.title}</h3>
                        <p className="card-description">{props.director}</p>
                    </div>
                    <div className="card-footer">
                        <button onClick={handleOnClick} className="uk-button uk-button-default new-button">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}