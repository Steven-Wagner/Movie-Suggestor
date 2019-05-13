import React from 'react';
import StarRating from '../../../util/star-rating';

export default function MovieSuggestion(props) {
    return (
        <section className="movie-suggestion remote-edge">
            <header className="movie-header">
                <a className="IMDB-link" href={`https://www.imdb.com/title/${props.movieData.imdb_id}`} target="_blank" rel="noopener noreferrer">
                    <h2 className="black-back movie-title">{props.movieData.title}</h2>
                </a>
                <a className="movie-poster-link" href={`https://www.imdb.com/title/${props.movieData.imdb_id}`} target="_blank" rel="noopener noreferrer">
                    <img className="movie-poster" src={props.movieData.img} alt={`${props.movieData.title} poster`}/>
                </a>
                <p className="movie-info">Directed by: {props.movieData.director}</p>
                <p  className="movie-info">{props.movieData.release_year}</p>
                <StarRating rating={props.movieData.avg}/>
            </header>
            <button className="suggestion-options-button remote-button" onClick={() => props.handleRemoveMovie(props.index)}>Not Interested</button>
            <button className="suggestion-options-button remote-button" onClick={() => props.handleWatchedIt(props.index, props.movieData.title)}>Watched It</button>
        </section>
    )
}