import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';

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

const ViewHeader = ({ title }) =>
  <View style={styles.welcomeContainer}>
    <View>
      <Text></Text>
    </View>
    <View >
      <Text>{title}</Text>
    </View>
    <View>
      <Image source={require('./assets/cart.png')} style={{ height: 30, width: 30 }} />
    </View>
  </View>

const LookFeed = ({ products }) =>
  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <Look product={sampleProduct} smelliness={6} />
    <Look product={sampleProduct} />
    <Look product={sampleProduct} />
    <Look product={sampleProduct} />
  </ScrollView>

const Look = ({ product }) =>
  <View>
    <LookPhoto photo={product.photo} />
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <InfluencerInfo influencer={product.seller} />
      <CartAddButton price={product.price} />
    </View>
    <LookDescription description={product.description} />
  </View>

const LookPhoto = ({ photo }) =>
  <Image source={photo} resizeMode="contain" style={styles.lookPhoto} />


const LookDescription = ({ description }) =>
  <Text style={styles.lookDescription}>{description}</Text>

const CartAddButton = ({ price }) =>
  <View style={{
    marginRight: 15,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10
  }}>
    <Text>
      +  ${price}
    </Text>
  </View>

const InfluencerInfo = ({ influencer }) =>
  <View style={{ marginTop: 10, marginLeft: 15, marginBottom: 10, flexDirection: 'row' }}>
    <Image source={influencer.profilePhoto} style={styles.influencerPhoto} />
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text>
          {influencer.name}
        </Text>
        <Text>
          {influencer.handle}
        </Text>
      </View>
    </View >
  </View >

export default class Feed extends React.Component {

  render() {
    let sample = "asfasf";
    return (
      <View style={styles.container}>
        <ViewHeader title="FEED" />
        <LookFeed products={"shit"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    justifyContent:'space-between',
    flexDirection:'row',
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
    resizeMode: 'stretch',
    height: 200,
    width: 400
  },
  lookDescription: {
    flex: 1,
    padding: 10
  },
});
