import React, {Component} from 'react';
import MovieSuggestion from '../movie-suggestion/movie-suggestion'
import {setStatePromise} from '../util/common';
import ConfirmReviewPopUp from '../confirm-review/confirm-review';

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
        const listOfMovies = this.getListOfMovies()

        this.setSortedMovies(listOfMovies)
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle)
    }

    getListOfMovies = () => {
        const userInfo = this.state.users.find(usr => {
            return usr.username === this.props.user
        })

        const movieSuggestions = this.getCurrentUsersMovieSuggestions(userInfo)
        
        const avgSuggestions = this.getAvgSuggestions(movieSuggestions)

        const sortedAvgSuggestions = this.sortSuggestions(avgSuggestions)
    
        return sortedAvgSuggestions
    }

    setSortedMovies = sortedAvgSuggestions => {
        this.setState({
            sortedMovies: sortedAvgSuggestions
        })
    }

    getAvgSuggestions = movieSuggestions => {
        return (
            movieSuggestions.map(suggestion => {
                const sum = (a, b) => parseInt(a) + parseInt(b)
                const totalRating = suggestion.rating.reduce(sum)
                
                const newAvg = totalRating/suggestion.rating.length
    
                suggestion.rating = newAvg
    
                return suggestion
            })
        )
    }

    getCurrentUsersMovieSuggestions = userInfo => {
        const suggestions = [];

        userInfo.friends.forEach(friend => {
            this.state.movieSuggestions[friend].reviews.forEach(review => {
                if (suggestions.length === 0) {
                    suggestions.push({
                        title: review.title,
                        releaseDate: review.releaseDate,
                        img: review.img,
                        rating: [review.rating],
                    })
                }
                else {
                    let done = false;
                    let index = 0
                    while (!done) {
                        if (suggestions[index]) {
                            if (suggestions[index].title === review.title) {
                                suggestions[index].rating = [...suggestions[index].rating, review.rating]
                                done = true
                            }
                        }
                        if (index > suggestions.length-1) {
                            suggestions.push({
                                title: review.title,
                                releaseDate: review.releaseDate,
                                img: review.img,
                                rating: [review.rating],
                            })
                            done = true
                        }
                        index += 1
                    }
                }
            })
        })
        return suggestions
    }

    sortSuggestions = avgSuggestions => {
        var len = avgSuggestions.length;
        for (var i = len-1; i>=0; i--){
          for(var j = 1; j<=i; j++){
            if(avgSuggestions[j-1].rating < avgSuggestions[j].rating){
                var temp = avgSuggestions[j-1];
                avgSuggestions[j-1] = avgSuggestions[j];
                avgSuggestions[j] = temp;
             }
          }
        }
        return avgSuggestions;
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
            confirmReview: {status: true, movie: movie}
        })
        .then(() => {
        this.popUpTimer()
        this.handleRemoveMovie(index)
        })
        //Add a modal here to ask to give review
        //need to find a way to prepopulate a the review with the title
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