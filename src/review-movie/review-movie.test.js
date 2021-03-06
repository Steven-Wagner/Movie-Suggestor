import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import ReviewMovie from './review-movie';

describe('<ReviewMovie/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <ReviewMovie match={{params: {movie: 'Test Movie', user: "1"}}}/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <ReviewMovie match={{params: {movie: 'Test Movie', user: "1"}}}/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});