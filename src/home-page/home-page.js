import React, {Component} from 'react'
import Nav from '../commonComponents/navigation';
import MainBanner from '../commonComponents/main-banner';
import SuggestionsList from './suggestions-list/suggestions-list'

class Homepage extends Component {
    render() {
        return (
            <div>
                <Nav status="homepage" user={this.props.match.params.user}/>
                <main role="main">
                    <MainBanner/>
                    <SuggestionsList user={this.props.match.params.user} movieSuggestions={this.props.movieSuggestions} users={this.props.users} {...this.props}/>     
                </main>
                <footer>Footer</footer>
            </div>
        )
    }
}

export default Homepage