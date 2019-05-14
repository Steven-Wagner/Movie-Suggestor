import React from 'react';
import StarRating from '../../../util/star-rating';


export default function PastReview(props) {
    return (
        <section className="movie-suggestion remote-edge">
            <header className="movie-header">
                <a className="IMDB-link" href={`https://www.imdb.com/title/${props.reviewData.imdb_id}`} target="_blank" rel="noopener noreferrer">
                    <h2 className="black-back movie-title">{props.reviewData.title}</h2>
                </a>
                <a className="movie-poster-link" href={`https://www.imdb.com/title/${props.reviewData.imdb_id}`} target="_blank" rel="noopener noreferrer">
                    <img className="movie-poster" src={props.reviewData.img} alt={`${props.reviewData.title} poster`}/>
                </a>
                <p className="movie-info">Directed by: {props.reviewData.director}</p>
                <p  className="movie-info">{props.reviewData.release_year}</p>
                <StarRating rating={props.reviewData.star_rating}/>
            </header>
            <button className="suggestion-options-button remote-button" onClick={() => props.deleteReview(props.reviewData.review_id)}>Delete</button>
            <button className="suggestion-options-button remote-button" onClick={() => props.updateReview(props.reviewData.title)}>Update</button>
        </section>
    )
    }