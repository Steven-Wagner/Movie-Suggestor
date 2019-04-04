import React, {Component} from 'react';
import MovieSuggestion from './movie-suggestion/movie-suggestion'
import {setStatePromise} from '../../util/common'
import ConfirmReviewPopUp from '../../pop-up/confirm-review/confirm-review'
import {getListOfMovies} from '../../util/movieSuggestionsAlgorithims'

class SuggestionsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movieSuggestions: this.props.movieSuggestions,
            users: this.props.users,
            sortedMovies: [],
            confirmReview: {status: false, movie: ''}
        }
        this.timoutHandle = 0;
    }

    componentDidMount() {
        const listOfMovies = getListOfMovies(
            this.props.user, 
            this.state.users, 
            this.state.movieSuggestions)

        this.setSortedMovies(listOfMovies)
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle)
    }

    setSortedMovies = sortedAvgSuggestions => {
        this.setState({
            sortedMovies: sortedAvgSuggestions
        })
    }

    handleRemoveMovie = index => {
        const newSuggestions = this.state.sortedMovies.slice()
        newSuggestions.splice(index, 1)
        this.setState({
            sortedMovies: newSuggestions
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
        this.handleRemoveMovie(index)
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
            movies = "Try following some friends and reviewing some movies to get suggestions."
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
                removeReviewPopup={this.removeReviewPopup}/>
            : ''

        return (
            <div className="suggestions-list">
                {watchedItPopup}
                {movies}
            </div>
        )
    }
}

export default SuggestionsList