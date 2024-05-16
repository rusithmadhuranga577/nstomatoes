/** @format */

import React, { useEffect } from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import GoogleLogin from './SocialLogin/googlelogin';
import AppleSign from './SocialLogin/applesignin';
import { Images, Languages, Colors, Store } from '@common';
import axios from 'axios';

const QueryString = require('query-string');

const Login =() => {

  const navigation = useNavigation();

  useEffect(() => {
  }, [])

  const ButtonView = ({icon, title, actiontype, navpage}) => {
      return(
        <TouchableOpacity 
        onPress={() => 
          actiontype == 'nav' ? navigation.push(navpage):null || 
          actiontype == 'guest' ? ContinueAsGuestFunction() : null
        }  
          style={[styles.button]}
        >
          <Image source={icon} style={[styles.bottonimage]}></Image>
          <Text style={[styles.buttontitle]}>{title}</Text>
          <Text style={[styles.buttontitle]}></Text>
        </TouchableOpacity>
      );
  }

  // const getNearestRestaurant = (latitude, longitude) => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   }).then(location => {
  //     Geocoder.from(location.latitude, location.longitude)
  //     .then(async json => {
  //       axios.post(Url.getnearestrestauranturl, 
  //   QueryString.stringify({
  //       latitude: latitude,
  //       longitude: longitude
  //   }),
  //   {
  //     headers: {"Content-Type": "application/x-www-form-urlencoded",}
  //   })
  //   .then(response => {
  //     AsyncStorage.setItem('nearest_restaurant', JSON.stringify(response.data));
  //   }).catch(error => {
  //     alert(error);
  //   })
  //   })
  //   }).catch(error => {
  //     setshowretryicon(true);
  //   });
  // }

  const ContinueAsGuestFunction = () => {
    AsyncStorage.setItem('email', 'guest@nstomatoes.lk');
    AsyncStorage.setItem('userid', '0');
    AsyncStorage.setItem('fname', 'Guest');
    AsyncStorage.setItem('lname', 'User');
    AsyncStorage.setItem('userPhoto', '');
    AsyncStorage.setItem('deliveryname', 'Guest User');
    AsyncStorage.setItem('phonenumber', ''+'');
    AsyncStorage.setItem('city', '');
    AsyncStorage.setItem('address', 'PLEASE LOGIN TO ADD AN ADDRESS');
    AsyncStorage.setItem('latitude', Store.merchantlat+'');
    AsyncStorage.setItem('longitude', Store.merchantlan+'');
    AsyncStorage.setItem('logged', 1+'');

    setTimeout(() => {
      navigation.replace('HomeTabNavigator')
    }, 500);
  }

  return(
    <View style={[styles.imagebg, {padding: 0, backgroundColor : Colors.primary}]}>
        <ScrollView style={[styles.bottomcard]}>
            <Text style={[styles.title]}>{Languages.loginCardTitle}</Text>
            <Text style={[styles.subtitle]}>{Languages.loginCardSubtitle}</Text>
            <View style={[styles.buttoncontainer]}>
                {Platform.OS === 'ios' ? <AppleSign/> : <View/>}
                <GoogleLogin/>
                {/* <FacebookLogin/> */}
                {/* <ButtonView icon={Images.PhoneIcon} title={Languages.phonenumberbuttontitle} actiontype={'nav'} navpage={'PhoneInput'}/> */}
                <ButtonView icon={Images.UsernamePassword} title={Languages.LoginwithUserNamePassword} actiontype={'nav'} navpage={'UsernamepassowrdLogin'}/>
                <ButtonView icon={Images.GuestIcon} title={Languages.ContinueAsGuest} actiontype={'guest'} navpage={'UsernamepassowrdLogin'}/>
            </View>
        </ScrollView>
        <Image source={Images.Logo} style={[styles.logoimage]}/>
    </View>
  );
}
export default Login;