import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Nav from './navigation';

describe('<Nav/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <Nav user="testuser" status="homepage"/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    describe(`renders correctly for all pages`, () => {

        const pages = ["landing-page", "homepage", "friend-suggestions-page", "review-page", "past-reviews", "signUp", "login"]

        pages.forEach(status => {

            it(`renders ${status} Nav UI as expected`, () => {
                const tree = renderer
                .create(
                    <Router>
                        <Nav user="testuser" status={status}/>
                    </Router>)
                .toJSON();
                expect(tree).toMatchSnapshot();  
            });
        })
    });
});