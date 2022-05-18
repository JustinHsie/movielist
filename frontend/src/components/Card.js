import React from 'react';
import './Card.css';

export default function Card(props){
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
                    </div>
                </div>
            </div>
        </div>
    )
}