import React from 'react'

function StarRating(rating) {
    let ratingRounded = Math.round(rating.rating)
    const stars = []
    while(stars.length < 5) {
        if (ratingRounded > 0) {
            stars.push(String.fromCharCode(9733))
        }
        else {
            stars.push(String.fromCharCode(9734))
        }
        ratingRounded -= 1
    }
    return (<p className="star-rating">{stars.join('')}</p>)
}

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