import React from 'react';
import Feed from '../Feed';
import renderer from 'react-test-renderer';

describe('<Feed />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Feed />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});

test('renders correctly', () => {
    const tree = renderer.create(<Feed />).toJSON();
    expect(tree).toMatchSnapshot();
});