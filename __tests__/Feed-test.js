import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Feed, { CartAddButton, ViewHeader} from '../Feed';
import renderer from 'react-test-renderer';
import { JestEnvironment } from '@jest/environment';


describe('<Feed />', async () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Feed />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});

test('Feed test against snapshot', async () => {
    const tree = renderer.create(<Feed />).toJSON();
    expect(tree).toMatchSnapshot();
});

describe('Cart Add button', () => {
    it('renders the correct text', () => {
        const price = '69';
        console.log("hello2")
        const inst = renderer.create(
            <CartAddButton price={price} />
        );
        const textInst = inst.root.findByType(Text);
        console.log(inst.root.findByType(Text).props);
        expect(
            textInst.props.children
        ).toBe(" +  $" + price);
    });
});

describe('ViewHeader', () => {
    it('renders the correct text', () => {
        const title = 'Feed';
        const inst = renderer.create(
            <ViewHeader title={title} />
        );

        const textInst = inst.root.findAllByType(Text)[1];
        expect(
            textInst.props.children
        ).toBe(`${title}`);
    });
});

