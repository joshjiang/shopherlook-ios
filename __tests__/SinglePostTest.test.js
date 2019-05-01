import 'react-native';
import React from 'react';
import SinglePost, {Description} from '../SinglePost.js';
import renderer from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';

// const navigation = { navigate: jest.fn() };

// describe('<SinglePost />', async() => {
//   it('has 1 child', () => {
//       const tree = renderer.create(<SinglePost navigation = {navigation}/>).toJSON();
//       expect(tree.children.length).toBe(1);
//   });
// });

// it('renders correctly', async() => {
//   const tree = renderer.create(
//    <SinglePost />
//     ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe('App', () => {
  it('should be able to run tests', () => {
      expect(1 + 2).toEqual(3);
  });
});

describe('Description', () => {
  it('renders the correct text', () => {
      const description = 'Ann Taylor Petite Botanical Jacquard Button Cuff Sweater Large Petite';
      const inst = renderer.create(
          <Description descriptionSplit={description} />
      );
      const textInst = inst.root.findByType(Text);
      expect(
          textInst.props.children
      ).toBe(`${description}`);
  });
});