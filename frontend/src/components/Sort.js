import React, { useState } from 'react';

export default function Sort(props) {
  return(
    <ul className="uk-subnav uk-subnav-pill" uk-margin="true">
      <li>
        <a href="#">Sort By<span uk-icon="icon: triangle-down"></span></a>
        <div uk-dropdown="mode: hover; delay-hide: 100">
            <ul className="uk-nav uk-dropdown-nav">
                <li><a onClick={props.onClickRatingHighest}>Rating (Highest)</a></li>
                <li><a onClick={props.onClickRatingLowest}>Rating (Lowest)</a></li>
                <li><a onClick={props.onClickNewest}>Date Added (Newest)</a></li>
                <li><a onClick={props.onClickOldest}>Date Added (Oldest)</a></li>
            </ul>
        </div>
      </li>
    </ul>
  )
}