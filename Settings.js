import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

class Settings extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ProfileContainer />
            </View>
        )
    }
}

const ProfileContainer = () =>
    <View>
        <ViewHeader />
        <MainContainer />
    </View>

// page title 
export const ViewHeader = () =>
    <View style={styles.welcomeContainer}>
        <Text style={styles.blue}>Settings</Text>
    </View>


const MainContainer = () =>
    <View>
        <Banner />
        <Info />
        <Options />
    </View>


export const Banner = ({ }) =>

    <View style={styles.bannerContainer}>
        <SimpleLineIcons name="user" size={80} style={styles.center} />
    </View>


export const Info = ({ }) =>

    <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between' }}>
                <Text style={styles.leftAll} >
                    Bilbo Baggins
                </Text>

                <Text style={styles.leftAl} >
                    @baggypants
                </Text>
            </View>

            <Button />

        </View>
    </View>


const Button = ({ }) =>

    <View style={styles.buttonContainer}> </View>

const Options = ({ }) =>

    <View style={styles.optionsContainer}>
        <Notifications />
        <Following />
        <Requests />
        <Payment />
        <Logout />
        <Help />
    </View>

export const Notifications = ({ }) =>

    <View style={styles.not}>
        <MaterialCommunityIcons name="bell" size={30} style={styles.padBlue} />

        <Text style={styles.padText} >
            Notifications
        </Text>

    </View>

const Following = ({ }) =>
    <View style={styles.fol}>

        <MaterialCommunityIcons name="bell" size={30} style={styles.padBlue} />
        <Text style={styles.padText} >
            Following
        </Text>

    </View>

const Requests = ({ }) =>
    <View style={styles.not}>

        <MaterialCommunityIcons name="bell" size={30} style={styles.padBlue} />

        <Text style={styles.padText} >
            Account
        </Text>

    </View>

const Payment = ({ }) =>
    <View style={styles.not}>

        <MaterialCommunityIcons name="bell" size={30} style={styles.padBlue} />


        <Text style={styles.padText} >
            Payment
        </Text>

    </View>

const Logout = ({ }) =>
    <View style={styles.not}>

        <MaterialCommunityIcons name="bell" size={30} style={styles.padBlue} />


        <Text style={styles.padText} >
            Logout
        </Text>

    </View>

const Help = ({ }) =>
    <View style={styles.not}>

        <MaterialCommunityIcons name="bell" size={30} style={styles.padBlue} />


        <Text style={styles.padText} >
            Help
        </Text>

    </View>














const styles = StyleSheet.create({

    optionsContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        //alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 140,
        paddingTop: 20,
        paddingLeft: 25,
        backgroundColor: 'white'

    },


    buttonContainer: {

        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 40,
        paddingBottom: 10,
        backgroundColor: 'black'


    },

    not: {
        flexDirection: 'row',
        paddingBottom: 25,
        paddingRight: 200
    },

    fol: {
        flexDirection: 'row',
        paddingBottom: 25,
        paddingRight: 225
    },



    padText: {

        color: "black",
        //'#4B9CD3',
        paddingTop: 7


    },



    welcomeContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 20,
        backgroundColor: "#f4f2f2",
        //'#f2f5ff'
    },

    blue: {
        //marginTop: 70,
        color: "black",
        //'#4B9CD3',
        paddingLeft: 180,
        paddingTop: 40
        //'#42bcf4',

    },
    simpBlue: {
        color: "black",
        //'#4B9CD3',
    },

    padBlue: {
        color: "black",
        //'#4B9CD3',
        paddingRight: 20,
        paddingLeft: 15
    },

    bellBlue: {
        color: "black",
        //'#4B9CD3',
        paddingTop: 0

    },

    center: {
        paddingTop: 30,
        paddingLeft: 110,
        color: "black",
        //'#4B9CD3'

    },


    bannerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "white",
        //'#d4eaf7',
        //backgroundColor: '#f9fdff',
        //backgroundColor: '#f9fcff',
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 40
    },

    leftAl: {
        color: "black",
        marginLeft: 10
    },

    leftAll: {
        color: "black",
        //'#4B9CD3'
        marginLeft: 10
    },

    infoContainer: {

        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "#f4f2f2",
        //'#f2f5ff',
        //backgroundColor: '#f9fdff',
        //backgroundColor: '#f9fcff',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 40


    }

});


export default Settings;