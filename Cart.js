import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import Client from 'shopify-buy';
import * as base from './environment';
import Icon from 'react-native-vector-icons/FontAwesome';

const client = Client.buildClient({
    domain: 'shopherlook.myshopify.com',
    storefrontAccessToken: base.SHOPIFY_ACCESS_TOKEN,
});

let sampleProduct = {
    photo: require('./assets/supreme.jpg'),
    seller: {
        profilePhoto: require('./assets/50x50.png'),
        name: "Lorem Ipsum",
        handle: "@loremipsum"
    },
    price: 15,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
};

const LineItem = ({ line_item }) =>
    <View style={{ height: 80 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text> an image</Text>
            </View>
            <View >
                <View>
                    <Text>{line_item.seller.name}</Text>
                </View>
            </View>
            <View>
                <View>
                    <Text>$ {(line_item.price).toFixed(2)}</Text>
                </View>
            </View>
            <TouchableOpacity><Text style={{fontSize:20}}>×</Text></TouchableOpacity>
        </View>
    </View>

class Cart extends Component {
    constructor() {
        super();

        this.state = {
            totalPrice: "30",
        };
    }

    render() {
        return (
            <View style={{ paddingTop: 60, paddingLeft: 20, paddingRight: 20, flex: 1 }}>
                <View style={{ height: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Icon name="shopping-cart" size={30}  />
                        <Text style={{ fontSize: 30 }}> Your Cart </Text>
                        <TouchableOpacity><Text style={{ fontSize: 30, color: '#00000088', fontWeight: 'bold' }}>x</Text></TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, flexDirection: 'column', paddingTop: 30 }}>
                    <LineItem line_item={sampleProduct} />
                    <LineItem line_item={sampleProduct} />
                </ScrollView>
                <View style={{ height: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, }}>
                        <Text style={{ fontSize: 20, }}>
                            TOTAL:
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            ${this.state.totalPrice}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    alignItems: 'center',
                    padding: 10,
                    justifyContent: 'center',
                    backgroundColor: '#000',
                }}>
                    <Text style={{ color: '#fff' }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Cart;