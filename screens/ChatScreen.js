import React from 'react';
import {SafeAreaView, View,Text,TextInput,Dimensions} from 'react-native';
//import styles from '../constants/styles';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import User from '../Users';
import firebase from 'firebase'


export default class ChatScreen extends React.Component {
   static navigationOptions=({navigation})=>{
       return{
           title:navigation.getParam('name',null)
       }
   }
  constructor(props){
      super(props);
      this.state={
          person:{
              name:props.navigation.getParam('name'),
              phone:props.navigation.getParam('phone'),
          },
          textMessage:'',
          messageList:[]
      }
  }
  componentWillMount(){
      console.log('User.phone:',User.phone);
      firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).
      on('child_added',(value)=>{
          this.setState((prevState)=>{
              return{
                  messageList:[...prevState.messageList,value.val()]
              }
          })
      })
  }
   handleChange= key => val =>{
       this.setState({[key]:val})
   }
   dltMsg=({item})=>{
       console.log('dlt msg');
       //console.log
   }
   convertTime=(time)=>{
       let d=new Date(time);
       let c=new Date();
       let result=(d.getHours()<10?'0':'')+d.getHours()+':';
       result+=(d.getMinutes()<10?'0':'')+d.getMinutes();
        if(c.getDay()!==d.getDay()){
            result=d.getDay()+''+d.getMonth()+''+result;
        }
        return result;
    }
   sendMessage= async () => {
       if(this.state.textMessage.length>0){
           let msgId=firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates={};
            let message={
                message:this.state.textMessage,
                time:firebase.database.ServerValue.TIMESTAMP,
                from :User.phone,
                to:this.state.person.phone
            }
            updates['messages/'+User.phone+'/'+this.state.person.phone+'/'+msgId]=message;
            updates['messages/'+this.state.person.phone+'/'+User.phone+'/'+msgId]=message;
            console.log('pperson :',this.state.person.phone);
            firebase.database().ref().update(updates);
            this.setState({textMessage:''});
        }

   }
   renderRow=({item})=>{
       return(
      
           <View style={{
           
               flexDirection:'row',
               width:'60%',
               alignSelf:item.from===User.phone?'flex-end':'flex-start',
               backgroundColor:item.from===User.phone?'#00897b':'#7cb342',
               borderRadius:5,
               marginBottom:10
           }}>
         
               <Text style={{color:'#fff',padding:7,fontSize:16}}>
              
                    {item.message}
               </Text>
               <Text style={{color:'#eee',padding:3,fontSize:12}}>{this.convertTime(item.time)}</Text>
           </View>
       )
   }
    render() {
        let {height,width}=Dimensions.get('window');
        return (
           
            <SafeAreaView>
               
                <FlatList 
               // style={{padding:10,height:height*0.8}}
              
                data={this.state.messageList}
                renderItem={this.renderRow}
                keyExtractor={(item,index)=>index.toString()}
                />
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
               <TextInput style={styles.input}
               value={this.state.textMessage}
               onChangeText={this.handleChange('textMessage')}
               />
               <TouchableOpacity onPress={this.sendMessage}>
                   <Text style={styles.btnText}>Send</Text>
               </TouchableOpacity>
               
               </View>
            </SafeAreaView>
        );
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
      
    }
  }