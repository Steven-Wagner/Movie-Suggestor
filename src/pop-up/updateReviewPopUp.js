import React from 'react';
import TokenService from '../services/token-services';
import {API_BASE_URL} from '../config'

export default function PopUp(props) {
    return (
        <div className="pop-up">
            <p>{props.message}</p>
            <button onClick={() => 
                updateReview(
                    props.review, 
                    props.movie_id,
                    props.component)}>
                Yes
            </button>
            <button onClick={() => 
                closePopUpReview(props.component)}>
                No
            </button>
        </div>
    )
}

function updateReview(reviewInfo, movie_id, component) {

    const user_id = reviewInfo.user_id;

    const updateBody = {
        user_id: user_id,
        movie_id: movie_id,
        star_rating: reviewInfo.star_rating
    }

    // fetch(`${API_BASE_URL}/review/${user_id}`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-type": "application/json",
    //         "authorization": `bearer ${TokenService.getAuthToken()}`
    //     },
    //     body: JSON.stringify(updateBody)
    // })
    // .then(res => {
    // return (!res.ok)
    //     ? res.json().then(e => Promise.reject(e))
    //     : res.json()
    // })
    // .then(res => {
        closePopUpReview(component)
    // })
    // .catch(error =>{
    //     component.setState({
    //         error: error.error
    //     })
    //     .then(() => {
    //         closePopUpReview(component)
    //     })
    // })

}

function closePopUpReview(component) {
    component.setState({
        updateReviewPopUp: {status: false, message: '', review: '', movie_id: ''}
    })
}