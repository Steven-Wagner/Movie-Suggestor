import React, {Component} from 'react'
import ErrorMessage from '../error-message/error-message';

class ReviewMovie extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            stars: 1,
            error: ''
        }
    }

    changeForm = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    validateForm = (e) => {
        let errorMes = '';
        
        if (!this.state.title) {
            errorMes = 'Title is required'
            this.setState({
                error: errorMes
            }, this.submitReview())
        }
        else {
            const urlFormatedTitle = this.state.title.replace(/' '/g, '+')
            fetch(`https://www.omdbapi.com/?i=${process.env.REACT_APP_OMDB_API_KEY}&t=${urlFormatedTitle}`, {
            })
            .then(res => {
                return res.json()
            })
            .then(jres => {
                console.log(jres.Title)
                if (jres.Response === "False") {
                    errorMes = jres.Error
                }
                if (jres.Title !== this.state.title) {
                    if (jres.Title) {
                        errorMes = `Title not found. Did you mean ${jres.Title}?`
                    }
                }
                return jres
            })
            .then(jres => {
                console.log('erroe', errorMes)
                this.setState({
                    error: errorMes
                },() => this.submitReview(jres))
            })
        }
    }

    submitReview = jres => {
        console.log('state error', this.state.error)
        if(!this.state.error) {
            const newReview = {
                title: this.state.title,
                rating: this.state.stars,
                releaseDate: jres.Year,
                img: jres.Poster
            }
            const username = this.props.match.params.user

            this.props.addNewReview(username, newReview)

            alert("Review Submited")

            this.props.history.goBack()
            }
        }

    handleSubmit = e => {
        e.preventDefault()
        this.validateForm(e)
    }

    handleCancel = (e) => {
        e.preventDefault()
        this.props.history.push(`/homepage/${this.props.match.params.user}`)
    }

    render() {

        return (
            <div>
                <main role="main">
                <header>
                    <h1>New Review</h1>
                </header>
                <section>
                    <ErrorMessage errorMessage={this.state.error}/>
                    <form id="movie-review-form" onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <label htmlFor="movie-title">Movie Title</label>
                        <input onChange={this.changeForm} type="text" name="movie-title" id="title" placeholder="Star Wars: A New Hope" required/>
                    </div>
                    <div className="stars form-section">
                        <label htmlFor="stars-review">Stars(1-5)</label>
                        <input onChange={this.changeForm} id="stars" type="number" name="stars" placeholder="1" min="1" max="5"/>
                    </div>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                    <button  type="button" onClick={(e) => this.handleCancel(e)}>Cancel</button>
                    </form>
                </section>
                </main>
            </div>
        )
    }
}

export default ReviewMovie