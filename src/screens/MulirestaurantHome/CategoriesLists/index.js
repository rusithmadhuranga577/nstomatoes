/** @format */

import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import ListContainer from './ListContainer';
import { Languages } from '@common';

const CategoriesList =() => {

    const navigation = useNavigation();
    const [location, setlocation] =  useState([]);
    const [lat, setlat] =  useState([]);
    const [lan, setlan] =  useState([]);

    useEffect(()=>{
        AsyncStorage.multiGet(['latitude', 'longitude'], (err, data)=>{
            console.log('data', data);
            setlat(data[0][1]);
            setlan(data[1][1]);
        });
    },[])

    return(
        <View>
            <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
            <Text style={[styles.latestoffertext, {marginTop : 30}]}>{Languages.RestaurantsNearYou}</Text>
            <TouchableOpacity onPress={()=>navigation.push('RestaurantList', {type : 'restaurant', filter : 'nearest', lat : lat, lon : lan})} style={[styles.viewallbutton]}>
                <Text style={[styles.viewalltext]}>{Languages.ViewAll}</Text>
            </TouchableOpacity>
            </View>
            <ListContainer type={'restaurant'} location={JSON.stringify(location)} emptytext={Languages.NoRestaurants}/>

            <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
            <Text style={[styles.latestoffertext, {marginTop : 30}]}>{Languages.GroceriesNearYou}</Text>
            <TouchableOpacity onPress={()=>navigation.push('RestaurantList', {type : 'grocery', filter : 'nearest', lat : lat, lon : lan})} style={[styles.viewallbutton]}>
                <Text style={[styles.viewalltext]}>{Languages.ViewAll}</Text>
            </TouchableOpacity>
            </View>
            <ListContainer type={'restaurant'} location={JSON.stringify(location)} emptytext={Languages.NoGroceries}/>
        </View>
    );
}
export default CategoriesList;