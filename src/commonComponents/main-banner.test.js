import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import MainBanner from './main-banner';

describe('<MainBanner/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <MainBanner />
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <MainBanner/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
})