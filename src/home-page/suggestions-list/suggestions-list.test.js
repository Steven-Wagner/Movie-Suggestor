import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import SuggestionsList from './suggestions-list';
// import Enzyme, { shallow, mount, render, setState } from 'enzyme';
// import Adapter from "enzyme-adapter-react-16";
// import waitUntil from 'async-wait-until';
// import nock from 'nock';
// import {API_BASE_URL} from '../../config';

// Enzyme.configure({ adapter: new Adapter() });
describe('<SuggestionsList/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <SuggestionsList match={{params: {user: "1"}}}/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <SuggestionsList match={{params: {user: "1"}}}/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});

// it('movies are rendered correctly', () => {
//     const suggestionsListWrapper = mount(
//         <Router>
//             <SuggestionsList match={{params: {user: "1"}}}/>
//         </Router>
//     );

//     suggestionsListWrapper.setState(
//         {sortedMovies: [{title: "Test Title", imdb_id: "imdb test", director: "Test Director", release_year: "2019", avg: '3', movie_id: '1'}]
//     });
//     console.log('movie added', suggestionsListWrapper.state())

//     // expect(suggestionsListWrapper.find(MovieSuggestion)).to.have.lengthOf(0)

//     expect(suggestionsListWrapper).toMatchSnapshot();
// })

// describe('<SuggestionsList /> test API', () => {
//     beforeAll(() => {
//       // Prepare nock to respond to a request
//       // to the weather API.
//       // In this case our test will always think that london
//       // is sunny.

//       nock("https://arcane-caverns-82267.herokuapp.com")
//         .persist()
//         .get("/api/moviesuggestions/1/")
//         .reply(200, 
//              [{title: "Test Title", imdb_id: "imdb test", director: "Test Director", release_year: "2019", avg: '3', movie_id: '1'}]
//         );
//     });
//     it('Component fetching movies from API', async (done) => {
//         const root = mount(
//         <Router>
//             <SuggestionsList match={{params: {user: "1"}}}/>
//         </Router>);
//         // We wait until the state has a weather summary, but we
//         // don't care yet about the content.
//         await waitUntil(() => root.find(SuggestionsList).instance().state.sortedMovies.length !== 0);
//         // It is better to have the expectation here and not inside
//         // the waitUntil condition.
//        expect(root.state('sortedMovies')).toEqual([{title: "Test Title", imdb_id: "imdb test", director: "Test Director", release_year: "2019", avg: '3', movie_id: '1'}]);
//        done();
//     });
//   });