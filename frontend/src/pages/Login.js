import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom'
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

  const handleFormSubmit = async e => {
    e.preventDefault();

    // Error handling (eg empty fields) not implemented yet
    // Send as form data
    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
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
  };

  // Demo login
  const handleDemoSubmit = async e => {
    e.preventDefault();

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
