import React, {useEffect, useState} from 'react';
import {
  LogBox,
  SafeAreaView,
  PermissionsAndroid,
  StatusBar,
  Appearance
} from 'react-native';
import Router from './src/router/Router';
import FlashMessage from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import RemotePushController from './src/notificationservice/remotePushController';

const App= () => {

  const colorScheme = Appearance.getColorScheme();

  useEffect(()=>{
    const fcmunsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    // networkInfoConfig();
    
    LogBox.ignoreAllLogs();
    return fcmunsubscribe;
  })

  const networkInfoConfig = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if(state.isConnected == false){
        alert('No network connection')
      }
    });
    if(Platform.OS === "ios"){
      Geolocation.requestAuthorization('whenInUse')
    }else{
      requestAndroidPermission();
    }
    return unsubscribe();
  }

  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'NS TOMATOES',
          'message': 'NS TOMATOES need access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? "light-content" : "dark-content"}
      />
      <Router/>
      <FlashMessage position="top" />
      <RemotePushController/>
    </SafeAreaView>
  );
}

export default App;