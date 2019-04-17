import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Modal, TouchableOpacity, Alert } from 'react-native';
import Cart from './Cart';
import LineItem from './LineItem';
import Client from 'shopify-buy';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as base from './environment';
var Buffer = require('buffer/').Buffer;

const client = Client.buildClient({
  domain: 'shopherlook.myshopify.com',
  storefrontAccessToken: base.SHOPIFY_ACCESS_TOKEN,
});

let sampleProduct = {
  photo: require('./assets/450x200.png'),
  seller: {
    profilePhoto: require('./assets/50x50.png'),
    name: "Lorem Ipsum",
    handle: "@loremipsum"
  },
  price: 15,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
};

const ViewHeader = ({ title, cartModal }) =>
  <View style={styles.welcomeContainer}>
    <View style={{ width: 50 }}>
      <Text></Text>
    </View>
    <View style={{ width: 50 }}>
      <Text style={{ fontSize: 15, paddingLeft: 10 }}>{title}</Text>
    </View>
    <View style={{ width: 50 }}>
      {cartModal}
    </View>
  </View>

function LookFeed(props) {
  const products = props.products;
  const listProducts = products.map((product) =>
    <Look product={product} key={product.title} addVariantToCart={props.addVariantToCart}></Look>
  )
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {listProducts}
    </ScrollView>
  );
}

const Look = ({ product, addVariantToCart}) =>
  <View>
    <View style={{ padding: 1, backgroundColor: '#e9e8ff6f', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <InfluencerInfo product={product} />
      <Text></Text>
    </View>
    <View>
      <View style={{ padding: 10, zIndex: 10, position: 'absolute', bottom: 0, right: 0, left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text></Text>
        <CartAddButton product={product} addVariantToCart={addVariantToCart} price={product.variants[0].price} />
      </View>
      <LookPhoto photo={product.images[0].src} />
    </View>
    <LookDescription title={product.title} description={product.description} />
  </View>

const LookPhoto = ({ photo }) =>
  <Image source={{ uri: photo }} resizeMode="cover" style={styles.lookPhoto} />

const LookDescription = ({ description, title }) =>
  <View>
    <Text style={styles.lookTitle}>{title}</Text>
    <Text style={styles.lookDescription}>{description.split('Product Description ')[1]}</Text>
  </View>

const CartAddButton = ({ price, product, addVariantToCart}) =>
  <TouchableOpacity style={{
    marginRight: 15,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffffffEE',
    zIndex: 10
  }}
    onPress={
      () => addVariantToCart(product.variants[0].id, 1)
    }>
    <Text>
      +  ${price}
    </Text>
  </TouchableOpacity>

class CartModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22, }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ marginTop: 40, }}>
            <View >
              <TouchableOpacity
                style={{ zIndex: 100 }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{ fontSize: 30, color: '#00000088', fontWeight: 'bold', textAlign: 'right', paddingRight: 30, top: 45 }}>x</Text></TouchableOpacity>
              {this.props.cart}
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Icon name="shopping-cart" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

class InfluencerInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      handle: '',
    };
  }

  componentDidMount() {
    return fetch('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + Buffer.from(this.props.product.id, 'base64').toString().split('/')[4])
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          name: responseJson.first_name + ' ' + responseJson.last_name,
          handle: responseJson.instagram_handle,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{ marginTop: 10, marginLeft: 15, marginBottom: 10, flexDirection: 'row' }}>
        {/* <Image source={influencer.profilePhoto} style={styles.influencerPhoto} /> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text>
              {this.state.name}
            </Text>
            <Text>
              {this.state.handle}
            </Text>
          </View>
        </View >
      </View >
    )
  }
}
export default class Feed extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      isCartOpen: false,
      checkout: { lineItems: [] },
      shop: {}
    };
    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  componentDidMount() {
    client.product.fetchAll().then((res) => {
      this.setState({
        products: res,
      });
    }).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });

    client.checkout.create().then((res) => {
      this.setState({
        checkout: res,
      });
      console.log(this.state.checkout.id);
    }).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });

    client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res,
      });
    }).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });
  }

  addVariantToCart(variantId, quantity) {

    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkoutId = this.state.checkout.id

    return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }]

    return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    console.log('removed')
    const checkoutId = this.state.checkout.id
    return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }


  render() {


    return (
      <View style={styles.container} >
        <ViewHeader title="FEED"
          cartModal={<CartModal cart={
            <Cart
              checkout={this.state.checkout}
              isCartOpen={this.state.isCartOpen}
              handleCartClose={this.handleCartClose}
              updateQuantityInCart={this.updateQuantityInCart}
              removeLineItemInCart={this.removeLineItemInCart} />} />} />
        <LookFeed products={this.state.products} addVariantToCart={this.addVariantToCart.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  influencerPhoto: {
    height: 50,
    borderRadius: 25,
    width: 50
  },
  lookPhoto: {
    resizeMode: 'cover',
    height: 400,
    width: 420
  },
  lookDescription: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  lookTitle: {
    padding: 15,
    fontWeight: 'bold',
  },
});
