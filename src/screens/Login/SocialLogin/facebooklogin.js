import React, { useEffect } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { Firebase, Languages, Images, Url } from '@common';
import { showMessage } from "react-native-flash-message";
import axios from 'axios';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

const QueryString = require('query-string');

const FacebookLogin =() => {
    const navigation = useNavigation();

    useEffect(() => {

    }, [])

    const getInfoFromToken = (token) => {
      const PROFILE_REQUEST_PARAMS = {
        fields: {
          string: 'id,name,first_name,last_name,picture.type(large)',
        },
      };

      const profileRequest = new GraphRequest(
        '/me',
        {token, parameters: PROFILE_REQUEST_PARAMS},
        (error, user) => {
          if (error) {
            alert(error);
          } else {
            console.log('result:', user);
          }
        },
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    };

    const FacebookSignIn = async () => {
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const accessToken = data.accessToken.toString();
              getInfoFromToken(accessToken);
              const facebookCredential = Firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              Firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  console.log('User Id : ', user.uid);
                }
              });
              return Firebase.auth().signInWithCredential(facebookCredential);
            });
          }
        },
        function(error) {
          alert("Login fail with error: " + error);
        }
      );
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
           console.log(response.data.customer.email)
           if(response.data.status == 1){
            const dname = `${response.data.customer.first_name} ${response.data.customer.last_name}`
            AsyncStorage.setItem('email', response.data.customer.email);
            AsyncStorage.setItem('userid', response.data.customer.id + '');
            AsyncStorage.setItem('fname', response.data.customer.first_name);
            AsyncStorage.setItem('lname', response.data.customer.last_name);
            AsyncStorage.setItem('userPhoto', response.data.customer.photo);
            AsyncStorage.setItem('deliveryname', dname);
            showMessage({
                message: 'Login Success !',
                type: "success",
                icon : 'success',
                duration : 2500
            });
            setTimeout(() => {
                navigation.replace('UpdateUserInfo');
            }, 1500);
           } 
        })
    }

    const ButtonView = ({icon, title, actiontype, navpage}) => {
        return(
          <TouchableOpacity 
            onPress={()=>FacebookSignIn()} 
            style={[styles.button]}
          >
            <Image source={icon} style={[styles.bottonimage]}></Image>
            <Text style={[styles.buttontitle]}>{title}</Text>
          </TouchableOpacity>
        );
    }
  
    return(
      <View>
          <ButtonView icon={Images.FacebookIcon} title={Languages.facebookbuttontitle} actiontype={'facebook'}/>
      </View>
    );
  }
  export default FacebookLogin;