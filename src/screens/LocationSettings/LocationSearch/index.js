import React, {useState, useEffect} from 'react';
import {View, Dimensions} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {LocationView, CustomAlert, CustomAlertButton } from '@components';
import {Colors, Store, Url, Languages} from '@common';
import { showMessage } from "react-native-flash-message";

const QueryString = require('query-string');
const screenHeight = Dimensions.get('window').height;

const SetLocation = ({route}) =>  {
  
  const {logged} = route.params;
  const {deliveryareadata} = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [locations, setlocations] = useState([]);
  const [place_id, setPlaceId] = useState('');

  const [currentlocation_lat, setCurrentLocation_lat] = useState(0);
  const [currentlocation_lan, setCurrentLocation_lan] = useState(0);

  const [successalert, setsuccessalert] = useState(false);

  const [mapcirclearray, setmapcirclearray] = useState([]);

  useEffect(() => {
    var mapcirclearray = [];
    for(i=0; i < deliveryareadata.length; i++){
      console.log(deliveryareadata[i].id)
      mapcirclearray.push({'id' : deliveryareadata[i].id, 'latitude' : deliveryareadata[i].city_latitude, 'longitude' : deliveryareadata[i].city_longitude, 'radius' : deliveryareadata[i].delivery_range});
    }
    setmapcirclearray(mapcirclearray);
    console.log(mapcirclearray)

    AsyncStorage.getItem('recentlocations', (err, locations) => {
      if (locations == null) {
      } else {
        const valuesArray = JSON.parse(locations);
        setlocations(valuesArray);
      }
    });
  }, [isFocused])

  const NavigationFunction = () => {
    if(logged == 0){
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeTabNavigator'
          },
        ],
      })
      AsyncStorage.setItem('logged', 1 + '');
    }else{
      navigation.goBack();
    }
  };

  const checkAvailable = LocationData => {
    const address = LocationData.address;
    const shortname = LocationData.short_name;
    const placeId = LocationData.placeId;
    const lat = LocationData.latitude;
    const lan = LocationData.longitude;
    setPlaceId(placeId);
    deliveryUser(address, shortname, placeId, lat, lan);
  }
  
  const deliveryUser = (address, shortname, placeId, lat, lan) => {
    const addressArray = [{
      location: "indeliveryrange",
      id: placeId,
      address: address,
      latitude: lat,
      longitude: lan
    }]

    const newaddressArray = [{
      location: "indeliveryrange",
      id: placeId,
      address: address,
      latitude: lat,
      longitude: lan,
      shortname: shortname
    }]

    AsyncStorage.getItem('userid', (err, uId) => {
      const id = uId;
      axios
      .put(
        Url.updateuseraddress+id,
        QueryString.stringify({
          def_address: address,
          def_lat: lat,
          def_lon: lan,
          location_type: "indeliveryrange"
        }),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        },
      ).then(response => {
          if (response.data.status == 1) {
            if (data.indexOf(place_id) !== -1) {
            } else {
              AsyncStorage.getItem('recentlocations', (err, result) => {
                if (result !== null) {
                  var l = JSON.parse(result);
                  var newlocation = l.concat(newaddressArray);
                  AsyncStorage.setItem('recentlocations', JSON.stringify(newlocation));
                } else {
                  AsyncStorage.setItem('recentlocations', JSON.stringify(newaddressArray));
                }
              });
            }
            let a = JSON.stringify(addressArray);
            console.log(lat, lan);
            AsyncStorage.setItem('address', address);
            AsyncStorage.setItem('latitude', lat+'');
            AsyncStorage.setItem('longitude', lan + '');
            showMessage({
              message: "Location updated !",
              type: "success",
              icon : 'success',
              duration : 2500
            });
            NavigationFunction();
        } else {
          alert('Location update failed please try again', response.data.status);
        }
      }).catch(err => 
        alert(err))
    });
  }

  const data = [];
  for (i = 0; i < locations.length; i++) {
  }

    return(
      <View style={{flex: 1, height: screenHeight-50,}}>
        <LocationView
          apiKey={Store.mapsapi}
          initialLocation={{
            latitude: Number(Store.merchantlat),
            longitude: Number(Store.merchantlan),
          }}
          actionText = {'Confirm'}
          actionButtonStyle= {{width: '95%', height: 50, backgroundColor: Colors.primary, alignSelf: 'center'}}
          onLocationSelect={location=> (checkAvailable(location))}
          mapcirclearray={mapcirclearray}
        />

        <CustomAlert
          displayMode={'success'}
          displayMsg={Languages.LocationUpdatedSuccessfully}
          displaymsgtitle={Languages.Success}
          visibility={successalert}
          dismissAlert={setsuccessalert}
          cancellable={true}
          buttons={(
            <>
              <CustomAlertButton buttontitle={Languages.Continue} theme={'success'} buttonaction={NavigationFunction}/>
            </>
          )}
        />   
      </View>
    );
  }

  export default SetLocation;