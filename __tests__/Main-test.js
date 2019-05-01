import React from 'react';
import Main from '../Main';
<<<<<<< HEAD
import Disc from '../Main';
import LookPicture from '../Main';
import { SearchBar } from 'react-native-elements';
import {FlatList} from 'react-native';
=======
import Look from '../Main';
import { Image} from 'react-native'
>>>>>>> b6c0f3479c965afeeffca45ea260cfc4dc1286c8


import renderer from 'react-test-renderer';


describe('<Main />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Main />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});

test('renders correctly', () => {
    const tree = renderer.create(<Main />).toJSON();
    expect(tree).toMatchSnapshot();
});


describe('SearchBar', () => {
    it('renders the correct searchbar', () => {
        const st =  "Search";

        const inst = renderer.create(
            <Disc/>
        );
        expect(
            inst.root.findAllByType(SearchBar)[0].props.placeholder
        ).toBe(`${st}`);
    });
});


/*
describe('FlatList', () => {
    it('renders the correct searchbar', () => {
        const st = 3;

        const inst = renderer.create(
            <Disc/>
        );
        expect(
            inst.root.findByType(FlatList).props.placeholder
        ).toBe(`${st}`);
    });
});

*/
