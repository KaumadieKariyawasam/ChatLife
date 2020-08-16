import React, { Component } from 'react';
import { View,Text ,StyleSheet,TextInput,TouchableOpacity,Image,StatusBar,LayoutAnimation,AsyncStorage} from 'react-native';
import {Ionicons} from '@expo/vector-icons'; 
import User from '../Users';
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component {
    static navigationOptions={
        haeder:null 
    };
    state={
        name:"",
        phone:"",
        password:"",
        errorMessage:null
    };
    handleSignup=async()=>{


        if(this.state.phone.length!=10){
            alert("Invalid Phone NUmber");
            
          }else{
            if(this.state.password.length>6){
                await AsyncStorage.setItem('userPhone',this.state.phone);
                User.phone=this.state.phone;
                firebase.database().ref('useers/'+User.phone).set({name:this.state.name,password:this.state.password});
                console.log('password',this.state.password);
                console.log('navigation');
          
                this.props.navigation.navigate('Home');
            }else{
                alert("Enter strong password. atleast 6 character!");
            }
          
          }
    };

   /* submitForm=async()=>{
        if(this.state.phone.length!=10){
          alert("Invalid Phone NUmber");
        }else{
         await AsyncStorage.setItem('userPhone',this.state.phone);
         User.phone=this.state.phone;
         firebase.database().ref('useers/'+User.phone).set({name:this.state.name});
         console.log('navigation');
   
         this.props.navigation.navigate('Home');
        }
      }*/
  
    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                 <StatusBar barStyle="light-content"></StatusBar>
           

                <Text style={styles.greeting}>{'Create New Account'}</Text>
                

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
             

            <View style={styles.form}>
            <View>
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={name=>this.setState({name})} value={this.state.name}></TextInput>
                </View>
                <View>
                    <Text style={styles.inputTitle}>Phone Number</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={phone=>this.setState({phone})} value={this.state.phone}></TextInput>
                </View>
                <View style={{marginTop:32}}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={password=>this.setState({password})} value={this.state.password}></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
          

            <TouchableOpacity style={{alignSelf:"center", marginTop:32}} onPress={()=>this.props.navigation.navigate("Login")}>
                <Text style={{color:"#414959",fontWeight:"500"}} >
                    If you already created Account<Text style={{fontWeight:"500", color:"#4d94ff"}}>Sign In</Text>
                </Text>
            </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    greeting:{
        marginTop:32,
        fontSize:18,
        fontWeight:"400",
        textAlign:"center"
    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    },
    inputTitle:{
        color:"#000000",
        fontSize:15,
        textTransform:"uppercase"
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color:"#161F3D"
    },
   
    errorMessage:{
        height:72,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:30
    },
    error:{
        color:"#E9446A",
        fontSize:13,
        fontWeight:"600",
        textAlign:"center"
    },
    back:{
        position:"absolute",
        top:48,
        left:32,
        width:50,
        height:50,
        borderRadius:16,
        backgroundColor:"rgb(0,0,0)",
        alignItems:"center",
        justifyContent:"center"

    },
    button:{
        marginHorizontal:20,
        backgroundColor:"#4d94ff",
        borderRadius:4,
        height:50,
        alignItems:"center",
        justifyContent:"center"
    }


})