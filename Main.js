import React, { Component} from 'react'
import  { View, Text, StyleSheet, Image, ScrollView} from 'react-native'
// import SearchBar from 'react-native-search-bar'
import { SearchBar } from 'react-native-elements';
import { MaterialCommunityIcons, Feather, Foundation, Ionicons} from '@expo/vector-icons';

let sampleProduct = {
  photo: require('./img/supreme.jpg'),
  seller: {
    profilePhoto: require('./img/supreme.jpg'),
    name: "Lorem Ipsum",
    handle: "@loremipsum"
  },
  price: 15,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
};

class Main extends Component {
    state = {
      search: '',
    };

    updateSearch = search => {
      this.setState({ search });
    };

    render() {
      
        const { search } = this.state;
        return  ( 

          //might need to pass the search into the discovercontainer
            <View style = {styles.container}> 
                <DiscoverContainer /> 
            </View>
        )
    }
}
{/* <Image
          style={{width: 50, height: 50}}
          source={require('./img/supreme.jpg')}
    /> */}

const DiscoverContainer = ({looks}) => 
  <View> 
    <TopHeader/>
    <SearchDiscover />
    <Filters />
    <DiscoverLooks sampleProduct = {sampleProduct}/>
    {/* <DiscoverLooks /> */}
    <BottomHeader />
  </View>

const TopHeader = ({}) => 
  
    <View style = {styles.header}>
      <Feather name="align-justify" size={32} color="white" />
      <Text style={{fontSize: 18}} >DISCOVER</Text>
      <MaterialCommunityIcons  name="cart" size={32} color="black" />
    </View>


// onChangeText={this.updateSearch}
// value={search}
const SearchDiscover = ({}) =>
  <View style = {styles.searchStyle}>
    <SearchBar 
        placeholder="Search" 
        lightTheme
    />
  </View>
  

const Filters = ({}) =>
  <View style = {styles.filterStyle}> 
    <WomanFilter />
    <AccessoryFilter />
    <ClothesFilter />
  </View>

const WomanFilter = ({}) =>
  <MaterialCommunityIcons  name="human-female" size={32} color="pink" />

const AccessoryFilter = ({}) =>
  <MaterialCommunityIcons  name="ring" size={32} color="cornflowerblue" />

const ClothesFilter = ({}) =>
  <MaterialCommunityIcons  name="tshirt-v" size={32} color="mediumpurple" />

const DiscoverLooks = ({sampleProduct}) =>
<View style={{height: 590}}>
  <ScrollView > 
    <View style = {styles.betweenLooks}> 
      <View style = {styles.looksStyle}> 
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
      </View>
      <View style = {styles.looksStyle}> 
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
      </View>
      <View style = {styles.looksStyle}> 
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
      </View>
      <View style = {styles.looksStyle}> 
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
      </View>
      <View style = {styles.looksStyle}> 
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
      </View>
      <View style = {styles.looksStyle}> 
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
        <LookPicture photo = {sampleProduct.photo}/>
      </View>
    </View>
    
    
  </ScrollView>
</View>
  

const LookPicture = ({photo}) =>
  // <MaterialCommunityIcons  name="square" size={135} color="#b0daf4" />
  // <Image source={require('./img/supreme.jpg')} resizeMode="contain" size={135} />
  <Image source={photo} resizeMode="contain" style={styles.lookPhoto} />

const BottomHeader = ({}) =>
  <View style = {styles.bottomheaderbox}>
    <View style = {styles.bottomheader}>
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
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10
  },
  bottomheader: {
    justifyContent:'space-between',
    flexDirection:'row',
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
    justifyContent:'space-between',
    flexDirection:'row',
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
    justifyContent:'space-between',
    flexDirection:'row',
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
    height: 100,
    width: 100
  },
});

export default Main;