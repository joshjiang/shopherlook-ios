import React, { Component } from 'react'
import { View, StyleSheet, Image, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements';
import Client from 'shopify-buy';
import * as base from './environment';
var Buffer = require('buffer/').Buffer;

// connect to shopify api 
const client = Client.buildClient({
  domain: 'shopherlook.myshopify.com/',
  storefrontAccessToken: base.SHOPIFY_ACCESS_TOKEN
});


class Main extends Component {
  state = {
    products: [],
  };

  static navigationOptions = {
    title: 'Discover',
  };


  // make call to api
  // store in local component
  componentDidMount() {
    client.product.fetchAll().then((res) => {
      this.setState({
        products: res,
      });
    });
  }


  render() {

    return (
      <View style={styles.container}>
        <DiscoverContainer products={this.state.products} navigation={this.props.navigation} />
      </View>
    )
  }
}

// ui container for shopify data and navigation
export const DiscoverContainer = ({ products, navigation }) =>
  <View>
    <Disc products={products} larry={"asfasdf"} navigation={navigation} />
  </View>


// discover formatting
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;


export class Disc extends Component {

  constructor() {
    super();
    this.state = {
      search: '',
    }
  }

  // state update
  updateSearch = search => {
    this.setState({ search });
  };

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return (
      <View style={styles.item}>
        {item}
      </View>
    )
  }

  render() {
    let products = this.props.products;

    const { search } = this.state;

    products = products.filter(
      (product) => {
        return product.title.includes(search) || product.title.toLowerCase().includes(search);
      }
    )

    const listProducts = products.map((product) =>
      <Look product={product} key={product.title} navigation={this.props.navigation}></Look>
    )

    // search initation
    return (
      <View>
        <SearchBar
          placeholder="Search"
          lightTheme
          onChangeText={this.updateSearch}
          value={search}
        />

        <View style={{ height: 1100 }}>
          <ScrollView >
            <FlatList
              data={formatData(listProducts, numColumns)}
              style={styles.container}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
          </ScrollView>
        </View>

      </View>
    )
  }
}

class Look extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      handle: '',
      id: '',

    };
  }

  componentDidMount() {
    console.log('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + Buffer.from(this.props.product.id, 'base64').toString().split('/')[4]);

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
      <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePostScreen', {
        productId: this.props.product.id,
        id: this.state.id, //product
        proID: Buffer.from(this.props.product.id, 'base64').toString().split('/')[4],
      })}>

        <LookPicture photo={this.props.product.images[0].src} />

      </TouchableOpacity>
    )
  }
}


// discover thumbnails
export const LookPicture = ({ photo }) =>
  <Image source={{ uri: photo }} resizeMode="contain" style={styles.lookPhoto} />


// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10
  },

  filterStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 100,
    marginLeft: 100
  },

  lookPhoto: {
    resizeMode: 'stretch',
    height: 125,
    width: 125
  },

  betweenLooks: {

    marginTop: 5,
    marginBottom: 30,
    marginLeft: 40,
    marginRight: 40
  },

  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },

  itemInvisible: {
    backgroundColor: 'transparent',
  },

});

export default Main;