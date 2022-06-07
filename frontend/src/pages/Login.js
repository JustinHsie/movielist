import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import './MyMovies.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameInput = e => {
    setUsername(e.target.value);
  }

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    
    // Error handling (eg empty fields) not implemented yet
    
  }

  return(
    <div id="movies">
      <div id="movie-container">
        <div id="movie-title-container">
          <h1 id="movie-header"><a href="/">Movie List</a></h1>
          <div>
            <h1 id="movie-subheader">Login</h1>
          </div>
          <div id="movie-form-container">
            <LoginForm
              usernameValue={username}
              onUsernameInput={handleUsernameInput}
              passwordValue={password}
              onPasswordInput={handlePasswordInput}
              onFormSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}