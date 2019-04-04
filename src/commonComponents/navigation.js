import React from 'react';
import {Link} from 'react-router-dom'

export default function Nav(props) {

    return (
        <nav>
            {props.status === "landing-page" ? <Link to={'/signup'}>Sign-up</Link> : ''}
            {props.status === "landing-page" ? <Link to={'/login'}>Login</Link> : ''}
            {props.status !== "landing-page" ? <Link to={'/'}>Logout</Link> : ''}
            {props.status !== "landing-page" ? <Link to={`/friendsuggestions/${props.user}`}>Friend Suggestions</Link> : ''}
            {props.status !== "landing-page" ? <Link to={`/newreview/${props.user}`}>Review Movie</Link> : ''}
            {props.status !== "homepage" ? props.status !== "landing-page" ? <Link to={`/homepage/${props.user}`}>Home</Link> : '' : ''}
        </nav>
    )
}