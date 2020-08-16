import React, { Component } from 'react';
import { View,Text ,StyleSheet,TextInput,TouchableOpacity,Image,StatusBar,LayoutAnimation,AsyncStorage} from 'react-native';
import {Ionicons} from '@expo/vector-icons'; 
import User from '../Users';
import * as firebase from 'firebase'
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class RegisterScreen extends React.Component {
    static navigationOptions={
        haeder:null 
    };
    state={
        name:"",
        phone:"",
        password:"",
        errorMessage:null,
        count:''
    };
    handleSignup=async()=>{
      console.log('phone',this.state.phone);
      User.phone=this.state.phone;
      let dbRef=firebase.database().ref('useers');
      dbRef.on('child_added',(val)=>{
          let person=val.val();
          person.phone=val.key;
         console.log('person',person.phone);
         if(person.phone==this.state.phone){
             this.state.count=1;
           if(person.password==this.state.password){
               User.password=this.state.password;
            this.props.navigation.navigate('Home');
           }else{
             alert("Wrong password...");
           }
         }
      })
    //  this.checkNumber();
      
      
    };
    checkNumber(){
        if(this.state.count==""){
            alert("Wrong phone number. can't login")
        }
    }

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
           

             
                
                <Text style={styles.greeting}>{'Sign In'}</Text>
                

               

            <View style={styles.form}>
          
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
                <Text>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:"center", marginTop:32}} onPress={()=>this.props.navigation.navigate("Register")}>
                <Text style={{color:"#414959",fontWeight:"500"}} >
                    If you already created a account<Text style={{fontWeight:"500", color:"#4d94ff"}}>Sign Up</Text>
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