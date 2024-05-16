import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
  ProgressBarAndroid,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Url, Store, Languages, Images } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import { showMessage } from "react-native-flash-message";
import styles from './styles';

Geocoder.init(Store.mapsapi);
const windowWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const QueryString = require('query-string');

const SelectNowLocation = ({route}) => {
  const {logged} = route.params;
  const {deliveryareadata} = route.params;
  const navigation = useNavigation();
  const _map = useRef(null);
  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);
  const [latitude_delta, setLat_delta] = useState(0.015);
  const [longitude_delta, setLong_delta] = useState(0.0121);
  const [userId, setId] = useState(0);

  const [coordinates, setCore] = useState([]);
  const [erroralert, seterroralert] = useState(false);
  const [apartmentnumber, setapartment] = useState('');
  const [street, setstreet] = useState('');
  const [placeId, setplaceId] = useState('');
  const [shortName, setShortName] = useState('');
  const [symbol, setsymbol] = useState('');
  const [available, setavailable] = useState(true);
  const [snacbarshow, setsnacbarshow] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [locations, setlocations] = useState([]);
  const [locationtype, setlocationtype] = useState('');
  const [loading, setloading] = useState(false);

  const [mapcirclearray, setmapcirclearray] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('userid', (err, id) => {
        setId(id);
      },
    );
    getoldaddress();
    getCUrruntLocation();
    console.log('Length',deliveryareadata)
    var mapcirclearray = [];
    for(i=0; i < deliveryareadata.length; i++){
      console.log(deliveryareadata[i].id)
      mapcirclearray.push({'id' : deliveryareadata[i].id, 'latitude' : deliveryareadata[i].city_latitude, 'longitude' : deliveryareadata[i].city_longitude, 'radius' : deliveryareadata[i].delivery_range});
    }
    setmapcirclearray(mapcirclearray);
  }, []);

  const getCUrruntLocation = () => {
    setfetching(true);
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setCore(
          coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        );

        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            setShortName(json.results[0].address_components[0].short_name);
            setplaceId(json.results[0].place_id);
            setstreet(addressComponent);
            setfetching(false);
          })
          .catch(error => console.warn(error));
      },
      error => {
        Alert.alert(error.message.toString());
        console.log(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };

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
      navigation.pop();
    }
  };


  const getoldaddress = () => {
    AsyncStorage.getItem('recentlocations', (err, locations) => {
      if (locations == null) {
      } else {
        const valuesArray = JSON.parse(locations);
        setlocations(valuesArray);
      }
    });
  };

  var updateaddress = (address) => {
    setloading(true);
    console.log(Url.updateuseraddress+userId);
    axios.put(
        Url.updateuseraddress+userId,
        QueryString.stringify({
          def_address: address,
          def_lat: latitude,
          def_lon: longitude,
          location_type: locationtype
        }),

        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        },
      )
      .then(async response => {
        setloading(false);
        console.log(response.data);
        if (response.data.status == 1) {
          AsyncStorage.setItem('address', apartmentnumber + `${symbol}` + street + '');
          AsyncStorage.setItem('latitude', latitude+'');
          AsyncStorage.setItem('longitude', longitude + '');
          setsnacbarshow(false);
          await getNearestRestaurant(latitude, longitude);
          showMessage({
            message: "Location updated !",
            type: "success",
            icon : 'success',
            duration : 2500
          });
          NavigationFunction();
        } else {
          setsnacbarshow(false);
          Alert.alert('Location update failed, please try again');
          setloading(false);
        }
      }).catch(err => 
        (setsnacbarshow(false),
        alert(err), setloading(false)))
  };

  const getNearestRestaurant = (latitude, longitude) => {
    console.log(`Coords ${latitude}, ${longitude}`);
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
    }).catch(error => {
      alert(error);
    })
  }

  const checklocationtypeandconfirm = () => {
    if(locationtype != 'outofdeliveryrange'){
      confirm();
    }else{
      confirmasselfpickup();
    }
  }

  const confirm = () => {
    setsnacbarshow(true);
    if (available == true) {
      let address = apartmentnumber + street;
      if (address == '') {
        seterroralert(true);
      } else {
        if (apartmentnumber == '') {
          setsymbol(',');
        }
        setsnacbarshow(false);
        createplace(address, 'indeliveryrange');
        updateaddress(apartmentnumber + `${symbol}` + street + '');
      }
    } else {
      null;
    }
  };

  const confirmasselfpickup = () => {
    setsnacbarshow(true);
    let address = apartmentnumber + street;
    const newdata = {
      id: placeId,
      name: 'selfpickup',
      address: address,
      latitude: latitude,
      longitude: longitude,
    };
    setsnacbarshow(true);
      if (address == '') {
        seterroralert(true);
      } else {
        if (apartmentnumber == '') {
          setsymbol(',');
        }
        setsnacbarshow(true);
        AsyncStorage.setItem('address', JSON.stringify(newdata));
        createplace(
          apartmentnumber + `${symbol}` + street + '',
          'outofdeliveryrange',
        );
        updateaddress(apartmentnumber + `${symbol}` + street + '');
      }
      setsnacbarshow(false);
  };

  const createplace = (address, location) => {
    const defaultaddress = [
      {
        location: location,
        id: placeId,
        address: address,
        latitude: latitude,
        longitude: longitude,
      },
    ];

    const newdata = [
      {
        location: location,
        id: placeId,
        address: address,
        latitude: latitude,
        longitude: longitude,
        shortname: shortName,
      },
    ];

    if (data.indexOf(placeId) !== -1) {
    } else {
      AsyncStorage.getItem('recentlocations', (err, result) => {
        if (result !== null) {
          var l = JSON.parse(result);
          var newlocation = l.concat(newdata);
          AsyncStorage.setItem('recentlocations', JSON.stringify(newlocation));
        } else {
          AsyncStorage.setItem('recentlocations', JSON.stringify(newdata));
        }
      });

      let a = JSON.stringify(defaultaddress);
      AsyncStorage.setItem('address', a);
    }
  };

  const data = [];
  for (i = 0; i < locations.length; i++) {
    data.push(locations[i].id);
  }

  const onRegionChange = (region) => {
    setloading(true);
    var latitudedata = 0;
    var longitudedata = 0;

    if(region.latitude.toFixed(6) === latitudedata.toFixed(6)
      && region.longitude.toFixed(6) === longitudedata.toFixed(6)){
        return;
    }

    setLat(region.latitude);
    setLong(region.longitude);
    setLat_delta(region.latitudeDelta);
    setLong_delta(region.longitudeDelta);

    Geocoder.from(
      region.latitude,
      region.longitude,
    )
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setShortName(json.results[0].address_components[0].short_name);
        setplaceId(json.results[0].place_id);
        setstreet(addressComponent);
        setloading(false);
      })
      .catch(error => console.warn(error));
  }

  return (
    <View>
      <LoadingComponent visibility={loading}/>
      <ScrollView style={{height: screenHeight-30}}>
        {snacbarshow ? <View style={styles.overlay} />: (null)}
        {fetching ? <View style={styles.overlay} />: (null)}
        <View
          style={[styles.topcard]}>
          {available ? 
            <View>
              <View style={{marginBottom: 5}}>
                <Text style={[styles.placeholdertitle]}>{Languages.ApartmentNumber}</Text>
                  <View style={[styles.inputcontainer]}>
                  <View style={[styles.iconholder]}>
                    <Icon name={'home'} size={20}/>
                  </View>
                  <TextInput 
                      value={apartmentnumber}
                      onChangeText={input => setapartment(input)}
                      style={[styles.input]}
                      placeholderTextColor={'rgba(0,0,0,0.4)'}
                />
              </View>
            </View>

            <View style={{marginBottom: 10}}>
                <Text style={[styles.placeholdertitle]}>{Languages.StreetCity}</Text>
                  <View style={[styles.inputcontainer]}>
                  <View style={[styles.iconholder]}>
                    <Icon name={'road'} size={20}/>
                  </View>
                  <TextInput 
                    editable={false}
                    value={street}
                    onChangeText={input => setstreet(input)}
                    style={[styles.input]}
                    placeholderTextColor={'rgba(0,0,0,0.4)'}
                  />
              </View>
            </View>
            <Button title={'Confirm'} action={checklocationtypeandconfirm}/> 
        </View>
          : (
            <TouchableOpacity
              onPress={confirmasselfpickup}
              activeOpacity={0.5}
              style={[styles.selfpickupcontainer]}>
              <Text style={[styles.titletext]}>
                {Languages.ServiceNotAvailableHere}
              </Text>
              <Text style={[styles.subtitletext]}>
                ({Languages.SelfPickupSubLine})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.container]}>
            <View style={[styles.centermarker]}>
              <Image
                  source={Images.UserLocationMarker}
                  style={{width: 40, height: 40}}
                />
            </View>

          <MapView
            showsMyLocationButton={true}
            provider={MapView.PROVIDER_GOOGLE}
            style={{height: screenHeight-50, zIndex: 1, bottom: 0}}
            ref={_map}
            // onRegionChangeComplete={(result) => onRegionChange(result)} 
            onRegionChangeComplete={(region, detail) => {
              console.log(detail.isGesture);
              if(detail.isGesture) {
                onRegionChange(region);
              }
            }}
            showsUserLocation={true}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: latitude_delta,
              longitudeDelta: longitude_delta,
            }}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: latitude_delta,
              longitudeDelta: longitude_delta,
            }}>
            {mapcirclearray.length != 0 ? 
            <>
            {mapcirclearray.map((data) => {
              console.log(data);
              return (
                <Circle 
                  center={{
                    latitude: Number(data.latitude),
                    longitude: Number(data.longitude),
                  }}
                  radius={Number(data.radius)}
                  strokeWidth={2}
                  strokeColor="rgba(0, 0, 0, 0.15)"
                  fillColor="rgba(0, 0, 0, 0.10)"
                />
                // <MapView.Circle
                //   center={{
                //     latitude: Number(data.latitude),
                //     longitude: Number(data.longitude),
                //   }}
                //   radius={Number(data.radius)}
                //   strokeWidth={2}
                //   strokeColor="rgba(0, 0, 0, 0.15)"
                //   fillColor="rgba(0, 0, 0, 0.10)"
                // />
              )
            })}
            </>:null}
          </MapView>
        </View>

        <CustomAlert
          displayMode={'error'}
          displayMsg={Languages.LocationUpdatedSuccessfully}
          displaymsgtitle={Languages.Success}
          visibility={erroralert}
          dismissAlert={seterroralert}
          cancellable={true}
          buttons={(
            <>
              <CustomAlertButton buttontitle={Languages.Continue} theme={'error'} buttonaction={()=>seterroralert(false)}/>
            </>
          )}
        />

        {fetching ?
          <View
            style={{
              width: windowWidth,
              height: 100,
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 20,
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 4,
            }}>
            <View style={{width: '100%', position: 'absolute', top: -5}}>
              <ProgressBarAndroid styleAttr="Horizontal" color={Colors.black} />
            </View>
            <View style={{position: 'absolute', bottom: 20, paddingLeft: 10}}>
              <Text style={[styles.fetchingbartitle]}>{Languages.PleaseWait}...</Text>
              <Text style={[styles.fetchingbarsubtitle, {marginTop: 5}]}>{Languages.FetchingYourLocation}</Text>
            </View>
          </View>
        : null}
      </ScrollView>
    </View>
  );
};

export default SelectNowLocation;
