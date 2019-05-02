import React, {Component} from 'react'
import ErrorMessage from '../commonComponents/error-message';
import {setStatePromise} from '../util/common';
import PopUp from '../pop-up/pop-up'
import Nav from '../commonComponents/navigation';
import {API_BASE_URL} from '../config'
import TokenService from '../services/token-services'
import UpdateReviewPopUp from  '../pop-up/updateReviewPopUp';
import {toTitleCase} from '../util/titleCase';

class ReviewMovie extends Component {

    constructor(props) {
        super(props)

        let movieToReview = '';
        if (this.props.match.params.movie) {
            movieToReview = this.props.match.params.movie
        }

        this.state = {
            title: movieToReview,
            stars: 1,
            error: '',
            reviewSubmitedPopUp: {status: false, message: ''},
            updateReviewPopUp: {status: false, message: '', review: '', movie_id: ''}
        }

        this.timeoutHandle = 0
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle)
    }

    popUpTimer = (popUpToBeTimed) => {
        clearTimeout(this.timeoutHandle)
        this.timeoutHandle = setTimeout(() => {
            this.setState({
                [popUpToBeTimed]: {status: false, message: ''}
            })
            this.timeoutHandle = 0
        }, 5000)
    }

    changeForm = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addToTitleInput = suggestedTitle => {
        this.setState({
            title: suggestedTitle
        })
    }

    validateForm = (e) => {
        let errorMes = '';
        
        if (!this.state.title) {
            errorMes = 'Title is required'
            this.setState({
                error: errorMes
            }, /*this.submitReview()*/)
        }
        else {
            
            const urlFormatedTitle = toTitleCase(this.state.title).trim().replace(/' '/g, '+')
            
            fetch(`https://www.omdbapi.com/?i=${process.env.REACT_APP_OMDB_API_KEY}&t=${urlFormatedTitle}`, {
            })
            .then(res => {
                return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            })
            .then(jres => {
                if (jres.Response === "False") {
                    throw new Error(jres.Error)
                }
                if (jres.Title !== urlFormatedTitle) {
                    if (jres.Title) {

                        const titleNotFoundError = new Error(`Title not found. Did you mean`)
                        titleNotFoundError.button = jres.Title
                        throw titleNotFoundError;
                    }
                }
                return jres
            })
            .then(() => {
                this.submitReview(urlFormatedTitle)
            })
            .catch(error => {
                this.setState({
                    error: error

                })
            })
        }
    }

    submitReview = title => {
        if(!this.state.error) {
            const newReview = {
                title: title,
                star_rating: this.state.stars,
                user_id: this.props.match.params.user
            }

            const user_id = this.props.match.params.user

            fetch(`${API_BASE_URL}/review/${user_id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `bearer ${TokenService.getAuthToken()}`
                },
                body: JSON.stringify(newReview)
            })
            .then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            })
            .then(res => {
                if (this.props.match.params.movie) {
                    window.close()
                }
                setStatePromise(this, {
                    reviewSubmitedPopUp: {status: true, message: `${newReview.title} has been added to your reviews!`}
                })
            })
            .then(() => {
                this.popUpTimer('reviewSubmitedPopUp')
                this.resetForm()
            })
            .catch(error => {

                if (error.message === "This movie has already been reviewed") {
                    setStatePromise(this, {
                        updateReviewPopUp: {
                            status: true, 
                            message: `${newReview.title} has already been reviewed. Would you like to update it with this new data?`,
                            review: newReview,
                            movie_id: error.movie_id}
                    })
                    .then(() => {
                        this.popUpTimer('updateReviewPopUp')
                    })
                }
                else {

                    this.setState({
                        error: error
                    })
                }
            })
        }
    }

    resetForm = () => {
        this.setState({
            title: '',
            stars: 1
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.setState({
            error: ''
        }, () => 
        this.validateForm(e))
    }

    handleCancel = (e) => {
        e.preventDefault()
        if (this.props.match.params.movie) {
            window.close()
        }
        else {
            this.props.history.goBack()
        }
    }

    render() {

        const popUp = this.state.reviewSubmitedPopUp.status 
            ? <PopUp message={this.state.reviewSubmitedPopUp.message}/>
            : "";

        const updateReviewPopUp = this.state.updateReviewPopUp.status
            ? <UpdateReviewPopUp 
                message={this.state.updateReviewPopUp.message} 
                review={this.state.updateReviewPopUp.review} 
                movie_id={this.state.updateReviewPopUp.movie_id}
                component={this}/>
            : '';

        return (
            <div>
                <main role="main">
                <Nav user={this.props.match.params.user} status={'review-page'}/>
                <header className="new-review-header">
                    <h2>New Review</h2>
                </header>
                <section className="remote-edge">
                    {popUp}
                    {updateReviewPopUp}
                    <ErrorMessage error={this.state.error} addToTitleInput={this.addToTitleInput}/>
                    <form id="movie-review-form" onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <label htmlFor="movie-title">Movie Title</label>
                        <input className="review-title review-input" value={this.state.title} onChange={this.changeForm} type="text" name="movie-title" id="title" placeholder="e.g. Shawshank Redemption" required/>
                    </div>
                    <div className="stars form-section">
                        <label htmlFor="stars-review">Stars(1-5)</label>
                        <input className="review-input" value={this.state.stars} onChange={this.changeForm} id="stars" type="number" name="stars" placeholder="1" min="1" max="5"/>
                    </div>
                    <button className="remote-button" type="submit">Submit</button>
                    <button className="remote-button" type="button" onClick={(e) => this.handleCancel(e)}>Go Back</button>
                    </form>
                </section>
                </main>
            </div>
        )
    }
}

export default ReviewMovie