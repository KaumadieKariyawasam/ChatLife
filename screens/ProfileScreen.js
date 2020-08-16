import React from 'react';
import { View,Text ,StyleSheet,TextInput,TouchableOpacity,Image,StatusBar,LayoutAnimation} from 'react-native';
import User from '../Users';
import firebase from 'firebase'
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ProfileScreen extends React.Component {
  
    state={
        name:'',
        currentPwd:'',
        newPwd:'',
        confirmPwd:''
    }

    handleChage=key=>val=>{
        this.setState({[key]:val});
        this.state.name=val;
        console.log(val);

    }
    changeName=async()=>{
        console.log('user name',User.name);
        console.log('state name',this.state.name);
        if(User.name!==this.state.name){
            console.log("in the function");
            if(firebase.database().ref('useers').child(User.phone).set({name:this.state.name,password:User.password})){
                User.name=this.state.name;
                alert("User name changed..");
            }else{
                alert("Try again.. can't change")
            }
        }
    }
    pwdChange=async()=>{
        
        if(User.password==this.state.currentPwd){
            if(this.state.newPwd==this.state.confirmPwd){
               if(firebase.database().ref('useers').child(User.phone).set({name:User.name,password:this.state.newPwd})){
                   alert("Sucessfully changed..");
                   User.password=this.state.password;
               }else{
                   alert("Can't change Try again..");
               }
                  
            }else{
                alert("New Password & Confirmed password are not match");
                this.state.newPwd="";
                this.state.confirmPwd="";
            }
        }else{
            alert("Current password is incorrect..");
            this.state.currentPwd="";
        }
    }
    dltAcc=async()=>{
       
        console.log('in the function');
        //console.log('in the function');
        if(this.state.currentPwd==User.password){
            console.log('true if');
            if(firebase.database().ref('useers').child(User.phone).remove()){
                alert("Sorry your account deleted..")
                this.props.navigation.navigate("Register");
            }else{
                alert('Cant delete try again');
            }
        }else{
            alert("Incorrect password");
        }
    
    }
    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                 <StatusBar barStyle="light-content"></StatusBar>
           

             
                
                <Text style={styles.greeting}>{'Sign In'}</Text>
                

               

            <View style={styles.form}>
          
                <View>
                    <Text style={styles.inputTitle}>Phone Number</Text>
                    <TextInput style={styles.input} autoCapitalize="none"  value={User.phone}></TextInput>
                </View>
                <View>
                    <Text style={styles.inputTitle}>Phone Number</Text>
                    <TextInput style={styles.input} autoCapitalize="none"  placeholder={User.name} onChangeText={name=>this.setState({name})}></TextInput>
                </View>
           
            <TouchableOpacity style={styles.button} onPress={this.changeName}>
                <Text> Change Name</Text>
            </TouchableOpacity>

            <Text style={styles.greeting}>{'Change Password'}</Text>
            <View style={{marginTop:32}}>
                    <Text style={styles.inputTitle}>Current Password</Text>
                    <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={currentPwd=>this.setState({currentPwd})} value={this.state.currentPwd}></TextInput>
                </View>
                <View style={{marginTop:32}}>
                    <Text style={styles.inputTitle}>New Password</Text>
                    <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={newPwd=>this.setState({newPwd})} value={this.state.newPwd}></TextInput>
                </View>
                <View style={{marginTop:32}}>
                    <Text style={styles.inputTitle}>Confirm Password</Text>
                    <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={confirmPwd=>this.setState({confirmPwd})} value={this.state.confirmPwd}></TextInput>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.pwdChange}>
                <Text> Change Password</Text>
            </TouchableOpacity>
            <Text style={styles.greeting}>{'Deactivate Account'}</Text>
            <View style={{marginTop:32}}>
                    <Text style={styles.inputTitle}>Enter Password</Text>
                    <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={currentPwd=>this.setState({currentPwd})} value={this.state.currentPwd}></TextInput>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.dltAcc}>
                <Text>Delete Account</Text>
            </TouchableOpacity>
            </View>

           
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
        fontSize:12,
        textTransform:"uppercase"
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:30,
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
      backgroundColor:"#0066cc",
      borderRadius:4,
      height:25,
      width:240,
      alignItems:"center",
      justifyContent:"center"
  }
})