import React, {useState} from 'react';
import './App.css';
import MyMovies from './pages/MyMovies';
import Search from './pages/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

  // Movie and search results state
  const[movies, setMovies] = useState([])
  const [results, setResults] = useState([])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MyMovies 
              movies={movies} 
              setMovies={setMovies}
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
