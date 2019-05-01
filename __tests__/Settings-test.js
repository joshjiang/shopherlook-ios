import React from "react";
import renderer from "react-test-renderer";
import Settings from '../Settings';
import Info from '../Settings';
import Notifications from '../Settings';

import ViewHeader from '../Settings';
import Banner from '../Settings';
import {Text} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import Notifications from '../Settings';



describe('<Settings />', async () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Settings />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});


describe('Info', () => {
    it('renders the correct text', () => {
        const st = "Bilbo Baggins";

        const inst = renderer.create(
            <Info/>
        );
        expect(
            inst.root.findAllByType(Text)[2].props.children
        ).toBe(`${st}`);
    });
});

describe('ViewHeader text test', () => {
    it('renders the correct text', () => {
        const st = "Settings";

        const inst = renderer.create(
            <ViewHeader/>
        );
        expect(
            inst.root.findAllByType(Text)[0].props.children
        ).toBe(`${st}`);
    });
});

describe('Banner', () => {
    it('renders the correct text', () => {
        const st = 'user';

        const inst = renderer.create(
            <Banner/>
        );
        expect(
            inst.root.findAllByType(SimpleLineIcons)[0].props.name
        ).toBe(`${st}`);
    });
});

describe('Notifications', () => {
        it('renders the correct text', () => {
            const st = 'Notifications';
    
            const inst = renderer.create(
                <Notifications/>
            );
            expect(
                inst.root.findAllByType(Text)[5].props.children
            ).toBe(`${st}`);
        });
    });
