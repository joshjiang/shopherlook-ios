import React from 'react';
import InfluencerProfile from '../InfluencerProfile';

import renderer from 'react-test-renderer';

describe('<InfluencerProfile />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<InfluencerProfile />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});

test('renders correctly', () => {
  const tree = renderer.create(<InfluencerProfile />).toJSON();
  expect(tree).toMatchSnapshot();
});