import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import LineItem from './LineItem'
import WebCheckout from './WebCheckout'
import Icon from 'react-native-vector-icons/FontAwesome'

class Cart extends Component {
    constructor(props) {
        super(props)

        this.openCheckout = this.openCheckout.bind(this)
    }

    openCheckout() {
        this.props.handleCartClose(false)
        this.props.navigation.navigate('WebCheckoutScreen', {
            webUrl: this.props.checkout.webUrl,
          });('WebCheckoutScreen')
    }

    render() {
        let line_items = this.props.checkout.lineItems.map((line_item) => {
            return (
                <LineItem
                    updateQuantityInCart={this.props.updateQuantityInCart}
                    removeLineItemInCart={this.props.removeLineItemInCart}
                    key={line_item.id.toString()}
                    line_item={line_item}
                />
            );
        });

        return (
            <View style={{ paddingTop: 10, paddingLeft: 0, paddingRight: 0, flex: 1 }}>
                <View style={{ height: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text></Text>
                        <Text style={{ fontSize: 30 }}> Your Cart </Text>
                        <TouchableOpacity><Text></Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 500 }}>
                    <ScrollView style={{ flex: 1, flexDirection: 'column', paddingTop: 30 }}>
                        {line_items}
                    </ScrollView>
                </View>
                <View style={{ height: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, }}>
                        <Text style={{ fontSize: 20, }}>
                            SUBTOTAL
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            $ {this.props.checkout.subtotalPrice}
                        </Text>
                    </View>
                </View>
                <View style={{ height: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, }}>
                        <Text style={{ fontSize: 20, }}>
                            TAX
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            $ {this.props.checkout.totalTax}
                        </Text>
                    </View>
                </View>
                <View style={{ height: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, }}>
                        <Text style={{ fontSize: 20, }}>
                            Total
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            $ {this.props.checkout.totalPrice}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    marginLeft: 20,
                    marginRight: 20,
                    alignItems: 'center',
                    height: 50,
                    padding: 10,
                    justifyContent: 'center',
                    backgroundColor: '#000',
                }}
                    onPress={() => {
                        { this.openCheckout() };
                    }}>
                    <Text style={{ color: '#fff' }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Cart;