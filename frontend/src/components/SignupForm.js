import React from 'react';
import './Form.css';

export default function SignupForm(props) {
  return(
    <div>
      <div className="form-div">
        <form 
          className="uk-search uk-search-navbar form-bar" 
          onSubmit={props.onFormSubmit}
          onKeyDown={props.onKeyDown}>
          <input 
            className="uk-search-input form-input" 
            type="text"
            placeholder="Username"
            value={props.usernameValue}
            onChange={props.onUsernameInput}/>
          <input 
            className="uk-search-input uk-form-password form-input" 
            type="password"
            placeholder="Password"
            value={props.passwordValue}
            onChange={props.onPasswordInput}/>
        </form>
      </div>
      <div className='form-div'>
        <button 
          onClick={props.onFormSubmit} 
          className="uk-button uk-button-default new-button form-button">
          Signup
        </button>
      </div>
      <div id='form-alt-link'>
        <a href="/login">Login</a>
      </div>
      <div className='form-div demo-button-div'>
        <button 
          onClick={props.onDemoSubmit} 
          className="uk-button uk-button-default new-button form-button demo-button">
          Demo Login
        </button>
      </div>
    </div>
  )
}