import React, {Component} from 'react';
import MovieSuggestion from '../movie-suggestion/movie-suggestion'

class SuggestionsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movieSuggestions: this.props.movieSuggestions,
            users: this.props.users,
            sortedMovies: []
        }
    }

    componentDidMount() {
        const userInfo = this.state.users.find(usr => {
            return usr.username === this.props.user
        })

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
        console.log('suggestions', suggestions)
        const avgSuggestions = suggestions.map(suggestion => {
            const sum = (a, b) => parseInt(a) + parseInt(b)
            const totalRating = suggestion.rating.reduce(sum)
            
            const newAvg = totalRating/suggestion.rating.length

            suggestion.rating = newAvg

            return suggestion
        })
        const sortedAvgSuggestions = this.sortSuggestions(avgSuggestions)
        this.setState({
            sortedMovies: sortedAvgSuggestions
        })
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

    handleWatchedIt = (index, movie) => {
        this.handleRemoveMovie(index)
        //Add a modal here to ask to give review
        //need to find a way to prepopulate a the review with the title
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

        return (
            <div className="suggestions-list">
                {movies}
            </div>
        )
    }
}

export default SuggestionsList