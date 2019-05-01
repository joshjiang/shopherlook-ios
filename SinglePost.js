import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as base from './environment';
import Client from 'shopify-buy';
import { ScrollView } from 'react-native-gesture-handler';
var Buffer = require('buffer/').Buffer;

const client = Client.buildClient({
  domain: 'shopherlook.myshopify.com',
  storefrontAccessToken: base.SHOPIFY_ACCESS_TOKEN,
});

/**
 * stock sample user is used to act as a filler for any parts of the code that is unfinished. 
 * example: sample user photo can be used until a proper header is made
 */
const sampleUser = {
  photo: 'https://cdn1.vectorstock.com/i/1000x1000/26/45/young-executive-woman-profile-icon-vector-9692645.jpg',
  name: 'Janet Doe'
}

const sampleItem = {
  itemPhoto: 'https://girlgeekacademy.com/wp-content/uploads/2015/05/Sarah-Moran-Girl-Geek-Academy.jpg',
  size: 'M',
  brand: 'MPDesigns',
  condition: 'new',
  textTitle: "Blue Flower Dress",
  textDescription: "Beautiful dress with a sweetheart neckline and yellow belting"

}

/**
 * container class for individual components
 */
class Look extends React.Component {
  constructor() {
    super();
  }
  render() {
    if (this.props.product.images != undefined) {
      imagesrc = this.props.product.images[0].src
    }
    descriptionSplit = this.props.product.description
    if (this.props.product.description != undefined) {
      descriptionSplit = this.props.product.description.split('Product Description ')[1];
    }
    return (
      <View>
        <ScrollView>
          <LookPhoto product={this.props.product}></LookPhoto>
          <Title title={this.props.product.title} />
          <Description descriptionSplit={descriptionSplit} />
          <DetailsTitle title="Details" />
          <DetailsClass product={this.props.product} item={sampleItem} id={this.props.id} proID={this.props.proID} />
        </ScrollView>
      </View>
    )
  }
}

/**
 * presents and formats the images associated with a product with a sliding image picker for multiple images
 */
function LookPhoto({ product }) {
  const { images } = product;
  if (images && images.length) {
    return (
      <View
        style={styles.scrollContainer}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {images.map(image => (
            <Image style={styles.mainImage} source={{ uri: image.src }} key={image.src} />
          ))}
        </ScrollView>
      </View>
    );
  }
  return null;
}

/**
 * adds the title to preceed the details class
 */
export function DetailsTitle({ title }) {
  return (<Text style={{ fontSize: 20, marginBottom: 5, marginLeft: 5, fontWeight: 'bold',  fontFamily: 'Baskerville' }}>{title}</Text>)
}

/**
 *  pulls and adds the details associated with a particular product. Details pulled include size brand and condition
 */
class DetailsClass extends Component {
  constructor() {
    super();
    this.state = {
      influencerSpecificProducts: []
    };
  }
  componentDidMount() {
    console.log("INSIDE THE DID MOUNT: " + 'https://shopherlook-sell.app/API/postsByProfileID?profileID=' + this.props.id);
    return fetch('https://shopherlook-sell.app/API/postsByProfileID?profileID=' + this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          influencerSpecificProducts: responseJson
        });
      }).catch((error) => {
        console.error(error);
      });
  }
  render() {
    let products = this.state.influencerSpecificProducts;
    products = products.filter(
      (product) => {
        return product.store_id.toString() === this.props.proID.toString();
      }
    )
    const sizeProducts = products.map((product) =>
      <Text style={{ marginHorizontal: 30 }} key={product.ID} > Size: {product.size}</Text>
    )
    const brandProducts = products.map((product) =>
      <Text style={{ marginHorizontal: 30 }} key={product.ID} > Brand: {product.brand}</Text>
    )
    const conditionProducts = products.map((product) =>
      <Text style={{ marginHorizontal: 30 }} key={product.ID} > Condition: {product.condition}</Text>
    )
    return (
      <View>
        {sizeProducts}
        {brandProducts}
        {conditionProducts}
      </View>
    )
  }
}

/**
 * adds the title of the product
 */
export function Title({ title }) {
  return (<Text style={styles.title}>{title}</Text>)
}

/**
 * adds the description of the product
 */
export function Description({ descriptionSplit }) {
  return (<Text style={styles.description}>{descriptionSplit}</Text>)
}

/**
 * container to fetch the product and make an instance of the look container
 */
class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }
  static navigationOptions = {
    title: 'Item',
  };
  componentDidMount() {
    const productId = this.props.navigation.getParam('productId', '"noproduct"');
    client.product.fetch(productId).then((res) => {
      this.setState({
        product: res,
      });
    });
  }
  render() {
    const ID = this.props.navigation.getParam('id', 'noID');
    const proID = this.props.navigation.getParam('proID', 'noID');
    return (
      <View style={styles.container}>
        <Look product={this.state.product} navigation={this.props.navigation} id={ID} proID={proID} ></Look>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + "%",
    height: 100 + "%",
    fontFamily: 'Helvetica'

  },
  mainImage: {
    resizeMode: 'cover',
    height: 400,
    width: 420,
   
  },
  nameBar: {
    width: 100 + "%",
    height: 50,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    fontFamily: 'Helvetica'
  },
  tempHeader: {
    width: 100 + "%",
    height: 50,
    backgroundColor: "rgb(255,255,255)",
    marginTop: 20,
    borderBottomColor: "rgb(233,233,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    fontFamily: 'Baskerville'

  },
  description: {
    marginHorizontal: 25,
    fontSize: 15,
    fontFamily: 'Baskerville'
    
  },
  details: {
    marginHorizontal: 25,
    marginTop: 10,
    fontFamily: 'Baskerville'
  }

});

export default SinglePost