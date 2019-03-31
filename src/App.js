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
      currentTitle: 'test'
    }
  }

  render() {
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
            goToHome={()=> history.push('/homepage')}
            users={users}
            />
          }}
        />
        <Route 
          path="/newreview"
          render={({history})=>
            <ReviewMovie
            backOne={() => history.goBack()}/>
          }
        />
        <Route 
          path="/login"
          render={({history})=>
            <Login clickCancel={()=> history.push('/')}
            goToHome={()=> history.push('/homepage')}
            />
          }
        />
        <Route 
          path="/homepage"
          render={({history})=>
            <Homepage 
            movieSuggestions={movieSuggestions}
            />
          }
        />
        <Route 
          path="/friendsuggestions"
          render={()=>
            <FriendSuggester users={users}/>
          }
        />
      </main>
    );
  }
}

export default App;
