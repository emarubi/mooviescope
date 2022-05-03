import React from 'react';

import './MovieList.css'

export type MovieListProps = {
    movies: [{
        Title: string;
        Year: string;
        Type: string;
        Poster: string;
    }],
}

const MovieList: React.FC<MovieListProps> = ({
    movies
}) => {
    console.log('movies', movies)
    return (
        <div className="container">
            {movies &&
                movies.map((movie: any) => (
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
                ))
            }
        </div>
    );
}

export default MovieList;