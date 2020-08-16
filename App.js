import React from 'react'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'

import ChatScreen from './screens/ChatScreen'
import ProfileScreen from './screens/ProfileScreen'

import { createBottomTabNavigator } from "react-navigation-tabs";
import {Ionicons} from "@expo/vector-icons"


import * as firebase from 'firebase'

//componentWillMount(){
  var firebaseConfig = {
      apiKey: "AIzaSyBczwQD9GdbT8LxJ8rxvql0gLuuIui7N3c",
      authDomain: "chatchat-76ce0.firebaseapp.com",
      databaseURL: "https://chatchat-76ce0.firebaseio.com",
      projectId: "chatchat-76ce0",
      storageBucket: "chatchat-76ce0.appspot.com",
      messagingSenderId: "91118202027",
      appId: "1:91118202027:web:bc7f3c00d5929d2ed15bee",
      measurementId: "G-ZKVMTZSBD4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
//}

const AppStack=createStackNavigator({
  Home:HomeScreen, Chat:ChatScreen,Profile:ProfileScreen
});
const AuthStack=createStackNavigator({Login:LoginScreen,Register:RegisterScreen});

//const AppStack= createStackNavigator({Home:HomeScreen,Chat:ChatScreen,Message:MessageScreen,Profile:ProfileScreen});
const AppTabNavigator= createBottomTabNavigator({
  Home:{
    screen:HomeScreen,
   /* navigationOptions:{
      tabBarIcon:({ tintColor })=><Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
    }*/
  },
  Chat:ChatScreen,
  Profile:{
    screen:ProfileScreen,
    navigationOptions:{
      tabBarIcon:({ tintColor })=><Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>
    }
  }
},{}
);
export default createAppContainer(createStackNavigator(
  {
     Loading:LoadingScreen,
     //App:AppStack,
    Auth:AuthStack,
    Home:HomeScreen,
    Chat:ChatScreen,
    Profile:ProfileScreen,
   

     
   },
   {
     initialRouteName:'Auth'
   }
 ));