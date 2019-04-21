import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as base from './environment';
import Client from 'shopify-buy';
import { ScrollView } from 'react-native-gesture-handler';


const client = Client.buildClient({
    domain: 'shopherlook.myshopify.com',
    storefrontAccessToken: base.SHOPIFY_ACCESS_TOKEN,
  });

function TempHeader() {
    return (
    <View style = {styles.tempHeader}>
    <Text>SHOPherLOOK</Text>
    </View>);
  }
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


function NameBar({user, navigation}){
    return (
        <View style = {styles.nameBar}>
        <Image 
        style = {{width:40, height: 40, borderRadius: 20}}
        source = {{uri: user.photo}}
        />
        {/* <Text style = {{marginLeft: 10, marginTop: 10, fontFamily: 'Helvetica', fontSize: 15}}>
            {user.name}
        </Text> */}

        <Button
          title= {user.name}
          onPress={() => navigation.navigate('InfluencerProfileScreen')}
        />
        </View>

    );
}

function ImageClothes({photo}){
    return (<Image
      resizeMode="cover" 
      style={styles.mainImage}
    source={{ uri: photo }}
   />)

  
}



function Details({item}){
            return (<View style = {styles.details}> 
                <Text style = {{fontSize: 30, marginBottom: 5}}>Details</Text>
                <Text style = {{marginHorizontal: 30}}>Size: {item.size}</Text>
                <Text style = {{marginHorizontal: 30}}>Brand: {item.brand}</Text>
                <Text style = {{marginHorizontal: 30}}>Condition: {item.condition}</Text>
            </View>)
}

function Title({item}) {
    return(<Text style = {styles.title}>{item.title}</Text>)
}

function Description({item}) {
  console.log(item.description);
    return (<Text style = {styles.description}>{item.description}</Text>)
}






function LookFeed(props, passed) {
  const products = props.products;
  const navigation = props.navigation;
  const listProducts = products.map((product) =>
    <Look product={product} passed = {passed} key={product.title} navigation = {navigation}></Look> 
    )
  
   
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {listProducts}
    </ScrollView>
  );
}
const Look = ({ product, navigation }, passed ) =>
  <View>
       <NameBar user = {sampleUser} navigation = {navigation}/>
      <ImageClothes photo={product.images[0].src} />
      <Title item = {product}/>
      <Description item = {product}/>
      <Details item = {sampleItem}/>  
  </View>




class SinglePost extends Component {
     constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  static navigationOptions = {
    title: 'Item',
  };

  componentDidMount() {
    return client.product.fetchAll().then((res) => {
      
      this.setState({
        products: res,
        
      });
    }).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });;
  }


    render() {
        return(
              <View style={styles.container}>           
              <LookFeed products={this.state.products} passed = {this} navigation = {this.props.navigation} />
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
    nameBar:{
        width: 100 + "%",
        height: 50,
        backgroundColor: "rgb(255,255,255)",
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 10
    },
    tempHeader:{
        width: 100 + "%",
        height: 50,
        backgroundColor: "rgb(255,255,255)",
        marginTop: 20,
        borderBottomColor: "rgb(233,233,233)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
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
// const styles = StyleSheet.create({ 
//   container: {
//     flex: 1,
//   },
//   contentContainer: {
//     paddingTop: 0,
//   },
//   welcomeContainer: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 50,
//     marginBottom: 20,
//   },
//   influencerPhoto: {
//     height: 50,
//     borderRadius: 25,
//     width: 50
//   },
//   lookPhoto: {
//     resizeMode: 'cover',
//     height: 400,
//     width: 420
//   },
//   lookDescription: {
//     flex: 1,
//     paddingLeft: 15,
//     paddingRight: 15,
//     paddingBottom: 15,
//   },
//   lookTitle: {
//     padding: 15,
//     fontWeight: 'bold',
//   },
// });

export default SinglePost