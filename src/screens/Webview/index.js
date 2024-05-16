/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { LoadingComponent } from '@components';
import { WebView } from 'react-native-webview';
import { useIsFocused } from '@react-navigation/native';

const WebviewPage =({route}) => {

  const {url} = route.params;
  const webviewRef = useRef(null);
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",backAction, backButtonHandler);
    return () =>{
      BackHandler.removeEventListener("hardwareBackPress",backAction, backButtonHandler);
    }
  });

  const backAction = () => {
    backButtonHandler();
    return true;
  };

  const backButtonHandler = () => {
    if(canGoBack){
      console.log(canGoBack);
      webviewRef.current.goBack()
    }else{
      console.log(canGoBack);
      navigation.goBack();
    }
  }

  return(
    <View style={[styles.container]}>
      <LoadingComponent visibility={loading}/>
      <WebView 
        source={{ uri: url }} 
        ref={webviewRef}
        onLoadStart={() => {setloading(true);}}
        onLoadEnd={() => {setloading(false);}}
        onNavigationStateChange={(navState) => {
          console.log(navState.canGoBack);
          setCanGoBack(navState.canGoBack);
        }}
      />
    </View>
  );
}
export default WebviewPage;