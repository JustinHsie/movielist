import React, {useState} from 'react';
import Search from './Search';
import { useNavigate } from 'react-router-dom'

const axios = require('axios').default;

export default function SearchBar(props) {
  let navigate = useNavigate();

  const [query, setQuery] = useState("");
  
  const handleInput = e => {
    setQuery(e.target.value);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // GET request backend to make external API request
    const res = await axios.get(`http://localhost:8001/search/?query=${query}`)

    // Set results state
    props.setResults(res.data.query.results)
    navigate("/search");

  }

  return(
    <Search
      value={query}
      onSubmit={handleSubmit}
      onInput={handleInput}
    />
  )
}


