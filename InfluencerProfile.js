import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Button, FlatList, Linking } from 'react-native';
import { Ionicons, AntDesign, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Client from 'shopify-buy';
import * as base from './environment';

const client = Client.buildClient({ //To pull from the Shopify API
    domain: 'shopherlook.myshopify.com',
    storefrontAccessToken: base.SHOPIFY_ACCESS_TOKEN, //API key in environment.js file
});

class InfluencerProfile extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
        };
    }
    static navigationOptions = {
        title: 'Profile',
    };

    componentDidMount() {

        return client.product.fetchAll().then((res) => {
            this.setState({
                products: res,
            });
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });;
    }

    render() {
        const { navigation } = this.props;
        const handle = navigation.getParam('id', 'noid');
        const person = navigation.getParam('person', 'noperson');
        return (
            <View style={styles.container}>
                <ProfileContainer  handle={handle} navigation={this.props.navigation} person={person} products={this.state.products}/>
            </View>
        )
    }
}

//make a profile container class 
class ProfileContainer extends Component {
    constructor() {
        super();

        this.state = {
            pictures: []
        };
    }

    componentDidMount() {
        console.log(this.props.handle);

        return fetch('https://shopherlook-sell.app/API/postsByProfileID?profileID=' + this.props.handle)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                console.log(this.props.handle);

                this.setState({
                    pictures: responseJson
                });
            })
            .catch((error) => {
                console.log("ERROR");
                console.log(this.props.handle);
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                {/* <ViewHeader /> */}
                <InfluencerContainer pictures={this.state.pictures} handle={this.props.handle} navigation={this.props.navigation} person={this.props.person} products = {this.props.products}/>
            </View>
        )
    }
}

// const ViewHeader = ({ }) => //the header 
//     //<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//     // 
//     <View style={styles.welcomeContainer}>
//         <MaterialCommunityIcons name="square" size={32} color='white' />
//         <Text style={styles.blue}>PROFILE</Text>
//         <Ionicons name="md-lock" size={18} style={styles.blue} />
//     </View>

//bio container: info about influencer; lookphotofeed: pics of all the objects
const InfluencerContainer = ({ pictures, handle, navigation, person, products }) =>
    <View>
        <BioContainer pictures={pictures} handle={handle} person={person} />
        <LookFeed pictures={pictures} handle={handle} navigation={navigation} products = {products} />
    </View>

// ProfileIcons: that light blue bar with influencer info 
// InfluencerBio: text info
const BioContainer = ({ pictures, handle, person }) =>
    <View>
        <ProfileIcons pictures={pictures} handle={handle} person={person} />
        <InfluencerBio />
    </View>


const ProfileIcons = ({ pictures, handle, person }) =>
    <View style={styles.modContainer}>
        <InfluencerInfo pictures={pictures} handle={handle} person={person} />
        <FuncIcons person={person} />
    </View>

class InfluencerInfo extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            handle: "",
        };
    }

    componentDidMount() {
        return fetch('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + this.props.person)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    name: responseJson.first_name + ' ' + responseJson.last_name,
                    handle: responseJson.instagram_handle
                });
            })

            .catch((error) => {
                console.log("ERROR hereee");
                console.log(this.props.handle);
                console.error(error);
            });
    }

    render() {

        const str = this.state.handle;
        // str = str.slice(1);
        let url = '';
        if (str.charAt(0) == '@') {
            url = "https://www.instagram.com/" + str.slice(1);
        }
        else {
            url = "https://www.instagram.com/" + str;
        }

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <FontAwesome name="user-circle-o" size={30} style={styles.blue} />

                <View style={{ flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between' }}>
                    <Text style={styles.leftAl}
                        onPress={() => Linking.openURL(url)}>
                        {this.state.name}
                    </Text>
                    <Text style={styles.leftAl}
                        onPress={() => Linking.openURL(url)}>
                        {this.state.handle}
                    </Text>
                </View>
            </View>
        )
    }
}

//INSTA TODO: link to insta page (maybe need insta API)
const FuncIcons = ({person }) =>
    <View style={{ flexDirection: 'row', alignItems: 'right', justifyContent: 'space-between' }}>
        {/* <InstagramLink person={person}  /> */}
        <InstagramLinkClass person={person}  />

        <Add />
    </View>

class InstagramLinkClass extends Component { //pass props
    constructor() {
        super();

        this.state = {
            name: "",
            handle: "",
        };
    }

    componentDidMount() {
        return fetch('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + this.props.person)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    name: responseJson.first_name + ' ' + responseJson.last_name,
                    handle: responseJson.instagram_handle
                });
            })

            .catch((error) => {
                console.log("ERROR hereee");
                console.log(this.props.handle);
                console.error(error);
            });
    }

    render() {
        const str = this.state.handle;
        let url = '';

        if (str.charAt(0) == '@') {
            url = "https://www.instagram.com/" + str.slice(1);
        }
        else {
            url = "https://www.instagram.com/" + str;
        }

        return (
            <AntDesign name="instagram" size={18} style={styles.space} onPress={() => Linking.openURL(url)} />
        )
    }
}

const Add = ({ }) =>
    <AntDesign name="plus" size={18} style={styles.space2} />

//INSTA TODO: get info from Insta API unless they want to make their own
const InfluencerBio = ({ }) =>

    <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: 25
    }}>

        <AntDesign name="info" size={30} style={styles.blue} />

        <View style={{ marginLeft: 10, marginTop: 40, marginRight: 80, marginBottom: 20 }}>
            <Text style={styles.blue}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
        </View>

    </View>

//<Ionicons name="md-lock" size={40}/>   
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

