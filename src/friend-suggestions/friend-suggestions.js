import React, {Component} from 'react'
import Nav from '../commonComponents/navigation';
import SuggestedUser from './suggest-user/suggested-user'
import {setStatePromise} from '../util/common';
import PopUp from '../pop-up/pop-up';
import {API_BASE_URL} from '../config'
import TokenService from '../services/token-services';
import ErrorMessage from '../commonComponents/error-message';
import Footer from '../commonComponents/footer';

class FriendSuggester extends Component {

    constructor(props) {
        super(props)
        this.state = {
            friendSuggestions: [],
            followedPopUp: {status: false, newFriend: ''},
            error: ''
        }
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/friend/suggestions/${this.props.match.params.user}`, {
            method: "GET",
            headers: {
                "Authorization": `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
        .then(friendSuggestions => {
            this.setState({
                friendSuggestions: friendSuggestions
            })
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    addNewFriend = (follower_id, friend_id, newFriendUsername) => {

        const newFriendBody = {
            follower_id: follower_id, 
            friend_id: friend_id
        }

        fetch(`${API_BASE_URL}/friend/${follower_id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newFriendBody)
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
        .then(() => {
            this.removeFriendFromState(friend_id)
            setStatePromise(this, {followedPopUp: {status: true, newFriend: newFriendUsername}})
            .then(() => {
                this.popUpTimer()
            })
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    popUpTimer = () => {
        setTimeout(() => {
            this.setState({
                followedPopUp: {status: false, newFriend: ''}
            })
        }, 5000)
    }

    removeFriendFromState = (friend_id) => {
        const newFriendSuggestions = this.state.friendSuggestions.filter(userData => {
            return userData.user_id !== friend_id
        })
        this.setState({
            friendSuggestions: newFriendSuggestions
        })
    }

    render() {

        let friendSuggestionsList = this.state.friendSuggestions.map((user, i) => {
            return <SuggestedUser
                        updateSuggestedFriends={this.updateSuggestedFriends} 
                        currentUser={this.props.match.params.user} 
                        addNewFriend={this.addNewFriend} 
                        user={user} 
                        key={i}/>
        })

        if (friendSuggestionsList.length === 0) {
            friendSuggestionsList = <p className="no-listings-hints">No suggestions. Try reviewing more movies to get more suggestions.</p>
        }

        const popUp = this.state.followedPopUp.status ? <PopUp 
                                                            message={`${this.state.followedPopUp.newFriend} has been added as a friend and your movie suggestions have been updated!`}/> : "";

        return (
            <div>
                <Nav user={this.props.match.params.user} status={'friend-suggestions-page'}/>
                <main role="main">
                    {popUp}
                    <header role="banner" className="friend-suggestions">
                        <h1>Friend Suggestions</h1>
                    </header>
                    <div className="friend-suggestions-list remote-edge">
                        <ErrorMessage error={this.state.error} />
                        {friendSuggestionsList}
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default FriendSuggester