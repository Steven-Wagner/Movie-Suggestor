import React, { Component } from 'react';
import LandingPage from './landing-page/landing-page'
import { Route } from 'react-router-dom';
import Signup from './sign-up/sign-up';
import {movieSuggestions, users} from './dataModel/fakeData'
import Homepage from './home-page/home-page';
import FriendSuggester from './friend-suggestions/friend-suggestions';
import ReviewMovie from './review-movie/review-movie';
import Login from './login/login';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: users,
      movieSuggestions: movieSuggestions,
      suggestedFriends: []
    }
  }

  findSuggestedFriends = (thisUser) => {
    const currentUser = this.state.users.find(usr => usr.username === thisUser)

    const suggested = this.state.users.filter(usr => {
        if (usr.username === currentUser.username) {
            return false
        }
        const alreadyFriends = currentUser.friends.find(friend => {
            return friend === usr.username 
        })
        if (alreadyFriends) {
            return false
        }
        return true
    })
    this.setState({
        suggestedFriends: suggested
    })
}

  addUser = user => {
    const copy = Object.assign({}, this.state.movieSuggestions)
    console.log('moviecopy', copy)
    copy[user.username] = {reviews: []}
    this.setState({
      users: [...this.state.users, user],
      movieSuggestions: copy
    })
  }

  addFriend = (user, newFriend) => {
    let empty;

    const userListCopy =  Object.assign(this.state.users, empty)

    const updatedUsers = userListCopy.map(usr => {
      if (usr.username === user) {
        usr.friends.push(newFriend)
      }
      return usr
    })
    this.setState({
      users: updatedUsers
    }, () => this.findSuggestedFriends(user))
    
  }

  addNewReview = (username, newReview) => {
    console.log('username', username)
    const newCopy = Object.assign({}, this.state.movieSuggestions)
    newCopy[username].reviews.push(newReview)
    console.log('newCopy', newCopy)
    this.setState({
      movieSuggestions: newCopy
    })
  }

  render() {

    console.log('movieSug', movieSuggestions)

    return (
      <main className="App">
        <Route 
          exact path="/"
          component={LandingPage}
        />
        <Route 
          path="/signup"
          render={({history})=> {
            return <Signup
            clickCancel={()=> history.push('/')}
            goToHome={(currentUser)=> history.push(`/homepage/${currentUser}`)}
            users={this.state.users}
            addUser={this.addUser}
            />
          }}
        />
        <Route 
          path="/newreview/:user/:movie"
          render={(props)=>
            <ReviewMovie
            {...props}
            addNewReview={this.addNewReview}/>
          }
        />
        <Route 
          exact path="/newreview/:user"
          render={(props)=>
            <ReviewMovie
            {...props}
            addNewReview={this.addNewReview}/>
          }
        />
        <Route 
          path="/login"
          render={({history, props})=>
            <Login clickCancel={()=> history.push('/')}
            goToHome={(currentUser)=> history.push(`/homepage/${currentUser}`)}
            />
          }
        />
        <Route 
          path="/homepage/:user"
          render={(props)=>
            <Homepage 
            users={this.state.users}
            movieSuggestions={this.state.movieSuggestions}
            {...props}
            />
          }
        />
        <Route 
          path="/friendsuggestions/:user"
          render={(props)=>
            <FriendSuggester suggestedFriends={this.state.suggestedFriends} findSuggestedFriends={this.findSuggestedFriends} removeSuggestedFriend={this.removeSuggestedFriend} addFriend={this.addFriend} users={this.state.users} {...props}/>
          }
        />
      </main>
    );
  }
}

export default App;
