import React from 'react';
import Main from '../Main';
import renderer from 'react-test-renderer';

/*
describe('<Feed />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Feed />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});

*/
test('renders correctly', () => {
    const tree = renderer.create(<Main />).toJSON();
    expect(tree).toMatchSnapshot();
});