import React, { Component } from 'react';
import { View,Text,StyleSheet, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase'
import User from '../Users'

export default class LoadingScreen extends React.Component {
    componentDidMount(){
        if(User.name){
            this.props.navigation.navigate("App")
        }
     /*   firebase.auth().onAuthStateChanged(user=>{
            this.props.navigation.navigate(user?"App":"Auth")
        })*/
        else{
            this.props.navigation.navigate("Auth")
        }
    }
   
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading Screen ....</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
            
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
    
})