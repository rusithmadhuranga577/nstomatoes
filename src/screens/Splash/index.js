/** @format */

import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Animated,
  Platform,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import { Url, Colors } from '@common';
import axios from 'axios';
import GetLocation from 'react-native-get-location'
import NetInfo from "@react-native-community/netinfo";
import Geocoder from 'react-native-geocoding';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import Video from 'react-native-video';
import SplashVideo from "../../assets/splash_video.mp4";

const QueryString = require('query-string');
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const Splash =() => {

  const slideanimation = useRef(new Animated.Value(0)).current;
  const bordernimation = useRef(new Animated.Value(0)).current;
  const imageheight = useRef(new Animated.Value(ScreenHeight)).current;
  const imagewidth = useRef(new Animated.Value(ScreenWidth)).current;

  const navigation = useNavigation();

  useEffect(() => {
    initMethod();
  }, []);

  const initMethod = async  () => {
    checkNetworkSettings();
  }

  const checkNetworkSettings = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if(state.isConnected == false){
        // setshowretryicon(true);
        setnonetworktext(true);
      }else{
        requestLocationPermission();
      }
    });
    return unsubscribe();
  }

  const requestLocationPermission = async () => {
    if(Platform.OS === "android") {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((check_result) => {
        console.log(`::::::::: check_result ::::::::::: ${check_result}`);
        if(check_result == 'denied') {
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((req_result) => {
            console.log(`:::::::: req_result :::::::::::: ${req_result}`);
            if(req_result == 'denied') {
              showMessage({
                message: 'Location update failed, please update it mannually from App Settings',
                type: "danger",
                icon : 'danger',
                duration : 2000
              });
            } else if(req_result == 'granted') {
              getCurrentLocation();
            }
          });
        } else if(check_result == 'granted') {
          getCurrentLocation();
        }
      })
    } else {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((check_result) => {
        console.log(`::::::::: check_result ::::::::::: ${check_result}`);
        if(check_result == 'denied') {
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((req_result) => {
            console.log(`:::::::: req_result :::::::::::: ${req_result}`);
            if(req_result == 'denied') {
              showMessage({
                message: 'Location update failed, please update it mannually from App Settings',
                type: "danger",
                icon : 'danger',
                duration : 2000
              });
            } else if(req_result == 'granted') {
              getCurrentLocation();
            }
          });
        } else if(check_result == 'granted') {
          getCurrentLocation();
        }
      })
    }
  };

  const getCurrentLocation = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(location => {
      console.log('getCurrentLocation');
      Geocoder.from(location.latitude, location.longitude)
      .then(async json => {
        var addressComponent = json.results[0].formatted_address;
        AsyncStorage.setItem('address', addressComponent);
        AsyncStorage.setItem('latitude', location.latitude+'');
        AsyncStorage.setItem('longitude', location.longitude + '');
        await getNearestRestaurant(location.latitude, location.longitude);
        // await getCustomerOrderDetails();
    })
    }).catch(error => {
      showMessage({
        message: 'Location not available',
        type: "warning",
        icon : 'warning',
        duration : 2500
      });
      // setshowretryicon(true);
      // setnolocationtext(true);
    });
  }

  const getNearestRestaurant = (latitude, longitude) => {
    axios.post(Url.getnearestrestauranturl, 
    QueryString.stringify({
        latitude: latitude,
        longitude: longitude
    }),
    {
      headers: {"Content-Type": "application/x-www-form-urlencoded",}
    })
    .then(response => {
      AsyncStorage.setItem('nearest_restaurant', JSON.stringify(response.data));
      navigate();
    }).catch(error => {
      alert(error);
    })
  }

  navigate=()=>{
    console.log('Navigate');
    AsyncStorage.getItem('logged', (err, logged)=>{
      if(logged == null){
        setTimeout(() => {
          navigation.replace('LoginMethods');
        }, 4000);
      }else{
        setTimeout(() => {
          navigation.replace('HomeTabNavigator');
        }, 4000);
      }
    });
  }

  const getCustomerOrderDetails = () => {
    AsyncStorage.getItem('userid', (err, uid)=>{
      if(uid != null) {
        axios.post(Url.getcustomerordersdetailurl, 
        QueryString.stringify({
            customerid : uid
        }),
        {
          headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
          const l = response.data.order.length;
          if(l != 0){
            const data = response.data.order;
            const selectedorder = data[0];
            const orderid = selectedorder.id;
            navigation.replace('RateOrder', {orderid : orderid});
          }else{
            navigate();
          } 
        }).catch(error => {
            alert(error);
        })
      }
    })
  }

  return(
    <>
    <StatusBar hidden />
      <Video 
        source={SplashVideo}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
    {/* <View style={[styles.container]}>
      <Image source={Images.Logo} style={{height: ScreenHeight/3, resizeMode:"contain"}}/>
    </View> */}
    </>
  );
}
export default Splash;