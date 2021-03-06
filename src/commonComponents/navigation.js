import React from 'react';
import {Link} from 'react-router-dom'
import tokenService from '../services/token-services'

export default function Nav(props) {

    const signUp = 
        <Link to={'/signup'} key="sign-Up">
            <button className="nav-button remote-button">Sign-up</button>
        </Link>
    const friendSuggestions = 
        <Link to={`/friendsuggestions/${props.user}`} key="friend-suggestions-page">
            <button className="nav-button remote-button">Friend Suggestions</button>
        </Link>
    const reviewMovie = 
        <Link to={`/newreview/${props.user}`} key="review-page">
            <button className="nav-button remote-button">Review Movie</button>
        </Link>
    const logIn = 
        <Link to={'/login'} key="login-page">
            <button className="nav-button remote-button">Login</button>
        </Link>
    const logOut = 
        <Link to={'/'} key="log-out">
            <button className="nav-button remote-button" onClick={() => logUserOut()}>Logout</button>
        </Link>
    const homePage = 
        <Link to={`/homepage/${props.user}`} key="homepage">
            <button className="nav-button remote-button">Home</button>
        </Link>
    const pastReviews = 
    <Link to={`/pastreviews/${props.user}`} key="pastreviews">
        <button className="nav-button remote-button">
            Past Reviews
        </button>
    </Link>

    
    const navLinksToInclude = {
        "landing-page": [signUp, logIn],
        "homepage": [friendSuggestions, reviewMovie, pastReviews, logOut],
        "review-page": [homePage, friendSuggestions, pastReviews, logOut],
        "friend-suggestions-page": [homePage, reviewMovie, pastReviews, logOut],
        "login": [signUp],
        "signUp": [logIn],
        "past-reviews": [homePage, friendSuggestions, reviewMovie, logOut]
    }

    const currentNavLinks = navLinksToInclude[props.status]

    const Nav =
        <nav>
            {currentNavLinks}
        </nav>

    return (
        <div className="nav-wrapper">
            {Nav}
        </div>
    )
}

function logUserOut() {
    tokenService.clearAuthToken()
}