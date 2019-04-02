import React, {Component} from 'react'
import Nav from '../Navigation/navigation';
import SuggestedUser from '../suggest-user/suggested-user'

class FriendSuggester extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: this.props.users,
        }
    }

    componentDidMount() {
        this.props.findSuggestedFriends(this.props.match.params.user)
    }

    render() {

        const friendSuggestions = this.props.suggestedFriends.map((user, i) => {
            return <SuggestedUser updateSuggestedFriends={this.updateSuggestedFriends} currentUser={this.props.match.params.user} addFriend={this.props.addFriend} user={user} key={i}/>
        })

        return (
            <div>
                <Nav user={this.props.match.params.user}/>
                <main role="main">
                    <header role="banner">
                        <h1>Friend Suggestions</h1>
                    </header>
                    <div>
                        {friendSuggestions}
                    </div>
                </main>
                <footer>Footer</footer>
            </div>
        )
    }
}

export default FriendSuggester