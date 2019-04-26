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
    if (this.props.product.images != undefined) {
      imagesrc = this.props.product.images[0].src

    }
    console.log(imagesrc);

    return (
      <View>
        <ScrollView>
          {/* <NameBar user={sampleUser} navigation={this.props.navigation} product={this.props.product} /> */}
          <Image source={{ uri: imagesrc }} resizeMode="cover" style={styles.mainImage} />
          <Title product={this.props.product} />
          <Description item={this.props.product} />
          {/* <Details product={this.props.product} item={sampleItem} id={this.props.id} proID={this.props.proID} /> */}
          <DetailsClass product={this.props.product} item={sampleItem} id={this.props.id} proID={this.props.proID} />

        </ScrollView>
      </View>

    )
  }
}

// class NameBar extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       name: '',
//       handle: '',
//       id: '',
    
//     };
//   }


//   componentDidMount() {

//     return fetch('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + Buffer.from(this.props.product.id, 'base64').toString().split('/')[4])
//       .then((response) => response.json())
//       .then((responseJson) => {

//         this.setState({
//           name: responseJson.first_name + ' ' + responseJson.last_name,
//           handle: responseJson.instagram_handle,
//           id: responseJson.ID,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   render() {

//     return (
//       <View style={styles.nameBar}>
//         <Image
//           style={{ width: 40, height: 40, borderRadius: 20 }}
//           source={{ uri: this.props.user.photo }}
//         />

//         <TouchableOpacity onPress={() => this.props.navigation.navigate('InfluencerProfileScreen', {
//           id: this.state.id,
//           person: Buffer.from(this.props.product.id, 'base64').toString().split('/')[4]
//         })}>
//           <Text>{this.state.name}</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }


function ImageClothes({ photo }) {
  return (<Image
    resizeMode="cover"
    style={styles.mainImage}
    source={{ uri: photo }}
  />)

}


const LookPhoto = ({ imagesrc }) =>
  <Image source={{ uri: imagesrc }} resizeMode="cover" style={styles.mainImage} />


function Details(props) {
  console.log("THIS IS THE ID: " + props.id);
  console.log("THIS IS THE PROID: " + props.proID);



  return (
    <View style={styles.details}>
      {/* <Text style={{ fontSize: 30, marginBottom: 5 }}>Details</Text>
    <Text style={{ marginHorizontal: 30 }}>Size: {item.size}</Text>
    <Text style={{ marginHorizontal: 30 }}>Brand: {item.brand}</Text>
    <Text style={{ marginHorizontal: 30 }}>Condition: {item.condition}</Text> */}
    </View>
  )
}

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
    // console.log("INSIDE THE RENDER: " + this.state.influencerSpecificProducts);

    let products = this.state.influencerSpecificProducts;
    console.log(" THE PRO ID : " + this.props.proID);

    

    products = products.filter(
      (product) => {
        console.log("API PRODUCT ID: " + product.store_id);
        console.log("PROPS ID: " + this.props.proID);
        console.log("TRUE OR FALSE: " + (product.store_id.toString() === this.props.proID.toString()));

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
          <Text style={{ fontSize: 30, marginBottom: 5, marginLeft: 5}}>Details</Text>
          {sizeProducts}
          {brandProducts}
          {conditionProducts}
        </View>
      )
  }

}







function Title({ product }) {
  return (<Text style={styles.title}>{product.title}</Text>)
}

function Description({ item }) {
  descriptionSplit = {item}.description
  if (item.description != undefined) {
    descriptionSplit = item.description.split('Product Description ')[1];
  }
  

  return (<Text style={styles.description}>{descriptionSplit}</Text>)
}


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
    const productId = this.props.navigation.getParam('productId','"noproduct"');


    client.product.fetch(productId).then((res) => {
      // Do something with the product
      this.setState({
        product: res,
      });

      //  console.log(this.state.product.images[0].src);
      //  console.log("this is the product id: " + productId);
      //  console.log("idk man: " + Buffer.from(this.state.product.id, 'base64').toString().split('/')[4]);
    });
  }

  render() {
    const ID = this.props.navigation.getParam('id', 'noID');
    const proID = this.props.navigation.getParam('proID', 'noID');
    // console.log("THIS IS THE ID: " + ID);
    // console.log("THIS IS THE PROID: " + proID);
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