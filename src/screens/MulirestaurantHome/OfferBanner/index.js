import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text , Dimensions, LogBox, FlatList  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-banner-carousel-updated';
import { Url, Constants, Colors, Languages } from '@common';
import Image from 'react-native-image-auto-height';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function OffersBanner(data) {
    const navigation = useNavigation();
    const [restaurantdata, setrestaurantdata] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('nearest_restaurant', (err, restaurant)=>{
            const restaurandDataArray = JSON.parse(restaurant);
            setrestaurantdata(restaurandDataArray);
        });
    },[])

    const navigate = (data) => {
        console.log(data);
        if(data.type == 'webview') {
            navigation.navigate('WebviewPage', {url: data.url})
        } else if (data.type == 'menulist') {
            navigation.push('MenulistCategory', {resid : restaurantdata.id, restaurantdata : restaurantdata, cat_id : data.category_id});
        }
    }

    return <TouchableOpacity onPress={()=>navigate(data.data)} style={[styles.itemcontainer]} >
        <Image source={{uri : data.data.image}} style={styles.image}/>
    </TouchableOpacity>
}