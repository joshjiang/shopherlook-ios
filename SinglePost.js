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


class Look extends React.Component {
  constructor() {
    super();
}
render() {

  
   imagesrc = "hi";
  if(this.props.product.images != undefined)
  {
    imagesrc = this.props.product.images[0].src

  }
  console.log(imagesrc)

  return (
    <View>
      <ScrollView>
      {/* <NameBar user={sampleUser} navigation={this.props.navigation} product={this.props.product} /> */}
      <Image source={{ uri: imagesrc }} resizeMode="cover" style={styles.mainImage} />
    <Title product={this.props.product} />
<Description item={this.props.product} />
 <Details item={sampleItem} />
 </ScrollView>
 </View>
 
  )
}
}

class NameBar extends React.Component {
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
      <View style={styles.nameBar}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{ uri: this.props.user.photo }}
        />

        <TouchableOpacity onPress={() => this.props.navigation.navigate('InfluencerProfileScreen', {
          id: this.state.id,
          person: Buffer.from(this.props.product.id, 'base64').toString().split('/')[4]
        })}>
          <Text>{this.state.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }


}


function ImageClothes({ photo }) {
  return (<Image
    resizeMode="cover"
    style={styles.mainImage}
    source={{ uri: photo }}
  />)

}


const LookPhoto = ({ imagesrc }) =>
  <Image source={{ uri: imagesrc }} resizeMode="cover" style={styles.mainImage} />


function Details({ item }) {
  return (<View style={styles.details}>
    <Text style={{ fontSize: 30, marginBottom: 5 }}>Details</Text>
    <Text style={{ marginHorizontal: 30 }}>Size: {item.size}</Text>
    <Text style={{ marginHorizontal: 30 }}>Brand: {item.brand}</Text>
    <Text style={{ marginHorizontal: 30 }}>Condition: {item.condition}</Text>
  </View>)
}



function Title({ product }) {
  return (<Text style={styles.title}>{product.title}</Text>)
}

function Description({ item }) {

  return (<Text style={styles.description}>{item.description}</Text>)
}


class SinglePost extends Component {
  constructor() {
    super();

    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    const productId = this.props.navigation.getParam('productId', 'noproduct');

    client.product.fetch(productId).then((res) => {
      // Do something with the product
      
      this.setState({
        product: res,
      });
     
     console.log(this.state.product.images[0].src);
     
     
    });

  }

  render() {
    
    return (
     
      <View style={styles.container}>
        <Look product ={this.state.product} navigation={this.props.navigation}></Look>
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
    width: 420
  },
  nameBar: {
    width: 100 + "%",
    height: 50,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10
  },
  tempHeader: {
    width: 100 + "%",
    height: 50,
    backgroundColor: "rgb(255,255,255)",
    marginTop: 20,
    borderBottomColor: "rgb(233,233,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 20,
    fontFamily: 'Helvetica'

  },
  description: {
    marginHorizontal: 25,
    fontSize: 15,
    fontFamily: 'Helvetica'

  },
  details: {
    marginHorizontal: 25,
    marginTop: 10,
  }

});


export default SinglePost