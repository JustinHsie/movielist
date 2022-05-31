import React, { useState } from 'react';
import './App.css';
import MyMovies from './pages/MyMovies';
import Search from './pages/Search';
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
          <Route path="/" element={
            <MyMovies 
              setResults={setResults}
            />
          }/>
          <Route path="/search" element={
            <Search 
              results={results}
              setResults={setResults}
            />
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
