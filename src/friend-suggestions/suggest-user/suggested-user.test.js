import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import SuggestedUser from './suggested-user';

describe('<SuggestedUser', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <SuggestedUser user={{bio:"test bio", username:"test user", match_score: "3", user_id: "2"}} currentUser="1"/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <SuggestedUser user={{bio:"test bio", username:"test user", match_score: "3", user_id: "2"}} currentUser="1"/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});