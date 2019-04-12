import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Button} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

function TempHeader() {
    return (
    <View style = {styles.tempHeader}>
    <Text>SHOPherLOOK</Text>
    </View>);
  }
let sampleUser = {
    photo: 'https://cdn1.vectorstock.com/i/1000x1000/26/45/young-executive-woman-profile-icon-vector-9692645.jpg',
    name: 'Janet Doe'
}

let sampleItem = {
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

function ImageClothes({item}){
    return (<Image
    style={styles.mainImage}
    source={{uri: item.itemPhoto}}
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
    return(<Text style = {styles.title}>{item.textTitle}</Text>)
}

function Description({item}) {
    return (<Text style = {styles.description}>{item.textDescription}</Text>)
}
class SinglePost extends Component {
    
    render() {
        return(
            <View style = {styles.container}>
               <TempHeader/>
               <NameBar user = {sampleUser} navigation = {this.props.navigation}/>
              <ImageClothes item = {sampleItem}/>
              <Title item = {sampleItem}/>
              <Description item = {sampleItem}/>
              <Details item = {sampleItem}/>
              
              
               
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
        width: 100 + "%", 
        height: 50 + "%"
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
        fontSize: 40,
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