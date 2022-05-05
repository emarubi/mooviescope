import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import './styles.css'

const MovieDetails = () => {
    const [movie, setMovie] = useState<any>()
    const [errorMessage, setErrorMessage] = useState<string>('');
    const param = useParams();
    const navigate = useNavigate();

    const submitSearch = async () => {
        console.log('param.id', param.id)
        const result = await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: param.id })
        })
        const resultInJson = await result.json()
        console.log('resultInJson', resultInJson)

        fetch(`http://localhost:4000/movies/${param.id}`)
        .then(response => response.json())
        .then((json) => {
        console.log('json', json)
        if (json) {
            setMovie(json);
            console.log('movie', movie)
        } else if (json.error) {
            console.log('error', json.Error)
            setErrorMessage(json.Error);
        }
        })
    }

    useEffect(() => {
        submitSearch()
    },[])
    
    const handleClick = () => {
        navigate(-1)
    }

console.log('movie', movie)
    return (
        <>
            <button type="button" onClick={handleClick} className="details__button">
                    Back
            </button>
            {errorMessage && 
                <p className='error'>{errorMessage}</p>
            }
            <div className="details__container">
                <div className='details__card'>
                    <div className='details__poster-box'>
                        <img className="details__poster" src={movie?.Poster} alt={`${movie?.Title} poster`} />
                    </div>
                    <div className="details__box">
                        <p className='details__box-title'>{movie?.Title}</p>
                        <span className="details__box-description">{movie?.Type}</span>
                        <span className="details__box-description">Year: {movie?.Year}</span>
                        <span className='details__box-description'>Writer: {movie?.Writer}</span>
                        <span className='details__box-description'>Director: {movie?.Director}</span>
                        <span className='details__box-description'>Actors: {movie?.Actors}</span>
                        <span className='details__box-description'>Country: {movie?.Country}</span>
                        <span className='details__box-description'>Awards: {movie?.Awards}</span>
                        <span className='details__box-description'>Runtime: {movie?.Runtime}</span>
                        <p className='details__box-content'>Plot: {movie?.Plot}</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default MovieDetails;