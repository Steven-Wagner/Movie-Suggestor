import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import PopUp from './pop-up';

describe('<PopUp', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <PopUp message= "Test Message"/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <PopUp message= "Test Message"/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});