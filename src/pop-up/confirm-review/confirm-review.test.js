import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import ConfirmReviewPopUp from './confirm-review';

describe('<ConfirmReviewPopUp/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <ConfirmReviewPopUp user= "1" movie= "Test Movie" hidden="false"/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <ConfirmReviewPopUp user= "1" movie= "Test Movie" hidden="false"/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});