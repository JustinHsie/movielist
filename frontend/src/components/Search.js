import React from 'react';
import './Search.css';

export default function Search(props) {
  return(
    <form className="uk-search uk-search-default">
      <input className="uk-search-input" type="search" placeholder="Search Movies"/>
    </form>
  )
}