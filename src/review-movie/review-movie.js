import React, {Component} from 'react'

class ReviewMovie extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title ? this.props.title : ''
        }
    }

    render() {

        return (
            <div>
                <main role="main">
                <header>
                    <h1>New Review</h1>
                </header>
                <section>
                    <form id="movie-review-form">
                    <div className="form-section">
                        <label htmlFor="movie-title">Movie Title</label>
                        <input value={this.state.title} type="text" name="movie-title" placeholder="Star Wars: A New Hope" required/>
                    </div>
                    <div className="stars form-section">
                        <label htmlFor="stars-review">Stars(1-5)</label>
                        <input type="number" name="stars" placeholder="3" min="1" max="5"/>
                    </div>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                    <button type="reset">Cancel</button>
                    </form>
                </section>
                </main>
            </div>
        )
    }
}

export default ReviewMovie