import React, { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { Firebase, Languages, Images, Url, Store } from '@common';
import { showMessage } from "react-native-flash-message";
import axios from 'axios';

const QueryString = require('query-string');

const GoogleLogin =() => {
    const navigation = useNavigation();
    const [loading, setloading] = useState(false);

    const GoogleSignIn = async () => {
      setloading(true);
      GoogleSignin.configure({
          webClientId: Store.googlewebclientid,
          scopes: ['profile', 'email'],
          profileImageSize: 300, 
      });
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = Firebase.auth.GoogleAuthProvider.credential(idToken);
        Firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            ServerAuth(userInfo.user, user.uid);
          }
        });
        console.log(userInfo);
        return Firebase.auth().signInWithCredential(googleCredential);
      } catch (error) {
        console.log("Error "+error)
        showMessage({
          message: 'Something went wrong with google signin, please try again.',
          type: "warning",
          icon : 'warning',
          duration : 2500
        });
          setloading(false);
      }
    }

    const ServerAuth = (array, firebaseauthid) => {
        const user = array;
        axios.post(Url.googleauthurl, 
        QueryString.stringify({
          fname : user.givenName,
          lname : user.familyName,
          firebaseauthid : firebaseauthid,
          authemail : user.email,
          photo : user.photo
        }), 
        {
          headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
          if(response.data.status == 1){
            const dname = `${response.data.customer.first_name} ${response.data.customer.last_name}`
            AsyncStorage.setItem('email', response.data.customer.email+ '');
            AsyncStorage.setItem('userid', response.data.customer.id + '');
            AsyncStorage.setItem('fname', response.data.customer.first_name+ '');
            AsyncStorage.setItem('lname', response.data.customer.last_name+ '');
            AsyncStorage.setItem('userPhoto', response.data.customer.photo ?? "");
            AsyncStorage.setItem('deliveryname', dname);
            if(response.data.customer.phonenumber){
              AsyncStorage.setItem('phonenumber', response.data.customer.phonenumber+'');
            }
            if(response.data.customer.def_city){
              AsyncStorage.setItem('city', response.data.customer.def_city+ '');
            }
            showMessage({
                message: 'Login Success !',
                type: "success",
                icon : 'success',
                duration : 2500
            });
            setloading(false);
            navigation.replace('UpdateUserInfo');
          } 
        }).catch((error)=>{
          alert(error);
          setloading(false)
        });
    }

    const ButtonView = ({icon, title}) => {
        return(
          <TouchableOpacity 
            onPress={GoogleSignIn} 
            style={[styles.button]}
          >
            <Image source={icon} style={[styles.bottonimage]}></Image>
            <Text style={[styles.buttontitle]}>{title}</Text>
            <Text style={[styles.buttontitle]}></Text>
          </TouchableOpacity>
        );
    }
  
    return(
      <View>
          <ButtonView icon={Images.GoogleIcon} title={loading ? Languages.LoginginPleaseWait : Languages.googlebuttontitle} actiontype={'google'}/>
      </View>
    );
  }
  export default GoogleLogin;