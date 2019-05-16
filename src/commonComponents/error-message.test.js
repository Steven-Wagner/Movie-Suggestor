import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import ErrorMessage from './error-message';

describe('<ErrorMessage/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <ErrorMessage error={{message: 'This is a test Error', button: 'button is rendered'}} />
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <ErrorMessage error={{message: 'This is a test Error', button: 'button is rendered'}}/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
})