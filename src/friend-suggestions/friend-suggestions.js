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

        this.timeoutHandle = 0
    }

    componentDidMount() {
        this.fetchFriendSuggestions()
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

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle)
    }

    fetchFriendSuggestions = () => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/friend/suggestions/${this.props.match.params.user}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => reject(e))
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error)
            }
        })
    }

    addNewFriend = (follower_id, friend_id, newFriendUsername) => {

        const newFriendBody = {
            follower_id: follower_id, 
            friend_id: friend_id
        }

        this.fetchPostNewFriend(follower_id, newFriendBody)
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

    fetchPostNewFriend = (follower_id, newFriendBody) => {
        return new Promise((resolve, reject) => {
            try {
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
                        ? res.json().then(e => reject(e))
                        : resolve(res.json())
                })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    popUpTimer = () => {
        clearTimeout(this.timeoutHandle)
        this.timeoutHandle = setTimeout(() => {
            this.setState({
                followedPopUp: {status: false, newFriend: ''}
            })
            this.timeoutHandle = 0
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

        const popUp = this.state.followedPopUp.status 
            ? <PopUp 
                message={`${this.state.followedPopUp.newFriend} has been added as a friend and your movie suggestions have been updated!`}/> 
            : "";

        return (
            <div>
                <Nav user={this.props.match.params.user} status={'friend-suggestions-page'}/>
                <main role="main">
                    {popUp}
                    <header role="banner" className="friend-suggestions">
                        <h2 className="route-title">Friend Suggestions</h2>
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