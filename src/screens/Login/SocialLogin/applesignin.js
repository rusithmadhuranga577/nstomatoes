import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Languages, Images, Url } from '@common';
import { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import styles from '../styles';
import axios from 'axios';

const QueryString = require('query-string');

class AppleSign extends React.Component{

      constructor(props) {
          super(props);

          this.state = {
              loading : false
          };
      }

    handleSignIn = async () => {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        console.log('appleAuthRequestResponse ------ ', appleAuthRequestResponse);
        console.log('appleAuth.State.AUTHORIZED  ', appleAuth.State.AUTHORIZED);
        console.log('credentialState  ', credentialState);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
          this.ServerAuth(appleAuthRequestResponse.fullName, appleAuthRequestResponse.identityToken, appleAuthRequestResponse.email);
          console.log(`RECIEVED DATA \n${appleAuthRequestResponse.fullName}\n${appleAuthRequestResponse.identityToken}\n${appleAuthRequestResponse.email}`)
        }else{
          showMessage({
            message: 'Something went wrong with Apple Signin, please try again.',
            type: "warning",
            icon : 'warning',
            duration : 2500
          });
        }
    }

    ServerAuth = (array, applelogintoken, email) => {
      this.setState({loading : true});
      const {navigation} = this.props;
      const user = array;

      console.log(`POST DATA \n${user.givenName}\n${user.familyName}\n${applelogintoken}\n${email}`)
      axios.post(Url.appleauthurl, 
      QueryString.stringify({
        fname : user.givenName,
        lname : user.familyName,
        applelogintoken : applelogintoken,
        authemail : email,
      }), 
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
      }).then(response => {
        console.log(response.data)
        if(response.data.status == 1){
          const dname = `${response.data.customer.first_name} ${response.data.customer.last_name}`
          AsyncStorage.setItem('email', response.data.customer.email);
          AsyncStorage.setItem('userid', response.data.customer.id + '');
          AsyncStorage.setItem('fname', response.data.customer.first_name);
          AsyncStorage.setItem('lname', response.data.customer.last_name);
          AsyncStorage.setItem('userPhoto', response.data.customer.photo);
          AsyncStorage.setItem('deliveryname', dname);
          if(response.data.customer.phonenumber){
            AsyncStorage.setItem('phonenumber', response.data.customer.phonenumber+'');
          }
          if(response.data.customer.def_city){
            AsyncStorage.setItem('city', response.data.customer.def_city);
          }
          showMessage({
              message: 'Login Success !',
              type: "success",
              icon : 'success',
              duration : 2500
          });
          this.setState({loading : false});
          navigation.replace('UpdateUserInfo');
        } 
      }).catch((error)=>{
          showMessage({
              message: error.toString(),
              type: "warning",
              icon : 'warning',
              duration : 2500
          });
          this.setState({loading : false});
      });
    }

    ButtonView = (icon, title) => {
        return(
          <TouchableOpacity 
            onPress={this.handleSignIn} 
            style={[styles.button]}
          >
            <Image source={icon} style={[styles.bottonimage]}></Image>
            <Text style={[styles.buttontitle]}>{title}</Text>
            <Text style={[styles.buttontitle]}></Text>
          </TouchableOpacity>
        );
    }

    render(){
      const loading = this.state.loading;
        return(
        <View>
            {this.ButtonView(Images.AppleIcon, loading ? Languages.LoginginPleaseWait : Languages.applebuttontitle)}
        </View>)

    }

    appleSignIn = (result) => {
        console.log('Resssult',result);
    };

}

export default function(props){
    const navigation = useNavigation();
    return <AppleSign {...props} navigation={navigation} />;
}