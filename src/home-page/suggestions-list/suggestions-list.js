import React, {Component} from 'react';
import MovieSuggestion from './movie-suggestion/movie-suggestion'
import {setStatePromise} from '../../util/common'
import ConfirmReviewPopUp from '../../pop-up/confirm-review/confirm-review'
import {API_BASE_URL} from '../../config'
import TokenService from '../../services/token-services'
import ErrorMessage from '../../commonComponents/error-message';
import PopUp from '../../pop-up/pop-up';
import {Link} from 'react-router-dom';
import changeLoadingStatusTo from '../../util/changeLoadingStatus';
import LoadingMessage from '../../commonComponents/loading-message';

class SuggestionsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sortedMovies: [],
            confirmReview: {status: false, movie: ''},
            error: '',
            errorPopUp: {status: false, error: ''},
            loading: {status: false}
        }
        this.timoutHandle = 0;
    }

    componentDidMount() {
        changeLoadingStatusTo(this, true)
        .then(() => {
            this.fetchMovieSuggestions(this.props.match.params.user)
            .then(listOfMovies => {
                changeLoadingStatusTo(this, false)
                .then(() => {
                    this.setSortedMovies(listOfMovies)
                })
            })
            .catch(error => {
                changeLoadingStatusTo(this, false)
                .then(() => {
                    this.setState({
                        error: error
                    })
                })
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

    fetchMovieSuggestions = user_id => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/moviesuggestions/${user_id}`, {
                    method: "GET",
                    headers: {
                        'authorization': `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => Promise.reject(e))
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error)
            }
        })
    }

    handleRemoveMovie = (index, reason='not_interested') => {
        //Make a copy of sortedMovies so that we can later update state with newSuggestions
        const newSuggestions = this.state.sortedMovies.slice()
        //Remove the movie to ignore from newSuggestions array
        const movieToRemove = newSuggestions.splice(index, 1)

        const movie_id = movieToRemove[0].movie_id

        const user_id = this.props.match.params.user

        const movieToIgnore = {
            user_id: user_id,
            movie_id: movie_id,
            ignore: reason
        }
        this.fetchPostMovieToIgnore(user_id, movieToIgnore)
        .then(id => {
            this.setSortedMovies(newSuggestions)
        })
        .catch(error => {
            this.setState({
                errorPopUp: {status:true, erorr: error.message}
            })
        })
    }

    fetchPostMovieToIgnore = (user_id, movieToIgnore) => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/ignore/${user_id}`, {
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
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error)
            }
        })
    }

    removeReviewPopup = () => {
        clearTimeout(this.timeoutHandle)
        this.setState({
            confirmReview: {status: false, movie: ''}
        })
    }

    handleWatchedIt = (index, movie) => {
        //Removes any old popup window
        setStatePromise(this, {
            confirmReview: {status: false, movie: ''}
        })
        .then(() => {
            //adds new popup window
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
        //Adds a timer that will remove the popup window after 5 seconds
        clearTimeout(this.timeoutHandle)

        this.timeoutHandle = setTimeout(() => {
            this.setState({
                confirmReview: {status: false, movie: ''}
            })
            this.timeoutHandle = 0;
        }, 5000)
    }

    determainMainContent = () => {
        let mainContent;
        
        //should loading message be displayed?
        if (this.state.loading.status) {
            mainContent = <LoadingMessage/>
        }

        //if there are no movie suggestions
        if (!this.state.loading.status) {
            if (!this.state.sortedMovies || this.state.sortedMovies.length === 0) {
                mainContent = <p className="no-listings-hints">
                    You must have friends to get movie suggestions try  
                    <Link to={`/friendsuggestions/${this.props.match.params.user}`} key="friend-suggestions-page">
                        <button className="nav-button remote-button">Friend Suggestions</button>
                    </Link> 
                    . If you don't have any friend suggestions don't worry. We try to match users with friends that have reviewed similar movies. Try
                    <Link to={`/newreview/${this.props.match.params.user}`} key="review-page">
                        <button className="nav-button remote-button">Review Movie</button>
                    </Link>
                    to get more friend suggestions.</p>
            }
        //display movie suggestions
            else {
                mainContent = this.state.sortedMovies.map((movie, i) => {
                    return <MovieSuggestion movieData={movie} key={i} index={i} handleRemoveMovie={this.handleRemoveMovie} handleWatchedIt={this.handleWatchedIt}/>
                })
            }
        }
        return mainContent
    }

    render() {

        const mainContent = this.determainMainContent();

        const watchedItPopup = this.state.confirmReview.status
            ? <ConfirmReviewPopUp 
                movie={this.state.confirmReview.movie} 
                props={this.props}
                user={this.props.match.params.user}
                removeReviewPopup={this.removeReviewPopup}/>
            : ''
            
        const errorPopUp = this.state.errorPopUp.status
            ? <PopUp message={this.state.errorPopUp.error}/>
            : ''

        return (
            <div className="suggestions-list remote-edge">
                <ErrorMessage error={this.state.error} />
                {watchedItPopup}
                {mainContent}
                {errorPopUp}
            </div>
        )
    }
}

export default SuggestionsList