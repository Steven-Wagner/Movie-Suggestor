import React, {Component} from 'react'
import Nav from '../commonComponents/navigation';
import Footer from '../commonComponents/footer';
import PastReviewsList from './past-reviews-list/past-reviews-list';

class SeePastReviews extends Component {
    render() {
        return (
            <div>
                {/*add past-reviews to Nav*/}
                <Nav status="past-reviews" user={this.props.match.params.user}/>
                <main role="main">
                    <header className="new-review-header">
                        <h2 className="route-title">Past Reviews</h2>
                    </header>
                    <PastReviewsList user={this.props.match.params.user} {...this.props}/>     
                </main>
                <Footer/>
            </div>
        )
    }
}

export default SeePastReviews;