import React, {Component} from 'react'
import ErrorMessage from '../commonComponents/error-message';
import {setStatePromise} from '../util/common';
import PopUp from '../pop-up/pop-up'
import Nav from '../commonComponents/navigation';
import {API_BASE_URL} from '../config'
import TokenService from '../services/token-services'
import UpdateReviewPopUp from  '../pop-up/updateReviewPopUp';
import {toTitleCase} from '../util/titleCase';
import Footer from '../commonComponents/footer';
import Autocomplete from '../util/autocompleteMovies';
import {Link} from 'react-router-dom'

class ReviewMovie extends Component {

    constructor(props) {
        super(props)

        //If movie param is passed to this component this.state.title will default to that value otherwise it will be undefined
        let movieToReview = '';
        if (this.props.match.params.movie) {
            movieToReview = this.props.match.params.movie
        }

        this.state = {
            title: movieToReview,
            stars: 3,
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
        //set 5 second timer on popup
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

    addToTitleInput = title => {
        this.setState({
            title: title
        })
    }

    validateForm = (e) => {
        let errorMes = '';
        
        if (!this.state.title) {
            errorMes = 'Title is required'
            this.setState({
                error: errorMes
            })
        }
        else {
            
            const urlFormatedTitle = toTitleCase(this.state.title).trim().replace(/' '/g, '+')

            this.fetchSingleMovieData(urlFormatedTitle)
            .then(movieData => {
                //if the inputed title does not match a movie in OMDB database but a title was suggested
                if (movieData.Title !== urlFormatedTitle) {
                    if (movieData.Title) {

                        const titleNotFoundError = new Error(`Title not found. Did you mean`)
                        titleNotFoundError.button = movieData.Title
                        throw titleNotFoundError;
                    }
                }
                return urlFormatedTitle
            })
            .then(() => {
                this.submitReview(urlFormatedTitle)
            })
            .catch(error => {
                if (error.Error === "Request limit reached!") {
                    const limitReachedError = new Error("Request limit reached! Please try again tomorow :(")
                    this.setState({
                        error: limitReachedError
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

    fetchSingleMovieData = urlFormatedTitle => {
       return new Promise((resolve, reject) => {
            try {
                fetch(`https://www.omdbapi.com/?i=${process.env.REACT_APP_OMDB_API_KEY}&t=${urlFormatedTitle}`, {
                    })
                    .then(res => {
                        return (!res.ok)
                        ? res.json().then(e => reject(e))
                        : res.json()
                    })
                    .then(jres => {
                        if (jres.Response === "False") {
                            throw new Error(jres.Error)
                        }
                        else {
                            resolve(jres)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
                }
            catch(error) {
                reject(error)
            }
        })
    }

    submitReview = title => {

        const newReview = {
            title: title,
            star_rating: this.state.stars,
            user_id: this.props.match.params.user
        }

        const user_id = this.props.match.params.user

        this.fetchInsertNewReview(user_id, newReview)
        .then(res => {
            //If the user was brought here from another tab
            if (this.props.match.params.movie) {
                window.close()
            }
            else {
                setStatePromise(this, {
                    reviewSubmitedPopUp: {status: true, message: `${newReview.title} has been added to your reviews!`}
                })
            }
        })
        .then(() => {
            this.popUpTimer('reviewSubmitedPopUp')
            this.resetForm()
        })
        .catch(error => {

            if (error.message === "This movie has already been reviewed") {
                this.showUpdateReviewPopUp(newReview, error.movie_id)
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

    showUpdateReviewPopUp = (newReview, movie_id) => {
        return new Promise((resolve, reject) => {
            setStatePromise(this, {
                updateReviewPopUp: {
                    status: true, 
                    message: `${newReview.title} has already been reviewed. Would you like to update it with this new data?`,
                    review: newReview,
                    movie_id: movie_id}
            })
            .then(() => {
                resolve()
            })
        })
    }

    fetchInsertNewReview = (user_id, newReview) => {
        return new Promise((resolve, reject) => {
            try {
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
                    ? res.json().then(e => reject(e))
                    : resolve(res.json())
                })
            }
            catch(error) {
                reject(error)
            }
        })
    }

    resetForm = () => {
        this.setState({
            title: '',
            stars: 3
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.setState({
            error: ''
        }, () => 
        this.validateForm(e)
        )
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
                <Nav user={this.props.match.params.user} status={'review-page'}/>
                <header className="new-review-header">
                    <h2 className="route-title">
                        New Review
                    </h2>
                </header>
                <section className="remote-edge">
                    {popUp}
                    {updateReviewPopUp}
                    <ErrorMessage error={this.state.error} addToTitleInput={this.addToTitleInput}/>
                    <form id="movie-review-form" onSubmit={this.handleSubmit}>
                        <div className="form-section">
                            <label htmlFor="movie-title">
                                Movie Title
                            </label>
                            <Autocomplete component={this} currentInput={this.state.title}/>
                        </div>
                        <div className="stars form-section">
                            <label htmlFor="stars-review">
                                Stars(1-5)
                            </label>
                            <input className="review-input" 
                                value={this.state.stars} 
                                onChange={this.changeForm} 
                                id="stars" type="number" 
                                name="stars" 
                                placeholder="1" 
                                min="1" 
                                max="5"/>
                        </div>
                        <button className="remote-button" type="button" 
                            onClick={(e) => this.handleCancel(e)}>
                            Go Back
                        </button>
                        <button className="remote-button" type="submit">
                            Submit
                        </button>
                    </form>
                </section>
                <Link to={`/pastreviews/${this.props.match.params.user}`} key="homepage">
                    <button className="nav-button remote-button">
                        See Past Reviews
                    </button>
                </Link>
                <Footer/>
            </div>
        )
    }
}

export default ReviewMovie