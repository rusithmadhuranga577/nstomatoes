/** @format */

import React, { useEffect, useState, useRef  } from 'react';
import {
  ScrollView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Animated,
  LogBox,
  Linking,
  AppState
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { Languages, Colors, Url } from '@common';
import { LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import { showMessage } from "react-native-flash-message";
import axios from 'axios';

const QueryString = require('query-string');

const LocationSettings =({route}) => {
  const {logged} = route.params;
  const {cart} = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);

  const [loading, setloading] = useState(false);
  const [selfpickupalert, setselfpickupalert] = useState(false);
  const [deliveryarealist, setdeliveryarealist] = useState([]);
  const [recentLocations, setrecentLocations] = useState([]);
  const [permissiongranted, setpermissiongranted] = useState(true);

  const animatein = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setloading(true);
    initFunction();
    checkAppState();
    setloading(false);
  }, [isFocused])

  const checkAppState = () => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active"){
        initFunction();
      }

      appState.current = nextAppState;
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }

  const initFunction = () => {
    LogBox.ignoreAllLogs();
    fetch(Url.deliveryareaurl)
    .then((response) => response.json())
    .then((data) => {
      setdeliveryarealist(data.data);
      setloading(false);
    })
    AsyncStorage.getItem('recentlocations', (err, data)=>{
      setrecentLocations(JSON.parse(data));
    });
    checkLocationPermission();
  }

  const checkLocationPermission = () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
      console.log('Check ',result)
      if(result == 'blocked'){
        requestLocationPermission();
        setpermissiongranted(false);
      } else {
        setpermissiongranted(true);
        alertout();
      }
    });
  }

  const requestLocationPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
      console.log('request ',result)
      if(result == 'blocked'){
        setpermissiongranted(false);
        alertin();
      } else {
        setpermissiongranted(true);
        alertout();
      }
    });
  }

  const alertin = () => {
    Animated.timing(animatein, {
      useNativeDriver : false,
      toValue: 100,
      duration: 500
    }).start();
  };

  const alertout = () => {
    Animated.timing(animatein, {
      useNativeDriver : false,
      toValue: 0,
      duration: 500
    }).start();
  };

  const SelfpickupUser = () => {
    setselfpickupalert(false);
    if(logged == 0){
      navigation.replace('HomeTabNavigator');
    }else{
      navigation.goBack();
    }
  }

  const UpdateLocation = (item) => {
    setloading(true);
    const data = item;
    const addressArray = [{
      location: data.location,
      id: data.id,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude
    }]

    AsyncStorage.getItem('userid', (err, uId) => {
      console.log(addressArray)
      const id = uId;
      axios.put(Url.updateuseraddress+id,
        QueryString.stringify({
          location_type: data.location,
          def_address: data.address,
          def_lat: data.latitude,
          def_lon: data.longitude
        }),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        },
      ).then(response => {
          if (response.data.status == 1) { 
            AsyncStorage.setItem('address', data.address);
            AsyncStorage.setItem('latitude', data.latitude+'');
            AsyncStorage.setItem('longitude', data.longitude+'');
            showMessage({
              message: "Location updated !",
              type: "success",
              icon : 'success',
              duration : 2500
            });
            setloading(false);
            if(cart == 1){
              AsyncStorage.getItem('cart_merchant_type', (err, type) => {
                if(type != 'fashion'){
                    navigation.push('CartPage');
                }else{
                    navigation.push('FashionItemsCart');
                }
              });
            }else{
              navigation.goBack();
            }
        } else {
          alert('Location update failed please try again');
          setloading(false);
        }
      }).catch(err => {setloading(false),alert(err)})
    });
  }

  const ButtonView = ({icon, title, subtitle, page}) => {
      return(
        <TouchableOpacity  
          style={[styles.button, {height : page == 'SelectNowLocation' ? 70 : 70, opacity : page == 'SelectNowLocation' ? permissiongranted ? 1 : 0.5 : 1}]}
          onPress={()=> 
            page == 'SelectNowLocation' ? permissiongranted ? navigation.push('SelectNowLocation', {logged : logged, deliveryareadata : deliveryarealist}) : null : null 
            || page == 'LocationSearch' ? navigation.push('SearchForAddress', {logged : logged, deliveryareadata : deliveryarealist}) : null
            || page == 'selfpickupUser' ? setselfpickupalert(true) : null
          }
        >
          <View style={[styles.description]}>
            <Icon name={icon} size={20}/>
            <View style={{marginLeft : 15}}>
                <Text style={[styles.buttontitle]}>{title}</Text>
                <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{subtitle}</Text>
            </View>
          </View>
          <Icon name={'arrow-right'} size={18}/>
        </TouchableOpacity>
      );
  }

  return(
    <View style={[styles.container]}>
    <LoadingComponent visibility={loading}/>
    <ScrollView style={[styles.container, {padding : 10}]}>
      <Animated.View style={[styles.topalertcontainer, {height : animatein}]}>
        <View>
          <Text numberOfLines={3} style={[styles.alerttext]}>{Languages.CannotGetYourLocation}</Text>
        </View>
        <View style={[styles.alertbutton]}>
          <Icon name={'redo'} size={20} color={Colors.white} onPress={initFunction}/>
        </View>
        <View style={[styles.alertbutton, {right : 50}]}>
          <Icon name={'cog'} size={20} color={Colors.white} onPress={()=>Linking.openURL('app-settings:')}/>
        </View>
      </Animated.View>
      <View style={[styles.container]}>
          <Text style={[styles.sectiontitle]}>{Languages.DeliveryOption}</Text>
          <ButtonView icon={'location-arrow'} title={Languages.SelectMyLocationNow} subtitle={Languages.SelectMyLocationNowSubLine} page={'SelectNowLocation'}/>
          <ButtonView icon={'search'} title={Languages.SearchLocation} subtitle={Languages.SearchLocationSubLine} page={'LocationSearch'}/>
        <Text style={[styles.sectiontitle]}>{Languages.RecentLocations}</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          itemDimension={80}
          data={recentLocations}
          spacing={3}
          keyExtractor={(item)=>item.id}
          ItemSeparatorComponent={()=>(<View style={[styles.separator]}></View>)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>UpdateLocation(item)} style={[styles.recentlocationitemcontainer]}>
              <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <Icon name={'map-marker-alt'} size={20}/> 
                <View style={{width: '88%',}}>
                  <Text style={[styles.recentlocationtitle]} numberOfLines={1}>{item.address}</Text>
                  <Text style={[styles.recentlocationsubtitle]} numberOfLines={1}>{item.shortname}</Text>
                </View>
              </View>
              <Text style={[styles.selecttext]}>{Languages.Select}</Text>
            </TouchableOpacity>
          )}
        />

          <CustomAlert
            displayMode={'alert'}
            displayMsg={Languages.ContinueAsSelfPickup}
            displaymsgtitle={Languages.AreYouSure}
            visibility={selfpickupalert}
            dismissAlert={setselfpickupalert}
            cancellable={false}
            buttons={(
              <>
                <CustomAlertButton buttontitle={Languages.Continue} theme={'alert'} buttonaction={SelfpickupUser}/>
              </>
            )}
          />   

          <CustomAlert
            displayMode={'alert'}
            displayMsg={Languages.ContinueAsSelfPickup}
            displaymsgtitle={Languages.AreYouSure}
            visibility={selfpickupalert}
            dismissAlert={setselfpickupalert}
            cancellable={false}
            buttons={(
              <>
                <CustomAlertButton buttontitle={Languages.Continue} theme={'alert'} buttonaction={SelfpickupUser}/>
              </>
            )}
          />   
      </View>
    </ScrollView>
    </View>
  );
}
export default LocationSettings;