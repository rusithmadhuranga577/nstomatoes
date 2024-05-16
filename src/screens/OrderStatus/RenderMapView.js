import React, { useEffect, useState, useRef } from 'react';
import {View, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Icons} from '@common';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const RenderMapView = ({driverid}) => {

    const [dlat, setdlat] = useState(0);
    const [dlan, setdlan] = useState(0);
    const [heading, setheading] = useState(0);
    const mapRef = useRef(null);

    useEffect(()=>{
        getdriverlocation();
        console.log(driverid)
    })

    const getdriverlocation=()=>{
        const subscriber = firestore()
        .collection('drivers')
        .doc(driverid.toString())
        .onSnapshot(documentSnapshot => {
            if(documentSnapshot.data()){
                const data = documentSnapshot.data();
                setdlat(Number(data.latitude));
                setdlan(Number(data.longitude));
                setheading(Number(data.heading));
                setTimeout(() => {
                    animateMapCamera(data);
                }, 500);
            }else{
                console.log(' No Driver', documentSnapshot.data());
            }
        }); 
        return () => subscriber();
    }

    const animateMapCamera = (data) => {
        if(mapRef.current){
            mapRef.current.animateCamera({
                center: {
                    latitude: Number(data.latitude),
                    longitude: Number(data.longitude),
                },
                heading: 0,
                zoom : 15
            });
        }
    }

    return(
        <View style={{width : '100%', height : '65%', marginTop : 20}}>
            <MapView
                ref = {mapRef}
                initialRegion={{
                    latitude: dlat,
                    longitude: dlan,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                style={{width : '100%', height : '100%'}}
                provider={MapView.PROVIDER_GOOGLE}
            >
            <Marker coordinate={{ latitude: dlat, longitude: dlan }} title={'Your Driver'} >
                <View style={{width : 35, height : 40, alignItems : 'center', justifyContent : 'center', transform : [{ rotate: `${heading}deg` }]}}>
                    <Image
                        source={Icons.deliveryboymapmarker}
                        style={{width: '100%', height: '100%'}}
                    />
                </View>
            </Marker>
            </MapView>
            
        </View>
    );
}

export default RenderMapView;
