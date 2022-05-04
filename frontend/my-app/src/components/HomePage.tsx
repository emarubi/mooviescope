import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBox from './SearchBox';
import './HomePage.css';


function HomePage() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');

  const submitSearch = async () => {
    console.log('searchValue', searchValue)
    const result = await fetch('http://localhost:3030/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: searchValue })
    })
    const resultInJson = await result.json()
    console.log('resultInJson', resultInJson)
    navigate("/movies", { state: { searchString: resultInJson }});
  }

  return (
      <div className="container">
        <div id="navbar">
          <h1>Mooviesfinder</h1>
          <SearchBox searchValue={searchValue}
            setSearchValue={setSearchValue}
            submitSearch={submitSearch} />
        </div>
        {/* <MovieList movies={movies} /> */}
      </div>
  );
}

export default HomePage;