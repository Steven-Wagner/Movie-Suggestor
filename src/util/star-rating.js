import React from 'react';

export default function StarRating(rating) {
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