function LookFeed(props) {
    const pictures = props.pictures;
    const navigation = props.navigation;
    const products = props.products;

    const listProducts = pictures.map((picture) =>
        <LookPicture picture={picture} key={picture.date} navigation={navigation} products = {products}/>)

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
        <ScrollView >
            <FlatList
                data={formatData(listProducts, numColumns)}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
            />
        </ScrollView>
    );
}

const LookPicture = ({ picture, navigation }) =>
    // <TouchableOpacity onPress={() => navigation.navigate('SinglePostScreen')}>
    <TouchableOpacity >
        <LookPhoto photo={picture.img_urls[0]} />
    </TouchableOpacity>

// class LookPicture extends React.Component {
//     constructor() {
//       super();
  
//       this.state = {
//         id: '',
//         // person: Buffer.from(this.props.product.id, 'base64').toString().split('/')[4],
//       };
//     }

//     componentDidMount() {
        
//       return fetch('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + Buffer.from(this.props.product.id, 'base64').toString().split('/')[4])
//         .then((response) => response.json())
//         .then((responseJson) => {
  
//           this.setState({
//             id: responseJson.ID,
//           });
  
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
  
//     render() {
//       return (
//         <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePostScreen',{
//           productId: this.props.picture.id,
//           id:  this.state.id, //product
//           proID: Buffer.from(this.props.picture.id, 'base64').toString().split('/')[4],
//           })}>
            
//             <LookPhoto photo={this.props.picture.img_urls[0]} />
//         </TouchableOpacity>
//       )
//     }
//   }


const LookPhoto = ({ photo }) => //resizeMode="cover"  
    <Image
        source={{ uri: photo }}
        style={styles.lookphoto}
    />

const CartAddButton = ({ }) =>
    <Ionicons name="md-lock" size={10} />

const BottomHeader = ({ }) =>
    <View style={styles.bottomheaderbox}>
        <View style={styles.bottomheader}>
            <Feather name="align-justify" size={32} color="white" />
            <Foundation name="compass" size={32} color="white" />
            <Ionicons name="md-person" size={32} color="white" />
        </View>
    </View>


// command k 0
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    con: {
        flex: 1
    },
    contentContainer: {
        paddingTop: 10,

    },
    backColor: {
        backgroundColor: "grey",
        //'#d4eaf7'
    },
    welcomeContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 40
    },
    modContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "#f4f2f2",
        //'#f4fbff',
        //backgroundColor: '#f9fdff',
        //backgroundColor: '#f9fcff',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30
    },
    space: {
        paddingRight: 25,
        color: "black",
         //'#4B9CD3'
    },
    space2: {
        paddingRight: 10,
        color: "black",
        //'#4B9CD3'
    },
    viewheader: {
        //flex: 1,
        //color: 'blue',
        //alignItems: 'center',
        //justifyContent: 'center',
        //fontWeight: 'bold',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
        //justifyContent: 'space-between'
    },
    blue: {
        //marginTop: 70,
        color: "black",
        //'#4B9CD3'
        //'#42bcf4',
    },
    font: {
        fontSize: 20,
        paddingRight: 40,
    },
    margin: {
        marginTop: 70
    },
    rem: {
        paddingTop: 20,
        paddingLeft: 55,
        color: "black",
         //'#4B9CD3',
        paddingBottom: 10
    },
    leftAl: {
        color: "black",
        //'#4B9CD3',
        marginLeft: 10
    },
    rotate: {
        transform: [{ rotate: '270deg' }],
        marginRight: 320,
        marginLeft: 8,
        marginTop: 70

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
    bottomheaderbox: {
        marginTop: 5,
        backgroundColor: 'cornflowerblue'
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


export default InfluencerProfile;

// function LookPhotoFeedFunction(props) {
//     const products = props.products;
//     const handle = props.handle;
//     const navigation = props.navigation;


//     const filteredProducts = products.filter((product) => {
//         return product.name === handle; //*** want to filter based on the user somehow 
//     })

//     const listProducts = filteredProducts.map((product) =>
//         <LookPicture product = {product} navigation = {navigation}/>
//     )

//     return (
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//               {listProducts}
//         </ScrollView>
//     );

// }

// const LookPhotoFeed = ({navigation}) =>

//     <View style={{ height: 590 }}>
//         <View>
//             <Text style={styles.rem}>
//                 Looks: 30
//                 </Text>
//         </View>
//         <ScrollView >
//             <View style={styles.betweenLooks}>
//                 <View style={styles.looksStyle}>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                 </View>
//                 <View style={styles.looksStyle}>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                 </View>
//                 <View style={styles.looksStyle}>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                 </View>
//                 <View style={styles.looksStyle}>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                 </View>
//                 <View style={styles.looksStyle}>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                 </View>
//                 <View style={styles.looksStyle}>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                     <LookPicture navigation = {navigation}/>
//                 </View>

//             </View>
//         </ScrollView>
//     </View>

//TODO: 
// const InfluencerInfo = ({ pictures , handle }) =>

//     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

//         <FontAwesome name="user-circle-o" size={30} style={styles.blue} />

//         <View style={{ flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between' }}>

//             {/* TODO: Pull Influencer Name */}
//             <Text style={styles.leftAl} >
//                 Lawrence Zhang
//             </Text>

//             {/* TODO: Pull Influencer Handle */}
//             <Text style={styles.leftAl} >
//                 {handle}
//             </Text>

//         </View>
//     </View>

//INSTA TODO: link 
// const InstagramLink = ({ }) =>
//     <AntDesign name="instagram" size={18} style={styles.space} />
