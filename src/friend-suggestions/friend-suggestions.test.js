import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import FriendSuggestions from './friend-suggestions';
// import Enzyme, { shallow, mount, render } from 'enzyme';
// import Adapter from "enzyme-adapter-react-16";

// Enzyme.configure({ adapter: new Adapter() });
describe('<FriendSuggestions/>', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Router>
            <FriendSuggestions match={{params: {user:'1'}}}/>
        </Router>,
        div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
        .create(
            <Router>
                <FriendSuggestions match={{params: {user:'1'}}}/>
            </Router>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});