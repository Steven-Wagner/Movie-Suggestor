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
            />
          }}
        />
        <Route 
          path="/newreview"
          component={ReviewMovie}
        />
        <Route 
          path="/login"
          render={({history})=>
            <Login clickCancel={()=> history.push('/')}
            />
          }
        />
        <Route 
          path="/homepage"
          render={()=>
            <Homepage movieSuggestions={movieSuggestions}/>
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
