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
        <section>
            <header>
                <a href={`https://www.imdb.com/title/${props.movieData.imdb_id}`} target="_blank" rel="noopener noreferrer"><h2>{props.movieData.title}</h2></a>
                <img src={props.movieData.img} alt={`${props.movieData.title} poster`}/>
                <p>Directed by: {props.movieData.director}</p>
                <p>{props.movieData.release_year}</p>
                <StarRating rating={props.movieData.avg}/>
            </header>
            <button className="suggestion-options" onClick={() => props.handleRemoveMovie(props.index)}>Not Interested</button>
            <button className="suggestion-options" onClick={() => props.handleWatchedIt(props.index, props.movieData.title)}>Watched It</button>
        </section>
    )
}