import FirebaseKeys from "./config"
import firebase from 'firebase'

class Fire{
    constructor(){
        firebase.initializeApp(FirebaseKeys)
    }
    get firestore(){
        return firebase.firestore()
    }
    
}