import React, {Component} from 'react'
import Nav from '../commonComponents/navigation';
import MainBanner from '../commonComponents/main-banner';
import SuggestionsList from './suggestions-list/suggestions-list';
import Footer from '../commonComponents/footer';

class Homepage extends Component {
    render() {
        return (
            <div>
                <Nav status="homepage" user={this.props.match.params.user}/>
                <main role="main">
                    <MainBanner/>
                    <SuggestionsList user={this.props.match.params.user} {...this.props}/>     
                </main>
                <Footer/>
            </div>
        )
    }
}

export default Homepage