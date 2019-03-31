import React from 'react';
import {Link} from 'react-router-dom'

export default function Nav(props) {

    return (
        <nav>
            {props.status === "landing-page" ? <Link to={'/signup'}>Sign-up</Link> : ''}
            {props.status === "landing-page" ? <Link to={'/login'}>Login</Link> : ''}
            {props.status !== "landing-page" ? <Link to={'/logout'}>Logout</Link> : ''}
            {props.status !== "landing-page" ? <Link to={'/friendsuggestions'}>Friend Suggestions</Link> : ''}
            {props.status !== "landing-page" ? <Link to={'/newreview'}>Review Movie</Link> : ''}
            {props.status !== "homepage" ? props.status !== "landing-page" ? <Link to={'/homepage'}>Home</Link> : '' : ''}
        </nav>
    )
}