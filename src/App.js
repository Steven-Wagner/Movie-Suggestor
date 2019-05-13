import React, { Component } from 'react';
import LandingPage from './landing-page/landing-page'
import { Route } from 'react-router-dom';
import Signup from './sign-up/sign-up';
import Homepage from './home-page/home-page';
import FriendSuggester from './friend-suggestions/friend-suggestions';
import ReviewMovie from './review-movie/review-movie';
import Login from './login/login';
import SeePastReviews from './see-past-reviews/see-past-reviews';

class App extends Component {

  render() {

    return (
      <main className="main-app-container remote-edge">
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
            />
          }}
        />
        <Route 
          path="/newreview/:user/:movie"
          render={(props)=>
            <ReviewMovie
            {...props}
            />
          }
        />
        <Route 
          exact path="/newreview/:user"
          render={(props)=>
            <ReviewMovie
            {...props}
            />
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
            {...props}
            />
          }
        />
        <Route 
          path="/friendsuggestions/:user"
          render={(props)=>
            <FriendSuggester 
            {...props}/>
          }
        />
        <Route 
          path="/pastreviews/:user"
          render={(props)=>
            <SeePastReviews
            {...props}/>
          }
        />
      </main>
    );
  }
}

export default App;
