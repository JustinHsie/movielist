import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';
import UIkit from 'uikit';
import './MyMovies.css';

const axios = require('axios').default;

export default function Signup() {
  // Programmatic navigation
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameInput = e => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    // Error handling (eg empty fields) not implemented yet
    // Send as form data
    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    await axios({
      method: 'post',
      url: 'http://localhost:8001/signup',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Display success notification
    UIkit.notification({
      message: 'Signed Up! Please Log In',
      status: 'success',
      pos: 'top-center',
      timeout: 3000,
    });

    navigate('/login');
  };

  // Demo login
  const handleDemoSubmit = async e => {
    e.preventDefault();

    // Error handling (eg empty fields) not implemented yet
    // Send as form data
    const bodyFormData = new FormData();
    bodyFormData.append('username', 'demo');
    bodyFormData.append('password', 123);
    let res = await axios({
      method: 'post',
      url: 'http://localhost:8001/login',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Store token in local storage
    let token = res.data.access_token;
    let user = res.data.username
    localStorage.setItem('token', token)
    localStorage.setItem('username', user)

    navigate('/');
  }

  return (
    <div id="movies">
      <div id="movie-container">
        <div id="movie-title-container">
          <h1 id="movie-header">
            <a href="/">Movie List</a>
          </h1>
          <div>
            <h1 id="movie-subheader">Signup</h1>
          </div>
          <div id="movie-form-container">
            <SignupForm
              usernameValue={username}
              onUsernameInput={handleUsernameInput}
              passwordValue={password}
              onPasswordInput={handlePasswordInput}
              onFormSubmit={handleFormSubmit}
              onDemoSubmit={handleDemoSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
