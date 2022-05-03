import React, { useState } from 'react';
import './HomePage.css';

import MovieList from './MovieList';
import SearchBox from './SearchBox';
import MovieDetails from './MovieDetails';

function HomePage() {
  const [movies, setMovies] = useState<any>([])
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

    fetch('http://localhost:3030/results')
      .then(response => response.json())
      .then((json) => {
        console.log('json', json)
        if (json.Search) {
          setMovies(json.Search);
        }
      })
  }

  return (
      <div className="homepage">
        <div id="navbar">
          <h1>Mooviesfinder</h1>
          <SearchBox searchValue={searchValue}
            setSearchValue={setSearchValue}
            submitSearch={submitSearch} />
        </div>
        <MovieList movies={movies} />
      </div>
  );
}

export default HomePage;