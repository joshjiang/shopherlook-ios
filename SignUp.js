import React, {Component} from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'


function TempHeader() {
    return (
    <View style = {styles.tempHeader}>
    <Text style = {{fontFamily: "Baskerville", fontSize: 45, fontStyle: 'italic'}}>SHOPherLOOK</Text>
    </View>);
  }

function SignUpButton() {
    return (
        <View style= {styles.signupbutton}>
        <Text style = {{fontSize: 15}}> SignUp</Text>
        </View>
    );
}

function LoginButton() {
    return (
        <View style= {styles.loginbutton}>
        <Text style = {{fontSize: 15}}> Login</Text>
        </View>
    );
}






class SignUp extends Component {
    
    render() {
        return(
            <View style = {styles.container}>
               <TempHeader/> 
               <LoginButton/>
               <SignUpButton/>      
              </View>
            
            

        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: 100 + "%", 
      height: 100 + "%",
      
    },
    tempHeader:{
        width: 100 + "%",
        height: 200,
        backgroundColor: "#d5e0ff",
        marginTop: 20,
        borderBottomColor: "rgb(233,233,233)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
        alignItems: "center"
    },
    loginbutton: {
        width: 300,
        height:50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#d5e0ff',
        position: 'absolute',
        top: 400,
        left: 40,
        borderRadius: 30,
        alignSelf: 'center',


    },
    signupbutton: {
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#d5e0ff',
        position: 'absolute',
        top: 500,
        left: 40,
        borderRadius: 30,
        alignSelf: 'center',


    }
    
    
  });

export default SignUp