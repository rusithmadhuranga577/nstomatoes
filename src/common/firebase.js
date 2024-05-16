import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";

  if(!firebase.apps.length){
    var firebaseConfig = {
        apiKey: "AIzaSyAcc2vlC7FITq4xaFZujeGM_Zbnb3RIMVc",
        authDomain: "ns-tomatoes.firebaseapp.com",
        databaseURL: "https://ns-tomatoes.firebaseio.com",
        projectId: "ns-tomatoes",
        storageBucket: "ns-tomatoes.appspot.com",
        messagingSenderId: "220319882576",
        appId: "1:220319882576:android:18f56f74a544e7dd652055",
    };
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
  }else{
    firebase.app();
  }


export default firebase;