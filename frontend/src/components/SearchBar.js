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
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    // GET request backend to make external API request
    const res = await axios.get(`http://localhost:8000/search/?query=${query}`)
    
    // let res = [
    //   {
    //     "id": 75,
    //     "title": 'Dune1'
    //   },
    //   {
    //     "id": 76,
    //     "title": 'Dune2'
    //   },
    //   {
    //     "id": 77,
    //     "title": 'Dune3'
    //   },
    //   {
    //     "id": 78,
    //     "title": 'Dune4'
    //   },
    //   {
    //     "id": 79,
    //     "title": 'Dune5'
    //   }
    // ]
    // props.setResults(res)

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


