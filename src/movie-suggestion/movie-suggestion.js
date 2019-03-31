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
    return stars.join('')
}

export default function MovieSuggestion(props) {
    return (
        <section>
            <header>
                <h2>{props.movieData.title}</h2>
                <img src={props.movieData.img} alt={`${props.movieData.title} poster`}/>
                <p>{props.movieData.releaseDate}</p>
                <StarRating rating={props.movieData.rating}/>
            </header>
            <button onClick={() => props.handleRemoveMovie(props.index)}>Not Interested</button>
            <button onClick={() => props.handleWatchedIt(props.index, props.movieData.title)}>Watched It</button>
        </section>
    )
}