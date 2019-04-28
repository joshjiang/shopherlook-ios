import 'react-native';
import React from 'react';
import SinglePost from './SinglePost.js';


import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
   <SinglePost />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});