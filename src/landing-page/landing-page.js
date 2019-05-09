import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Nav from '../commonComponents/navigation'
import MainBanner from '../commonComponents/main-banner';
import Footer from '../commonComponents/footer';

class LandingPage extends Component {
    render() {

    return(
        <div>
            <Nav status="landing-page"/>
            <main role="main">
                <MainBanner/>
                <section className="remote-edge">
                    <header>
                        <h3>Get suggestions from people just like you</h3>
                    </header>
                    <p>[<em>placeholder for screenshot movie suggestions</em>]</p>
                    <p>Movie Suggestor allows you to follow people that have similar movie intrests and gives you movie suggestions based on the friends you follow.</p>
                </section>
                <section className="remote-edge">
                    <header>
                        <h3>Review Movies</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of movie review form</em>]</p>
                    <p>Review movies in seconds and help the people that follow you get personalized movie suggestions.</p>
                </section>
                <section className="remote-edge">
                    <header>
                        <h3>Start Getting Suggestions Now</h3>
                        <Link to="/signup">Sign-up!</Link>
                    </header>
                </section>
            </main>
            <Footer/>
        </div>
    )
    }
}

export default LandingPage