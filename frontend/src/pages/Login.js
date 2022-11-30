import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import UIkit from 'uikit';
import './MyMovies.css';

const axios = require('axios').default;

export default function Login() {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameInput = e => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  // Enter key submit
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleFormSubmit(e);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    // Error handling empty fields
    if (username === '' || password === '') {
      // Display error notification
      UIkit.notification({
        message: 'Username or password cannot be empty',
        status: 'warning',
        pos: 'top-center',
        timeout: 5000,
      });
      return;
    }
    
    // Send as form data
    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    axios({
      method: 'post',
      url: 'https://movielist-back.herokuapp.com/login',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        // Store token in local storage
        let token = res.data.access_token;
        let user = res.data.username;
        localStorage.setItem('token', token);
        localStorage.setItem('username', user);
        navigate('/');
      })
      .catch(error => {
        let errorMessage = error.response.data.detail;
        // Display error notification
        UIkit.notification({
          message: errorMessage,
          status: 'warning',
          pos: 'top-center',
          timeout: 5000,
        });
      });
  };

  // Demo login
  const handleDemoSubmit = async e => {
    e.preventDefault();

    // Send as form data
    const bodyFormData = new FormData();
    bodyFormData.append('username', 'Demo');
    bodyFormData.append('password', 123);
    let res = await axios({
      method: 'post',
      url: 'https://movielist-back.herokuapp.com/login',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Store token in local storage
    let token = res.data.access_token;
    let user = res.data.username;
    localStorage.setItem('token', token);
    localStorage.setItem('username', user);

    navigate('/');
  };

  return (
    <div id="movies">
      <div id="movie-container">
        <div id="movie-title-container">
          <h1 id="movie-header">
            <a href="/">Movie List</a>
          </h1>
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
              onDemoSubmit={handleDemoSubmit}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
