/** @format */

import React, { useState, useRef  } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import styles from './styles';
import { Images, Languages } from '@common';
import { useNavigation } from '@react-navigation/native';
import { Colors, Url } from '@common';
import { Button, LoadingComponent } from '@components';
import OTPTextInput from 'react-native-otp-textinput';
import { showMessage } from "react-native-flash-message";

const QueryString = require('query-string');

const VerifyCode = ({route}) => {

  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  var otpInput = useRef(null);
  const [code, setcode] = useState('');
  const {phoneno} = route.params;

  const setText = (text) => {
    setcode(text);
  }

  const VerifyFunction = () => {
    setloading(true);
    axios.post(Url.otpverifyurl, 
      QueryString.stringify({
        mobilenumber : phoneno,
        authcode : code
      }), 
      {headers: {"Content-Type": "application/x-www-form-urlencoded",}})
      .then(response => {
        console.log(response.data.customer)
        if(response.data.status == 1){
          showMessage({
            message: "Phone number validated",
            type: "success",
            icon : 'success',
            duration : 2500
          });
          AsyncStorage.setItem('email', response.data.customer.email);
          AsyncStorage.setItem('userid', response.data.customer.id+'');
          AsyncStorage.setItem('fname', response.data.customer.first_name);
          AsyncStorage.setItem('lname', response.data.customer.last_name);
          AsyncStorage.setItem('phonenumber', response.data.customer.phonenumber+'');
          AsyncStorage.setItem('homenumber', response.data.customer.homenumber+'');
          AsyncStorage.setItem('userPhoto', response.data.customer.photo);
          AsyncStorage.setItem('authmode', response.data.customer.authmode);
          setTimeout(() => {
            setloading(false);
            navigation.replace('UpdateUserInfo');
           }, 1500);
        }else if(response.data.status == 0){
          showMessage({
            message: "Invalid Auth Code. Please try again.",
            type: "danger",
            icon : 'danger',
            duration : 3000
          });
          setloading(false);
        }
    })
  }

  const resendFunction = () => {
    setloading(true);
    axios.post(Url.phonenumberauthurl, 
      QueryString.stringify({
        mobilenumber : phoneno,
      }), 
      {headers: {"Content-Type": "application/x-www-form-urlencoded",}})
      .then(response => {
        console.log(response.data)
        if(response.data.status == 1){
          showMessage({
            message: response.data.message,
            type: "success",
            icon : 'success',
            duration : 2500
          });
          setTimeout(() => {
            setloading(false);
          }, 1500);
        }else if(response.data.status == 2){
          setloading(false);
          showMessage({
            message: "OTP resent successfully",
            type: "success",
            icon : 'success',
            duration : 2500
          });
        }
      })
  }

  return(
    <View>
      <LoadingComponent visibility={loading}/>
      <View style={[styles.container, {padding: 10, paddingTop : 80}]}>
        <Text style={[styles.phonenumbertitle, {fontSize: 30, color: Colors.black, marginTop : 30}]}>{Languages.Verify}</Text>
        <View style={{width: '80%', alignSelf: 'center', marginTop: 15}}>
          <OTPTextInput
            ref={e => (otpInput = e)} 
            tintColor={Colors.white}
            offTintColor={Colors.white}
            textInputStyle={[styles.otpinput]}
            handleTextChange={setText}
          />
        </View>
        {code.length !== 0 ? null : 
          <View>
            <Text style={[styles.otppagedescriptiontext]}>{Languages.OtpPageDescription} {phoneno}</Text>
            <Text style={[styles.otppagedescriptiontext, {color : 'red'}]}>{Languages.OtpDescription2}</Text>
            <Text style={[styles.didntrecievedcodetext]}>{Languages.DidntRecived}</Text>
            <TouchableOpacity onPress={resendFunction} style={[styles.sendagainbutton]}>
              <Text style={[styles.sendagainbuttontext]}>{Languages.SendAgain}</Text>
            </TouchableOpacity>
          </View>
        }

        <Image source={Images.Logo} style={[styles.phoneinputlogoimage]}/>
        {code.length == 0 ? null : 
        <View style={{marginTop : 50}}>
          <Button title={Languages.VerifyButtonTitle} action={VerifyFunction}/>
        </View>}
      </View>
    </View>
  );
}
export default VerifyCode;