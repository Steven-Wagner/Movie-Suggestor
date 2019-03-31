import React, {Component} from 'react'
import Nav from '../Navigation/navigation';
import MainBanner from '../main-banner/main-banner';
import SuggestionsList from '../suggestions-list/suggestions-list'

class Homepage extends Component {
    render() {
        return (
            <div>
                <Nav status="homepage"/>
                <main role="main">
                    <MainBanner/>
                    <SuggestionsList movieSuggestions={this.props.movieSuggestions}/>          
                </main>
                <footer>Footer</footer>
            </div>
        )
    }
}

export default Homepage