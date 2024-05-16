/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import {
  Platform,
  ScrollView,
  BackHandler,
  Text,
  Animated,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AddressBar from './addressbar';
import NameBar from './namebar';
import CategoriesList from './CategoriesLists/index';
import Categories from "./Categories";
import GuestUserContainer from './GuestUserContainer';
import LocationPermissionContainer from './LocationPermissionContainer';
import { Languages, Url, Colors } from '@common';
import { CustomAlert, CustomAlertButton } from '@components';
import { useIsFocused } from '@react-navigation/native';
import { Banner } from '@components';
import FloatinCartButton from './FloatingCartButton';
import OffersBanner from './OffersBanner';
import UpdateAppButton from './update_app_button';
import HomeMenuListHorizontal from './HomeOffersMenuListHorizontal';
import OfferBanner from './OfferBanner';
import axios from 'axios';

import * as versionData from '../../common/app_version.json';
import HomeTopBar from './HomeTopBar';

const QueryString = require('query-string');

const Home =() => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const addressbarheight = useRef(new Animated.Value(0)).current;
  const ongoingcontaineropacity = useRef(new Animated.Value(0.5)).current;
  const [exitalert, setexitalert] = useState(false);
  const [showongoingcontainer, setshowongoingcontainer] = useState(false);
  const [appsettings, setappsettings] = useState([]);
  const [coreconfigs, setcoreconfigs] = useState([]);
  const [homecomponents, sethomecomponents] = useState([]);
  const [showupdateappbutton, setshowupdateappbutton] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const backAction = () => {
      if (navigation.isFocused()) {
        setexitalert(true)
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    AsyncStorage.getItem('userid', (err, userid) => {
      const uid = Number(userid);
      axios.post(Url.getuserongoingordersurl, 
      QueryString.stringify({
          customerid : userid
      }),
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
      })
      .then(response => {
        console.log('Ongoing orders', response.data)
        const data = response.data.order;
        console.log(data.length)
        if(data.length > 0){
          setshowongoingcontainer(true);
          OngoingOrderContainerAnimation();
        }else{
          setshowongoingcontainer(false);
          Animated.timing(ongoingcontaineropacity, {
            toValue: 0, 
            duration: 2000,
          });
        }
      }).catch(error => {
          console.log(error);
      })
    });
    getAppSettings();
    return () => backHandler.remove();
  }, [])

  getAppSettings = () => {
    fetch(Url.getappsettings)
    .then((response) => response.json())
    .then((data) => {setappsettings(data[0]), checkUpdates()})
    .catch((error) => console.error(error))

    fetch(Url.homeconfigurl)
    .then((response) => response.json())
    .then((data) => {
      setcoreconfigs(data.data.home_components);
      console.log('home_components 1');

      var componentsList = [];
      data.data.home_components.map((data, index) => {
        console.log('home_components 2');
        if(data.type == 'categorycarousel') {
          componentsList.push(<Categories data={data.data}/>);
        } else if(data.type == 'slider') {
          componentsList.push(<Banner url={Url.bannerurl} data={data.data}/>);
        } else if(data.type == 'offerbanner') {
          componentsList.push(<OfferBanner data={data.data}/>);
        } else if(data.type == 'homemenulisthorizontal') {
          componentsList.push(<HomeMenuListHorizontal title={`Today’s Special`} data={data.data}/>);
        }
      })
      sethomecomponents(componentsList);
      setloading(false);
    })
    .catch((error) => console.error(error))
  }

  checkUpdates = () => {
    let platform = '';
    let platform_app_version = '';
    let platform_app_latest_version = '';
    
    if(Platform.OS === 'ios') {
      platform = 'ios';
      platform_app_version = Number(versionData.ios_app_version);
      platform_app_latest_version = Number(appsettings.ios_app_latest_version);
    } else {
      platform = 'android';
      platform_app_version = Number(versionData.android_app_version);
      platform_app_latest_version = Number(appsettings.android_app_latest_version);
    }

    if(platform_app_version < platform_app_latest_version) {
      setshowupdateappbutton(true);
    }
  }

  const OngoingOrderContainerAnimation = () => {
    Animated.loop(
        Animated.sequence([
          Animated.timing(ongoingcontaineropacity, {
              toValue: 1, 
              duration: 200,
              useNativeDriver: true
          }),
          Animated.timing(ongoingcontaineropacity, {
            toValue: 1, 
            duration: 2500,
            useNativeDriver: true
          }),
          Animated.timing(ongoingcontaineropacity, {
            toValue: 0, 
            duration: 1000,
            useNativeDriver: true
          }),
        ]),
    ).start();
  }

  const OngoingOrderContainer = () => {
    return(
      <Animated.View style={[styles.ongoingordercontainer, {opacity : ongoingcontaineropacity}]}>
      <TouchableOpacity onPress={()=>navigation.push('OrdersPage')}>
        <Text style={[styles.ongoingordertext]}>{Languages.YouHaveOngoing}</Text>
      </TouchableOpacity>
      </Animated.View>
    );
  }

  const AnimeateIn = () => {Animated.timing(addressbarheight,{toValue: -60,duration: 150, useNativeDriver: true}).start()}
  const Animeateout = () => {Animated.timing(addressbarheight,{toValue: 0,duration: 150, useNativeDriver: true}).start()}

  const onScroll = (e) => {
    const position = e.nativeEvent.contentOffset.y;
    if(position < 100){
      Animeateout();
    }else if(position > 60){
      AnimeateIn();
    }
  }

  return(
    <View style={[styles.container]}>
      {/* <Animated.View style={{width : '100%', height : 60, transform : [{translateY : addressbarheight}], position : 'absolute', zIndex : 99}}>
        <AddressBar/>
      </Animated.View> */}
      <HomeTopBar/>
      <ScrollView
       onScroll={(e)=>onScroll(e)}
       showsVerticalScrollIndicator={false}
      >
        {/* {
          coreconfigs.map((data, index) => {
            console.log(data.type);
            if(data.type == 'slider') {
              <Banner url={Url.bannerurl} data={coreconfigs.length != 0 ? coreconfigs[0].data : []}/>
            }
          })
        } */}
        {/* <LocationPermissionContainer/> */}
        {/* <GuestUserContainer/> */}
        <AddressBar appsettings={appsettings}/>
        {/* <NameBar appsettings={appsettings}/> */}
        {loading? <></> : homecomponents}
        {/* {showupdateappbutton ? <UpdateAppButton appsettings={appsettings}/> : <></>} */}
        {/* <Banner url={Url.bannerurl} data={coreconfigs.length != 0 ? coreconfigs[0].data : []}/> */}
        {/* <Categories/> */}
        {/* <CategoriesList/> */}
        {/* <HomeMenuListHorizontal title={`Today’s Special`} cat_id={'75'}/> */}
        {/* <OfferBanner url={'http://app.foodsmint.com/public/uploads/resturant/banner1.png'}/> */}
        {/* <HomeMenuListHorizontal title={`Top rated`} cat_id={'68'}/> */}
        <View style={{paddingBottom : 100, backgroundColor: Colors.white}}/>
      </ScrollView>

      <FloatinCartButton/>

      {/*Exit Alert*/}
      <CustomAlert
        displayMode={'alert'}
        displayMsg={Languages.YouWantToExitApp}
        displaymsgtitle={Languages.AreYouSure}
        visibility={exitalert}
        dismissAlert={setexitalert}
        cancellable={true}
        buttons={(
          <>
            <CustomAlertButton buttontitle={Languages.Yes} theme={'alert'} buttonaction={()=>BackHandler.exitApp()}/>
            <CustomAlertButton buttontitle={Languages.No} theme={'inverse'} buttonaction={()=>setexitalert(false)}/>
          </>
        )}
      />
      {showongoingcontainer ?
      <OngoingOrderContainer/>:null}
    </View>
  );
}
export default Home;