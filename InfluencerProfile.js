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
            products: [], //array of all available products
        };
    }
    static navigationOptions = { //text shown in the header
        title: 'Profile',
    };

    componentDidMount() {
        return client.product.fetchAll().then((res) => { //fetch product info from Shopify
            this.setState({
                products: res,
            });
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });;
    }

    render() {
        //get the parameter arguments passed through nav
        const { navigation } = this.props;
        const sellingID = navigation.getParam('sellID', 'noid'); //ID to get items person is selling
        const personID = navigation.getParam('person', 'noperson'); //ID to get information about the person
        return (
            <View style={styles.container}>
                <ProfileContainer sellingID={sellingID} navigation={this.props.navigation} personID={personID} products={this.state.products} />
            </View>
        )
    }
}


class ProfileContainer extends Component { //class that contains all of the components
    constructor() {
        super();

        this.state = {
            pictures: []
        };
    }

    componentDidMount() { //fetch  all products for the specific person from Duke API
        return fetch('https://shopherlook-sell.app/API/postsByProfileID?profileID=' + this.props.sellingID)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    pictures: responseJson
                });
            })
            .catch((error) => {
                console.log("ERROR");
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <InfluencerContainer pictures={this.state.pictures} sellingID={this.props.sellingID} navigation={this.props.navigation} personID={this.props.personID} products={this.props.products} />
            </View>
        )
    }
}

//function/const that contains all of the components
//BioContainer: info about influencer 
//LookFeed: pics of all the objects
const InfluencerContainer = ({ pictures, sellingID, navigation, personID, products }) =>
    <View>
        <BioContainer personID={personID} />
        <LookFeed pictures={pictures} sellingID={sellingID} navigation={navigation} products={products} />
    </View>

// ProfileIcons: light blue bar with influencer info 
// InfluencerBio: influencer bio text
const BioContainer = ({ personID }) =>
    <View>
        <ProfileIcons personID={personID} />
        <InfluencerBio />
    </View>

//InfluencerInfo: Influencer name and Instgram handle
//FuncIcons: Instagram button and follow user button (not implemented yet)
const ProfileIcons = ({ personID }) =>
    <View style={styles.modContainer}>
        <InfluencerInfo personID={personID} />
        <FuncIcons personID={personID} />
    </View>

class InfluencerInfo extends Component {
    constructor() {
        super();

        this.state = {
            name: "", //name of influencer
            handle: "", //handle of influencer
        };
    }

    componentDidMount() { //fetch name and handle info from Duke API
        return fetch('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + this.props.personID)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    name: responseJson.first_name + ' ' + responseJson.last_name,
                    handle: responseJson.instagram_handle
                });
            }).catch((error) => {
                console.log("ERROR");
                console.error(error);
            });
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Profile Icon */}
                <FontAwesome name="user-circle-o" size={30} style={styles.black} /> 

                <View style={{ flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between' }}>
                    
                    {/* Name of Influencer */}
                    <Text style={styles.leftAl}>
                        {this.state.name}
                    </Text>

                    {/* Insta handle of Influencer */}
                    <Text style={styles.leftAl}>
                        {this.state.handle}
                    </Text>

                </View>
            </View>
        )
    }
}
//InstagramLinkClass: Instagram button that links to user's Instagram account
//Add: Follow button
const FuncIcons = ({ personID }) =>
    <View style={{ flexDirection: 'row', alignItems: 'right', justifyContent: 'space-between' }}>
        <InstagramLinkClass personID={personID} />
        <Add />
    </View>

class InstagramLinkClass extends Component { 
    constructor() {
        super();

        this.state = {
            handle: "", //handle of the Influencer
        };
    }

    componentDidMount() { //pull handle information from Duke API
        return fetch('https://shopherlook-sell.app/API/profileByStoreID/?storeID=' + this.props.personID)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    handle: responseJson.instagram_handle
                });
            }).catch((error) => {
                console.log("ERROR hereee");
                console.log(this.props.handle);
                console.error(error);
            });
    }

    render() {
        const str = this.state.handle;

        let url = ''; //url of the influencer's Instagram account
        if (str.charAt(0) == '@') { //account for handles that have '@' and handles that don't (from API)
            url = "https://www.instagram.com/" + str.slice(1);
        } else {
            url = "https://www.instagram.com/" + str;
        }

        return ( //instagram symbol with click to go to URL functionality
            <AntDesign 
                name="instagram" 
                size={30} 
                style={styles.space} 
                onPress={() => Linking.openURL(url)} 
            />
        )
    }
}

const Add = ({ }) => //add symbol with future follow functionality (none yet)
    <AntDesign name="plus" size={30} style={styles.space2} />

//INSTA TODO: get info from Instagram API (not implemented), currently static text
const InfluencerBio = ({ }) =>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 25 }}>

        <AntDesign name="info" size={30} style={styles.black} />

        <View style={{ marginLeft: 10, marginTop: 40, marginRight: 80, marginBottom: 20 }}>
            <Text style={styles.black}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
        </View>

    </View>

//function for picture icon formatting
const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

const numColumns = 3; //number of columns of photos 

function LookFeed(props) {
    const pictures = props.pictures;
    const navigation = props.navigation;
    const products = props.products;

    const listProducts = pictures.map((picture) =>
        <LookPicture picture={picture} key={picture.date} navigation={navigation} products={products} />)

    renderItem = ({ item }) => { //function used in FlatList component to organize photos
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

//each individual photo is a LookPicture,
//allows for TouchableOpacity/button functionality, and future navigation functionality
const LookPicture = ({ picture, navigation }) =>
    // <TouchableOpacity onPress={() => navigation.navigate('SinglePostScreen')}>
    <TouchableOpacity >
        <LookPhoto photo={picture.img_urls[0]} />
    </TouchableOpacity>

//each LookPhoto is an the image of the specific item
const LookPhoto = ({ photo }) =>
    <Image
        source={{ uri: photo }}
        style={styles.lookphoto}
    />

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
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30
    },
    space: {
        paddingRight: 25,
        color: "black",
    },
    space2: {
        paddingRight: 10,
        color: "black",
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    black: { 
        color: "black",
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
        paddingBottom: 10
    },
    leftAl: {
        color: "black",
        marginLeft: 10
    },
    rotate: {
        transform: [{ rotate: '270deg' }],
        marginRight: 320,
        marginLeft: 8,
        marginTop: 70
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
    lookphoto: {
        resizeMode: 'stretch', //or center?
        height: 125,
        width: 125
    }
});

export default InfluencerProfile;
