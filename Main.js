import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native'
// import SearchBar from 'react-native-search-bar'
import { SearchBar } from 'react-native-elements';
import { MaterialCommunityIcons, Feather, Foundation, Ionicons } from '@expo/vector-icons';
import Client from 'shopify-buy';
import * as base from './environment';



const client = Client.buildClient({
  domain: 'shopherlook.myshopify.com/',
  storefrontAccessToken: base.SHOPIFY_ACCESS_TOKEN
});


let allProducts = "";
client.product.fetchAll().then((products) => {
  allProducts = products;
});
let sample = "asfasf";



let sampleProduct = {
  photo: require('./assets/cart.png'),
  seller: {
    profilePhoto: require('./assets/cart.png'),
    name: "Lorem Ipsum",
    handle: "@loremipsum"
  },
  price: 15,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
};

// 36eb3e596449687068dfca9da3dc8d3e




class Main extends Component {
  state = {
    // search: '',
    products: [],
  };

  static navigationOptions = {
    title: 'Discover',
  };
  //updateSearch = search => {
  //  this.setState({ search });
  //};

  componentDidMount() {
    client.product.fetchAll().then((res) => {
      this.setState({
        products: res,
      });
    });
  }
  // make call to api
  // store in local component

  render() {
    console.log(this.state.products);
    
    //const { search } = this.state;
    return (

      //might need to pass the search into the discovercontainer
      // <DiscoverContainer />
      <View style={styles.container}>
        <DiscoverContainer products={this.state.products} navigation={this.props.navigation} />
      </View>
    )
  }
}


{/* <Image
          style={{width: 50, height: 50}}
          source={require('./img/supreme.jpg')}
    /> */}


// <DiscoverLooks sampleProduct={sampleProduct} />
// <DiscoverFeed products={products} larry={"asfasdf"}/>
// looks
const DiscoverContainer = ({ products, navigation }) =>
  <View>
    {/* <TopHeader /> */}
    {/* <SearchDiscover search={search} /> */}
    {/* <Filters /> */}

    <Disc products={products} larry={"asfasdf"} navigation={navigation} />
    {/* <BottomHeader /> */}
  </View>

const TopHeader = ({ }) =>

  <View style={styles.header}>
    <Feather name="align-justify" size={32} color="white" />
    {/* <Text style={{ fontSize: 18 }} >DISCOVER</Text> */}
    <MaterialCommunityIcons name="cart" size={32} color="black" />
  </View>


// onChangeText={this.updateSearch}
// value={search}
// const SearchDiscover = ({ search }) =>
//   <View style={styles.searchStyle}>
//     <SearchBar
//       placeholder="Search"
//       lightTheme
//       onChangeText={this.updateSearch}
//       value={search}


//     />
//   </View>

class ImplementSearch extends Component {

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search"
        lightTheme
        onChangeText={this.updateSearch}
        value={search}
      />
    )
  }
}

const Filters = ({ }) =>
  <View style={styles.filterStyle}>
    <WomanFilter />
    <AccessoryFilter />
    <ClothesFilter />
  </View>

const WomanFilter = ({ }) =>
  <MaterialCommunityIcons name="human-female" size={32} color="pink" />

const AccessoryFilter = ({ }) =>
  <MaterialCommunityIcons name="ring" size={32} color="cornflowerblue" />

const ClothesFilter = ({ }) =>
  <MaterialCommunityIcons name="tshirt-v" size={32} color="mediumpurple" />






// sampleProduct
// not using DiscoverLooks as of now, trying to use the function 
// DiscoverFeed below
const DiscoverLooks = ({ product }) =>
  <View style={{ height: 590 }}>
    <ScrollView >
      <View style={styles.betweenLooks}>
        <View style={styles.looksStyle}>

          <Look product={product.images[0].src} />

        </View>

      </View>


    </ScrollView>
  </View>

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

function DiscoverFeed(props) {
  const products = props.products;
  const listProducts = products.map((product) =>
    <Look product={product} key={product.title}></Look>
  )

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return (
      <View style={styles.item}>
        {item}
      </View>
    )
  }
  return (
    <View >
      <ScrollView >
        <FlatList
          data={formatData(listProducts, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </ScrollView>
    </View>
  );


}

class Disc extends Component {

  constructor() {
    super();
    this.state = {
      search: '',
    }
  }

  updateSearch = search => {
    this.setState({ search });
  };

  renderItem = ({ item, index }) => {
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


    console.log(search);

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










//   return (

//     // <Look ></Look>
//     // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

//     //  <View style={styles.betweenLooks}>
//     // <View style={styles.looksStyle}>


//     <View style={{ height: 480 }}>

//     <ScrollView>



//         {listProducts}









//     </ScrollView>

// </View>
//     // <ScrollView >
//     //   <Look ></Look>
//     // </ScrollView>
//   );


const Look = ({ product, navigation }) =>

     <TouchableOpacity onPress={() => navigation.navigate('SinglePostScreen',{
      productId: product.id,
    })}>
        
        <LookPicture photo={product.images[0].src} />
    </TouchableOpacity>

// photo

const LookPicture = ({ photo }) =>

  <Image source={{ uri: photo }} resizeMode="contain" style={styles.lookPhoto} />
{/* <View></View> */ }

// photo

// <MaterialCommunityIcons  name="square" size={135} color="#b0daf4" />
// <Image source={require('./img/supreme.jpg')} resizeMode="contain" size={135} />


const BottomHeader = ({ }) =>
  <View style={styles.bottomheaderbox}>
    <View style={styles.bottomheader}>
      <Feather name="align-justify" size={32} color="white" />
      <Foundation name="compass" size={32} color="white" />
      <Ionicons name="md-person" size={32} color="white" />
    </View>
  </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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
  bottomheader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
    marginRight: 20,
    marginLeft: 20,

  },
  bottomheaderbox: {
    marginTop: 5,
    backgroundColor: 'cornflowerblue'
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
  searchStyle: {
    marginRight: 10,
    marginLeft: 10
  },
  looksStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 1,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: 'white',
    padding: 0

  },
  betweenLooks: {

    marginTop: 1,
    marginBottom: 1
  },
  lookPhoto: {
    resizeMode: 'stretch',
    height: 125,
    width: 125
  },




  looksStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 1,
    marginRight: 1,
    marginLeft: 1,
    backgroundColor: 'white',
    padding: 0

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
  itemText: {
    color: '#fff',
  },
  lookphoto: {
    resizeMode: 'stretch', //or center?
    height: 125,
    width: 125
  }


});

export default Main;