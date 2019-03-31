import React, {Component} from 'react';
import MovieSuggestion from '../movie-suggestion/movie-suggestion'

class SuggestionsList extends Component {

    render() {

        let movies;

        if (!this.props.movieSuggestions) {
            movies = "Try following some friends and reviewing some movies to get suggestions."
        }
        else {
            movies = this.props.movieSuggestions.map((movie, i) => {
                return <MovieSuggestion movieData={movie} key={i}/>
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