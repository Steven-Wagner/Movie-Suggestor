import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import MovieSuggestion from './movie-suggestion';

describe('<MovieSuggestions/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <MovieSuggestion movieData={{title: "Test Title", imdb_id: "imdb test", director: "Test Director", release_year: "2019", avg: '3'}}/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <MovieSuggestion movieData={{title: "Test Title", imdb_id: "imdb test", director: "Test Director", release_year: "2019", avg: '3'}}/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});
