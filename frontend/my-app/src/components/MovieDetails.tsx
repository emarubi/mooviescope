import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import './MovieDetails.css'

export type MovieDetailsProps = {
    // movie: {
    //     imdbID: string;
    //     Title: string;
    //     Year: string;
    //     Type: string;
    //     Poster: string;
    //     imdbRating: string;
    //     plot: string;
    // },
}   

const MovieDetails: React.FC<MovieDetailsProps> = () => {
    const [movie, setMovie] = useState<any>([])
    const param = useParams();
    console.log('param', param);

    const submitSearch = async () => {
        console.log('searchValue', param.id)
        const result = await fetch('http://localhost:3030/', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: "i=" + param.id })
        })
        const resultInJson = await result.json()
        console.log('resultInJson', resultInJson)

        fetch('http://localhost:3030/results')
        .then(response => response.json())
        .then((json) => {
        console.log('json', json)
        if (json.Search) {
            setMovie(json.Search);
        } else if (json.error) {
            console.log('error', json.error)
        }
        })
    }

    useEffect(() => {
        submitSearch()
    },[])

    return (
        <div className="container">
                    <ol key={movie.imdbID} >
                        <div className='card'>
                            <div className='poster-box'>
                                <img className="poster" src={movie.Poster} alt={`${movie.Title} poster`} />
                            </div>
                            <p className='card-title'>{movie.Title}</p>
                            <span className="card-description">{movie.Type}</span>
                            <span className="card-description">Year: {movie.Year}</span>
                        </div>
                    </ol>

        </div>
    );
}

export default MovieDetails;