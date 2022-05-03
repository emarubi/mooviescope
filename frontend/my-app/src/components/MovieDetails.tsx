import React from 'react';

import './MovieDetails.css'

export type MovieDetailsProps = {
    movie: {
        imdbID: string;
        Title: string;
        Year: string;
        Type: string;
        Poster: string;
        imdbRating: string;
        plot: string;
    },
}   

const MovieDetails: React.FC<MovieDetailsProps> = ({
    movie
}) => {
    console.log('movies', movie)
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