import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Homepage from './home-page';

describe('<Homepage/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <Homepage match={{params: {user: "1"}}}/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <Homepage match={{params: {user: "1"}}}/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});