import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import PastReview from './past-review';

describe('<PastReviews/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <PastReview reviewData={{title: "Test Title", imdb_id: "imdb test", director: "Test Director", release_year: "2019", star_rating: '3'}}/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <PastReview reviewData={{title: "Test Title", imdb_id: "imdb test", director: "Test Director", release_year: "2019", star_rating: '3'}}/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});