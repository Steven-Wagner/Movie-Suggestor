import React, {Component} from 'react';
import MovieSuggestion from './movie-suggestion/movie-suggestion'
import {setStatePromise} from '../../util/common'
import ConfirmReviewPopUp from '../../pop-up/confirm-review/confirm-review'
import {API_BASE_URL} from '../../config'
import TokenService from '../../services/token-services'
import ErrorMessage from '../../commonComponents/error-message';
import PopUp from '../../pop-up/pop-up';
import {Link} from 'react-router-dom';

class SuggestionsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sortedMovies: [],
            confirmReview: {status: false, movie: ''},
            error: '',
            errorPopUp: {status: false, error: ''}
        }
        this.timoutHandle = 0;
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/moviesuggestions/${this.props.match.params.user_id}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
        .then(listOfMovies => {
            this.setSortedMovies(listOfMovies)
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle)
    }

    setSortedMovies = sortedAvgSuggestions => {
        this.setState({
            sortedMovies: sortedAvgSuggestions
        })
    }

    handleRemoveMovie = (index, reason='not_interested') => {
        const newSuggestions = this.state.sortedMovies.slice()
        const movieToRemove = newSuggestions.splice(index, 1)

        const movie_id = movieToRemove[0].movie_id

        const movieToIgnore = {
            user_id: this.props.match.params.user_id,
            movie_id: movie_id,
            ignore: reason
        }

        fetch(`${API_BASE_URL}/ignore/${movieToIgnore.user_id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(movieToIgnore)
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
        .then(id => {
            this.setState({
                sortedMovies: newSuggestions
            })
        })
        .catch(error => {
            this.setState({
                errorPopUp: {status:true, erorr: error.message}
            })
        })
    }

    removeReviewPopup = () => {
        clearTimeout(this.timeoutHandle)
        this.setState({
            confirmReview: {status: false, movie: ''}
        })
    }

    handleWatchedIt = (index, movie) => {
        setStatePromise(this, {
            confirmReview: {status: false, movie: ''}
        })
        .then(() => {
            setStatePromise(this, {
                confirmReview: {status: true, movie: movie}
            })
        })
        .then(() => {
        this.popUpTimer()
        this.handleRemoveMovie(index, 'watched_it')
        })
    }

    popUpTimer = () => {
        clearTimeout(this.timeoutHandle)

        this.timeoutHandle = setTimeout(() => {
            this.setState({
                confirmReview: {status: false, movie: ''}
            })
            this.timeoutHandle = 0;
        }, 5000)
    }

    render() {

        let movies;

        if (!this.state.sortedMovies || this.state.sortedMovies.length === 0) {
            movies = <p>Try getting 
                <Link to={`/friendsuggestions/${this.props.match.params.user_id}`} key="friend-suggestions-page">
                    <button className="nav-button remote-button">Friend Suggestions</button>
                </Link> 
                and 
                <Link to={`/newreview/${this.props.match.params.user_id}`} key="review-page">
                    <button className="nav-button remote-button">Review Movie</button>
                </Link>
                to get suggestions.</p>
        }
        else {
            movies = this.state.sortedMovies.map((movie, i) => {
                return <MovieSuggestion movieData={movie} key={i} index={i} handleRemoveMovie={this.handleRemoveMovie} handleWatchedIt={this.handleWatchedIt}/>
            })
        }

        const watchedItPopup = this.state.confirmReview.status
            ? <ConfirmReviewPopUp 
                movie={this.state.confirmReview.movie} 
                props={this.props}
                user_id={this.props.match.params.user_id}
                removeReviewPopup={this.removeReviewPopup}/>
            : ''
            
        const errorPopUp = this.state.errorPopUp.status
            ? <PopUp message={this.state.errorPopUp.error}/>
            : ''

        return (
            <div className="suggestions-list remote-edge">
                <ErrorMessage error={this.state.error} />
                {watchedItPopup}
                {movies}
                {errorPopUp}
            </div>
        )
    }
}

export default SuggestionsList