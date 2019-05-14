import React, {Component} from 'react';
import {setStatePromise} from '../../util/common';
import PastReviewsService from '../see-past-reviews-service';
import PastReview from './past-review/past-review';
import ErrorMessage from '../../commonComponents/error-message';

class PastReviewsList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            reviewsData: [],
            error: ''
        }
    }

    componentDidMount() {
        PastReviewsService.fetchPastReviews(this.props.match.params.user)
        .then(reviewDataRes => {
            setStatePromise(this, {
                reviewsData: reviewDataRes.reviewData
            })
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    deleteReview = (review_id) => {
        PastReviewsService.fetchDeleteReview(this.props.user, review_id)
        .then(deletedReviewId => {
            let newReviewState = this.state.reviewsData.slice()

            newReviewState = newReviewState.filter(review => {
                return review.review_id !== deletedReviewId.id
            })

            this.setState({
                reviewsData: newReviewState
            })
        })
    }


    updateReview = title => {
        window.open(`/#/newreview/${this.props.match.params.user}/${title}`, "_blank")
    }

    render() {
        let reviews
        
        if (!this.state.reviewsData || this.state.reviewsData.length === 0) {
            reviews = <p className="no-listings-hints">You don't have any reviews yet</p>
        }
        else {
            reviews = this.state.reviewsData.map(review => {
                return <PastReview 
                    reviewData={review} 
                    key={review.review_id} 
                    reviewId={review.review_id} 
                    deleteReview={this.deleteReview}
                    updateReview={this.updateReview}/>
            })
        }

        return(
            <div>
                <ErrorMessage error={this.state.error}/>
                {reviews}
            </div>
        )
    }
}

export default PastReviewsList;
