import React, { useEffect, useState } from 'react';
import { View, Platform, StyleSheet, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors, Store, Url, Languages} from '@common';
import {useNavigation, StackActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import SetLocationBottomCard from '../../../../components/LocationSettings/SetLocation/bottom_card';
import MapView, { Marker, Circle } from 'react-native-maps';
import { showMessage } from "react-native-flash-message";
import { ScrollView } from 'react-native-gesture-handler';

const QueryString = require('query-string');
const screenHeight = Dimensions.get('window').height;
const halfScreenHeight = screenHeight / 1.48;
const maps_api = Store.mapsapi;

const SetLocation = ({route}) => {
  const popAction = StackActions.pop(3);
  const navigation = useNavigation();

  const [deliveryarealist, setdeliveryarealist] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [mapcirclearray, setmapcirclearray] = useState([]);
  const [addressFetching, setaddressFetching] = useState(false);
  const initialCoordinate = {latitude: Store.merchantlat,longitude: Store.merchantlan};
  const [addressArray, setaddressArray] = useState({'street': '', 'city': ''});
  const [mapRegion, setMapRegion] = useState({
    ...initialCoordinate,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.001,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [snacbarshow, setsnacbarshow] = useState(false);
  
  const [userId, setId] = useState(0);
  const [address, setAddress] = useState("");
  const [houseno, setHouseno] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationtype, setLocationtype] = useState("indeliveryrang");

  useEffect(() => {
    AsyncStorage.getItem('userid', (err, id) => {
        setId(id);
      },
    );
    initFunctions();
  },[])

  initFunctions = async () => {
    setAddress(`${route.params.data.structured_formatting.main_text}, ${route.params.data.structured_formatting.secondary_text}`);
    setaddressArray({'street': route.params.data.structured_formatting.main_text, 'city': route.params.data.structured_formatting.secondary_text});
    await getDeliveryAreaList();
    setDeliveryRadiusCircles();
    await fetchLocationData(route.params.data.place_id);
  }

  fetchLocationData = (placeId) => {
    const place_id = placeId;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry&key=${maps_api}`
    axios
    .get(url)
    .then(({ data }) => {
      const responseData = data.result.geometry.location;
      const coords = {latitude: responseData.lat, longitude: responseData.lng, latitudeDelta: 0.0001, longitudeDelta: 0.001};
      setMapRegion(coords);
      setLatitude(responseData.lat);
      setLongitude(responseData.lng);
    });
  }

  getDeliveryAreaList = async () => {
    await fetch(Url.deliveryareaurl)
    .then((response) => response.json())
    .then((data) => {
      setdeliveryarealist(data.data);
    })
  }

  setDeliveryRadiusCircles = () => {
    var mapcirclearray = [];
    for(i=0; i < deliveryarealist.length; i++){
      mapcirclearray.push({'id' : deliveryarealist[i].id, 'latitude' : deliveryarealist[i].city_latitude, 'longitude' : deliveryarealist[i].city_longitude, 'radius' : deliveryarealist[i].delivery_range});
    }
    console.log(mapcirclearray)
    setmapcirclearray(mapcirclearray);
  }

  const handleRegionChange = async (newRegion) => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout( async () => {
      setMapRegion(newRegion);
      setLatitude(newRegion.latitude);
      setLongitude(newRegion.longitude);
      await getPlaceIdFromLatLng(newRegion.latitude, newRegion.longitude);
    }, 800);

    setTimeoutId(newTimeoutId);
  };

  const getPlaceIdFromLatLng = async (latitude, longitude) => {
    setaddressFetching(true);
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${maps_api}`;
    try {
        await axios
        .get(apiUrl)
        .then(({ data }) => {
            const addressComponents = data.results[0].address_components;
            let streetName = '';
            let cityName = '';

            console.log(data.results[0]);

            for (let component of addressComponents) {
              const types = component.types
              if(types.includes('point_of_interest')||types.includes('establishment')||types.includes('route') || types.includes('plus_code')||types.includes('sublocality')) {
                if(streetName == '') {
                  streetName = component.long_name;
                } else {
                  streetName = `${streetName}, ${component.long_name}`;
                }
              } else if(types.includes('locality')) {
                if(cityName == '') {
                  cityName = component.long_name;
                } else {
                  cityName = `${cityName}, ${component.long_name}`;
                }
              } else if(types.includes('administrative_area_level_2')) {
                if(cityName == '') {
                  cityName = component.long_name;
                } else {
                  cityName = `${cityName}, ${component.long_name}`;
                }
              }
            }
    
            const addressarray = {'street': streetName, 'city': cityName};
            setAddress(`${streetName}, ${cityName}`);
            setaddressArray(addressarray);
            setaddressFetching(false);
        });
    } catch (error) {
      console.error('Error fetching place ID:', error);
      setaddressFetching(false);
    }
  };

  var updateaddress = () => {
    let delivery_address = "";
    setaddressFetching(true);
    if(houseno != '') {
      delivery_address = `${houseno}, ${address}`;
    } else {
      delivery_address = address;
    }
    console.log(delivery_address);
    axios.put(
        Url.updateuseraddress+userId,
        QueryString.stringify({
          def_address: delivery_address,
          def_lat: latitude,
          def_lon: longitude,
          location_type: locationtype
        }),

        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        },
      )
      .then(async response => {
        console.log(response.data);
        if (response.data.status == 1) {
          AsyncStorage.setItem('address', delivery_address);
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
          setaddressFetching(false);
        }
      }).catch(err => 
        (setsnacbarshow(false),
        alert(err), 
        setaddressFetching(false)
      ))
  };

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
    }).catch(error => {
      alert(error);
    })
  }

  const NavigationFunction = () => {
    navigation.dispatch(popAction);
  };


  return (
    <View>
        <SetLocationBottomCard 
            addressline1={addressArray.street}
            addressline2={addressArray.city}
            fetching={addressFetching}
            onSubmit={(house_no)=>{updateaddress()}}
            onChangeHouseNo={(house_no)=>setHouseno(house_no)}
        />
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                region={mapRegion}
                onRegionChangeComplete={(region, detail) => {
                  console.log(detail.isGesture);
                  if(detail.isGesture) {
                    handleRegionChange(region);
                  }
                }}
                // onRegionChangeComplete={handleRegionChange}
                scrollEnabled={addressFetching ? false : true}
            >
                {mapcirclearray.length != 0 ? 
                <>
                    {mapcirclearray.map((data) => {
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
                    )
                    })}
                </>:null}
            </MapView>
            <View style={styles.iconContainer}>
                <Entypo
                    name={'location-pin'}
                    size={60}
                    color={Colors.black}
                />
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapContainer: {
    height: halfScreenHeight,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markertitlecontainer: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10, 
  },
  iconContainer: {
    position: 'absolute',
    top: '40%',
    left: '48%',
    marginLeft: -25,
    zIndex: 1,
  },
  regionInfo: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPosition: {
    position: 'absolute',
    top: (screenHeight/2)/2,
    left: 20,
    right: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regionText: {
    fontSize: 16,
  },
});

export default SetLocation;
