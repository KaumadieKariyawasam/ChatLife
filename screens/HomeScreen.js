import React from 'react';
import {SafeAreaView,StyleSheet, IconButton,Text, View, Ionicons,TextInput,FlatList, Button, AsyncStorage,TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import User from '../Users';
//import styles from '../constants/styles'
import firebase from 'firebase'
import { color } from 'react-native-reanimated';

export default class HomeScreen extends React.Component{
   
    state={
        users:[]
    }
    componentDidMount(){
        let dbRef=firebase.database().ref('useers');
        dbRef.on('child_added',(val)=>{
            let person=val.val();
            person.phone=val.key;
            if(person.phone==User.phone){
                User.name=person.name;
            }else{
            console.log('person',person);
            this.setState((prevState)=>{
                return{
                    users:[...prevState.users,person]
                }
            })
        }
        })
    }

    _logOut=async()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    renderRow=({item})=>{
        return(
            
            <TouchableOpacity 
            onPress={()=>this.props.navigation.navigate('Chat',item)}
            style={{padding:10,backgroundColor:'#e6ffe6',borderColor:"#004d00", borderBottomWidth:1}}>
                <Text style={{fontSize:20}}>{item.name}</Text>
              
            </TouchableOpacity>
           
        )
    }
    render(){
        return(
            <SafeAreaView>
            
                 <TouchableOpacity style={styles.button}  onPress={()=>this.props.navigation.navigate('Profile')}>
                <Text>Settings</Text>
               
            </TouchableOpacity>
            <View>
            <Text style={styles.inputTitle}>Index No -: 17000742</Text>
                    <Text style={styles.inputTitle}>Name -: Kariyawasam A.G.K.P</Text>
                    
                </View>
                <FlatList
                data={this.state.users}
                renderItem={this.renderRow}
                keyExtractor={(item)=>item.phone} 
               
                />
            
            </SafeAreaView>
        )
    }
}
const styles={
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#F5FCFF"
    },
    input:{
      padding:10,
      borderWidth:1,
      borderColor:"#ccc",
      width:'90%',
      marginBottom:10,
      borderRadius:5,
      
    },
    button:{
        marginHorizontal:5,
        backgroundColor:"#99ccff",
        borderRadius:4,
        height:40,
        width:125,
        alignItems:"center",
        justifyContent:"center"
    },
    inputTitle:{
        color:"#000000",
        fontSize:15,
        textTransform:"uppercase"
    }
  }