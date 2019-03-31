import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Nav from '../Navigation/navigation'
import MainBanner from '../main-banner/main-banner';

class LandingPage extends Component {
    render() {

    return(
        <div>
            {/*link to homepage for testing purposes. Remove before deploy*/}
            <Link to="homepage">Homepage Test</Link>
            <Nav status="landing-page"/>
            <main role="main">
                <MainBanner/>
                <section>
                    <header>
                        <h3>Get suggestions from people just like you</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of dream recording interface</em>]</p>
                    <p>Movie Suggestor allows you to follow people that have similar movie intrests and likes and gives you movie suggestions based on the friends you follow.</p>
                </section>
                <section>
                    <header>
                        <h3>Review Movies</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of dream recording interface</em>]</p>
                    <p>Review movies in seconds and help the people that follow you get personalized movie suggestions.</p>
                </section>
                <section>
                    <header>
                        <h3>Start Getting Suggestions Now</h3>
                        <Link to="/signup">Sign-up!</Link>
                    </header>
                </section>
            </main>
            <footer>Footer</footer>
        </div>
    )
    }
}

export default LandingPage