import React, {Component} from 'react'
import Nav from '../Navigation/navigation';
import SuggestedUser from '../suggest-user/suggested-user'

class FriendSuggester extends Component {
    render() {

        const friendSuggestions = this.props.users.map((user, i) => {
            return <SuggestedUser user={user} key={i}/>
        })

        return (
            <div>
                <Nav/>
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