import 'react-native';
import React from 'react';
import SinglePost, {Description, Title, DetailsTitle} from '../SinglePost.js';
import renderer from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';


describe('Description', () => {
  it('renders the correct description', () => {
      const description = 'LOFT floral dress. Color is Classic Plum. Worn a few times, just too big for me';
      const inst = renderer.create(
          <Description descriptionSplit={description} />
      );
      const textInst = inst.root.findByType(Text);
      expect(
          textInst.props.children
      ).toBe(`${description}`);
  });
});

describe('Title', () => {
  it('renders the correct title', () => {
      const title = 'LOFT Petite Autumn Luau Ruffle Blouson Dress Petite Medium';
      const inst = renderer.create(
          <Title title={title} />
      );
      const textInst = inst.root.findByType(Text);
      expect(
          textInst.props.children
      ).toBe(`${title}`);
  });
});

describe('DetailsHeader', () => {
  it('renders the correct header', () => {
      const title = 'Details';
      const inst = renderer.create(
          <DetailsTitle title={title} />
      );
      const textInst = inst.root.findByType(Text);
      expect(
          textInst.props.children
      ).toBe(`${title}`);
  });
});
