import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Modal, TouchableOpacity, Alert } from 'react-native';
import Cart from './Cart';
import LineItem from './LineItem';
import Client from 'shopify-buy';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from '../../node_modules/react-native-vector-icons/MaterialIcons';
import * as base from './environment';
import { Button } from 'react-native-elements';
var Buffer = require('buffer/').Buffer;



const client = Client.buildClient({
  domain: 'shopherlook.myshopify.com',
  storefrontAccessToken: base.SHOPIFY_ACCESS_TOKEN,
});

const ViewHeader = ({ title, children }) =>
  <View style={styles.welcomeContainer}>
    <View style={{ width: 50 }}>
      <Text></Text>
    </View>
    <View style={{ width: 50 }}>
      {/* <Text style={{ fontSize: 15, paddingLeft: 10 }}>{title}</Text> */}
    </View>
    <View style={{ width: 50 }}>
      {children}
    </View>
  </View>

function LookFeed(props, passed) {
  const products = props.products;
  const navigation = props.navigation;


  const listProducts = products.map((product) =>
    <Look product={product} key={product.title} addVariantToCart={props.addVariantToCart} navigation={navigation} passed={passed}></Look>
  )


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {listProducts}
    </ScrollView>
  );
}

const Look = ({ product, addVariantToCart, navigation, passed }) =>
  <View>
    <View style={{ padding: 1, backgroundColor: '#e9e8ff6f', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <InfluencerInfo product={product} passed={passed} navigation={navigation} />
      <Text></Text>
    </View>
    <View>
      <View style={{ padding: 10, zIndex: 10, position: 'absolute', bottom: 0, right: 0, left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text></Text>
        <CartAddButton product={product} addVariantToCart={addVariantToCart} price={product.variants[0].price} />
      </View>
      <LookPhoto photo={product.images[0].src} />
    </View>
    <LookDescription title={product.title} description={product.description} navigation={navigation} />
  </View>

const LookPhoto = ({ photo }) =>
  <Image source={{ uri: photo }} resizeMode="cover" style={styles.lookPhoto} />

const LookDescription = ({ description, title, navigation }) =>
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('SinglePostScreen')}>
      <Text style={styles.lookTitle}> {title} </Text>
    </TouchableOpacity>
    <Text style={styles.lookDescription}>{description.split('Product Description ')[1]}</Text>
  </View>

const CartAddButton = ({ price, product, addVariantToCart }) =>
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
      <View style={{ marginTop: 0, }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ marginTop: 0, }}>
            <View >
              <TouchableOpacity
                style={{ zIndex: 100 }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  console.log(this.props.isCartOpen);
                }}>
                <Text style={{ fontSize: 30, color: '#00000088', fontWeight: 'bold', textAlign: 'right', paddingRight: 30, top: 45 }}>x</Text></TouchableOpacity>
              <Cart
                navigation={this.props.navigation}
                checkout={this.props.checkout}
                isCartOpen={this.props.isCartOpen}
                handleCartClose={this.setModalVisible.bind(this)}
                removeLineItemInCart={this.props.removeLineItemInCart} />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          alignItems='center'
          onPress={() => {
            this.setModalVisible(true);
            console.log(this.props.isCartOpen);
          }}>
          {/* <View style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: '#fff',
            top: 30,
            left:18,
            zIndex: 10,
          }}> */}
            {/* <Text style={{
              textAlign: 'center',
              color: '#fff'
            }}></Text> */}
          {/* </View> */}
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
      id: '',
      // person: Buffer.from(this.props.product.id, 'base64').toString().split('/')[4],
    };
  }


  componentDidMount() {
    return fetch('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + Buffer.from(this.props.product.id, 'base64').toString().split('/')[4])
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          name: responseJson.first_name + ' ' + responseJson.last_name,
          handle: responseJson.instagram_handle,
          id: responseJson.ID,
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('InfluencerProfileScreen', {
              id: this.state.id,
              person: Buffer.from(this.props.product.id, 'base64').toString().split('/')[4]
            })}>
              <Text>{this.state.name}</Text>
            </TouchableOpacity>
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
    this.handleCartOpen = this.handleCartOpen.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  static navigationOptions = {
    title: 'Feed',
  };

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
    const checkoutId = this.state.checkout.id
    return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  handleCartClose() {
    console.log('function successful')
    this.setState({
      isCartOpen: false,
    });
  }

  handleCartOpen() {
    this.setState({
      isCartOpen: true,
    });
  }


  render() {

    return (
      <View style={styles.container} >
        <ViewHeader title="FEED">
          <CartModal
            navigation={this.props.navigation}
            checkout={this.state.checkout}
            isCartOpen={this.state.isCartOpen}
            handleCartClose={this.handleCartClose}
            handleCartOpen={this.handlCartOpen}
            updateQuantityInCart={this.updateQuantityInCart}
            removeLineItemInCart={this.removeLineItemInCart} />
        </ViewHeader>
        <LookFeed products={this.state.products} addVariantToCart={this.addVariantToCart.bind(this)} navigation={this.props.navigation} />
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
    marginTop: 0,
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
