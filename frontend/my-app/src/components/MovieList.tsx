import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SearchBox from './SearchBox';
import './MovieList.css'

export type MovieListProps = {
    searchString: string;
}   

const MovieList: React.FC<MovieListProps> = ({
    searchString
}) => {
    console.log('searchString', searchString)
    const [movies, setMovies] = useState<any>([])
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/results')
        .then(response => response.json())
        .then((json) => {
        console.log('json', json)
        if (json.Search) {
            setMovies(json.Search);
        }
        })
    }, [])

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
        <>
            <div id="navbar">
            <h1>Moviefinder</h1>
            <SearchBox searchValue={searchString}
                setSearchValue={setSearchValue}
                submitSearch={submitSearch} />
            </div>
            <div className="container">
                {movies &&
                    movies.map((movie: any) => (
                        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} >
                            <div className='card'>
                                <div className='poster-box'>
                                    <img className="poster" src={movie.Poster} alt={`${movie.Title} poster`} />
                                </div>
                                <p className='card-title'>{movie.Title}</p>
                                <span className="card-description">{movie.Type}</span>
                                <span className="card-description">Year: {movie.Year}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    );
}

export default MovieList;