import React, {Component} from 'react'
import Nav from '../Navigation/navigation';
import SuggestedUser from '../suggest-user/suggested-user'
import {setStatePromise} from '../util/common';
import PopUp from '../pop-up/pop-up';

class FriendSuggester extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: this.props.users,
            followedPopUp: {status: false, newFriend: ''}
        }
    }

    componentDidMount() {
        this.props.findSuggestedFriends(this.props.match.params.user)
    }

    addNewFriend = (currentUser, newUser) => {
        this.props.addFriend(currentUser, newUser)
        setStatePromise(this, {followedPopUp: {status: true, newFriend: newUser}})
        .then(() => {
            this.popUpTimer()
        })
    }

    popUpTimer = () => {
        setTimeout(() => {
            this.setState({
                followedPopUp: {status: false, newFriend: ''}
            })
        }, 5000)
    }

    render() {

        const friendSuggestions = this.props.suggestedFriends.map((user, i) => {
            return <SuggestedUser
                        updateSuggestedFriends={this.updateSuggestedFriends} 
                        currentUser={this.props.match.params.user} 
                        addNewFriend={this.addNewFriend} 
                        user={user} 
                        key={i}/>
        })

        const popUp = this.state.followedPopUp.status ? <PopUp 
                                                            message={`${this.state.followedPopUp.newFriend} has been added as a friend and your movie suggestions have been updated!`}/> : "";

        return (
            <div>
                <Nav user={this.props.match.params.user}/>
                <main role="main">
                    {popUp}
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