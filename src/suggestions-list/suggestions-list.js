import React, {Component} from 'react';
import MovieSuggestion from '../movie-suggestion/movie-suggestion'

class SuggestionsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movieSuggestions: this.props.movieSuggestions
        }
    }

    handleRemoveMovie = index => {
        const newSuggestions = this.state.movieSuggestions.slice()
        newSuggestions.splice(index, 1)
        this.setState({
            movieSuggestions: newSuggestions
        })
    }

    handleWatchedIt = (index, movie) => {
        this.handleRemoveMovie(index)
        //Add a modal here to ask to give review
        //need to find a way to prepopulate a the review with the title
    }

    render() {

        let movies;

        if (!this.state.movieSuggestions || this.state.movieSuggestions.length === 0) {
            movies = "Try following some friends and reviewing some movies to get suggestions."
        }
        else {
            movies = this.state.movieSuggestions.map((movie, i) => {
                return <MovieSuggestion movieData={movie} key={i} index={i} handleRemoveMovie={this.handleRemoveMovie} handleWatchedIt={this.handleWatchedIt}/>
            })
        }

        return (
            <div className="suggestions-list">
                {movies}
            </div>
        )
    }
}

export default SuggestionsList