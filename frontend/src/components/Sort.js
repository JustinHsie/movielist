import React from 'react';

export default function Sort() {
  return(
    <ul className="uk-subnav uk-subnav-pill" uk-margin="true">
      <li>
        <a href="#">Sort By<span uk-icon="icon: triangle-down"></span></a>
        <div uk-dropdown="mode: click">
            <ul className="uk-nav uk-dropdown-nav">
                <li><a href="#">Item</a></li>
                <li><a href="#">Item</a></li>
                <li><a href="#">Item</a></li>
                <li><a href="#">Item</a></li>
            </ul>
        </div>
      </li>
    </ul>
  )
}