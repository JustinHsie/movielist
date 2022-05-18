import React from 'react';
import './Search.css';

export default function Search(props) {
  return(
    <form 
      className="uk-search uk-search-navbar search-bar" 
      onSubmit={props.onSubmit}>
      <input 
        className="uk-search-input search-input" 
        type="text"
        placeholder="Search Movie"
        value={props.value}
        onChange={props.onInput}/>
    </form>
  )
}