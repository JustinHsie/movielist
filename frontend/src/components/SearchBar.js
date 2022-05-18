import React from 'react';
import Search from './Search';
import { useNavigate } from 'react-router-dom'
const axios = require('axios').default;

export default function SearchBar(props) {
  let navigate = useNavigate();

  const [query, setQuery] = React.useState("")
  
  const handleInput = e => {
    setQuery(e.target.value)
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    // Get backend to make external API request
    // const res = await axios.get(`http://localhost:8000/search/?query=${query}`)
    let res = [
      {
      "id" : '75',
      "title": 'Dune',
      "director": 'Denis Villaneuve'
      }
    ]
    // Set results state
    props.setResults(res)
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


