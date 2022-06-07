import React, { useState } from 'react';
import './App.css';
import MyMovies from './pages/MyMovies';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

  // Search results state
  // State needs to be here bc both SearchBar in MyMovies page and Search page use it
  const [results, setResults] = useState([])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Routes>
          <Route exact="true" path="/" element={
            <MyMovies 
              setResults={setResults}
            />
          }/>
          <Route exact="true" path="/search" element={
            <Search 
              results={results}
              setResults={setResults}
            />
          }/>
          <Route exact="true" path="signup" element={<Signup/>}/>
          <Route exact="true" path="login" element={<Login/>}/>
          <Route exact="true" path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
