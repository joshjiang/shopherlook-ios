import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Ionicons, AntDesign, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';




class InfluencerProfile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ProfileContainer />
            </View>
        )
    }
}

const ProfileContainer = ({ }) =>
    <View>
        <ViewHeader />
        <InfluencerContainer />
    </View>

const ViewHeader = ({ }) =>
    //<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    // 
    <View style={styles.welcomeContainer}>

        <MaterialCommunityIcons name="square" size={32} color='white' />
        <Text style={styles.blue}>PROFILE</Text>
        <Ionicons name="md-lock" size={18} style={styles.blue} />


    </View>


const InfluencerContainer = ({ looks }) =>
    <View>
        <BioContainer />
        <LookPhotoFeed />
    </View>


const BioContainer = ({ }) =>
    <View>
        <ProfileIcons />
        <InfluencerBio />
    </View>


const ProfileIcons = ({ }) =>
    <View style={styles.modContainer}>
        <InfluencerInfo />
        <FuncIcons />
    </View>


const InfluencerInfo = ({ }) =>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <FontAwesome name="user-circle-o" size={30} style={styles.blue} />

        <View style={{ flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between' }}>




            <Text style={styles.leftAl} >
                Lawrence Zhang
            </Text>
            <Text style={styles.leftAl} >
                @larryz
            </Text>
        </View>


    </View>






const FuncIcons = ({ }) =>

    <View style={{ flexDirection: 'row', alignItems: 'right', justifyContent: 'space-between' }}>
        <InstagramLink />
        <Add />

    </View>

const InstagramLink = ({ }) =>

    <AntDesign name="instagram" size={18} style={styles.space} />

const Add = ({ }) =>

    <AntDesign name="plus" size={18} style={styles.space2} />


const InfluencerBio = ({ }) =>

    <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: 25
    }}>


        <AntDesign name="info" size={30} style={styles.blue} />




        <View style={{ marginLeft: 10, marginTop: 40, marginRight: 80, marginBottom: 20 }}>
            <Text style={styles.blue}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets co
            </Text>

        </View>



    </View>



//<Ionicons name="md-lock" size={40}/>   



const LookPhotoFeed = ({ }) =>

    <View style={{ height: 590 }}>

        <View>
            <Text style={styles.rem}>
                Looks: 30
                </Text>
        </View>
        <ScrollView >


            <View style={styles.betweenLooks}>
                <View style={styles.looksStyle}>
                    <LookPicture />
                    <LookPicture />
                    <LookPicture />
                </View>
                <View style={styles.looksStyle}>
                    <LookPicture />
                    <LookPicture />
                    <LookPicture />
                </View>
                <View style={styles.looksStyle}>
                    <LookPicture />
                    <LookPicture />
                    <LookPicture />
                </View>
                <View style={styles.looksStyle}>
                    <LookPicture />
                    <LookPicture />
                    <LookPicture />
                </View>
                <View style={styles.looksStyle}>
                    <LookPicture />
                    <LookPicture />
                    <LookPicture />
                </View>
                <View style={styles.looksStyle}>
                    <LookPicture />
                    <LookPicture />
                    <LookPicture />
                </View>

            </View>
        </ScrollView>
    </View>




const LookPicture = ({ }) =>

    <View>
        <MaterialCommunityIcons name="square" size={100} color='#d3e9ff' />
    </View>

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
        alignItems: 'center'
    },
    con: {
        flex: 1
    },


    contentContainer: {
        paddingTop: 30,
    },

    backColor: {
        backgroundColor: '#d4eaf7'
    },

    welcomeContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
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
        backgroundColor: '#f4fbff',
        //backgroundColor: '#f9fdff',
        //backgroundColor: '#f9fcff',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30
    },
    space: {
        paddingRight: 25,
        color: '#4B9CD3'
    },

    space2: {
        paddingRight: 10,
        color: '#4B9CD3'
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
        color: '#4B9CD3'
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
        color: '#4B9CD3',
        paddingBottom: 10

    },

    leftAl: {
        color: '#4B9CD3',
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


});


export default InfluencerProfile;