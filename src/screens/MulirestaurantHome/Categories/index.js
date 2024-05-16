/** @format */

import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { Clearcartpopup } from '@components';
import axios from 'axios';
import { Url } from '@common';

const QueryString = require('query-string');

const Categories =({data}) => {

    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(true);
    const [restaurant, setrestaurant] = useState(null);
    const [categories, setcategories] = useState([]);

    const [oldcartprice, setoldcartprice] = useState(0);
    const [oldcartdata, setoldcartdata] = useState([]);
    const [oldcartqty, setoldcartqty] = useState(0);

    const [clearcartpopup, setclearcartpopup] = useState(false);
    const [clickedrestaurantid, setclickedrestaurantid]=useState('');
    const [clickedrestaurantdata, setclickedrestaurantdata]=useState([]);
    const [cartrestaurantid, setcartrestaurantid] = useState(null);
    const [clickedcatdata, setclickedcatdata] = useState([]);
    const [nearestRestaurantId, setnearestRestaurantId] = useState('0');

    useEffect(() => {
        setLoading(true);
        fetch(Url.categoriesurl)
        .then((response) => response.json())
        .then((data) => setcategories(data))
        .catch((error) => console.error(error))
        console.log(data);
        // setcategories(data);

        AsyncStorage.getItem('nearest_restaurant', (err, restaurant)=>{
            const restaurandDataArray = JSON.parse(restaurant);
            setnearestRestaurantId(restaurandDataArray.id);
            getRestaurantDetails(restaurandDataArray.id);
        });
        setLoading(false);

        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : nearestRestaurantId,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            const res_data = response.data;
            setrestaurant(res_data);
            setclickedrestaurantid(res_data.id);
            setclickedrestaurantdata(res_data);
            console.log(res_data)
        });
        
        setLoading(false);
    }, []);

    getRestaurantDetails = (id) => {
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : id,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            setrestaurant(response.data)
        })
    }

    const OpenClearCartPopup=()=>{
        setclearcartpopup(true);
    }
    
    const CloseClearCartPopup=()=>{
        setclearcartpopup(false);
    }

    const NavigateFunction=(data)=>{
        const item = restaurant;
        const res_id = item.id;
        const res_id_state = cartrestaurantid;
        navigation.push('MenulistCategory', {resid : nearestRestaurantId, restaurantdata : restaurant, clickd_cat_data : data, cat_id : data.id});

        if(res_id_state != 'no_cart_restaurant'){
            // navigation.push('MenulistCategory', {resid : nearestRestaurantId, restaurantdata : restaurant, clickd_cat_data : data, cat_id : data.id});
            if(res_id != res_id_state){
                // setclickedcatdata();
                // OpenClearCartPopup();
            }else{
                // navigation.push('MenulistCategory', {resid : nearestRestaurantId, restaurantdata : restaurant, clickd_cat_data : data, cat_id : data.id});
            }
        }else{
            // navigation.push('MenulistCategory', {resid : nearestRestaurantId, restaurantdata : restaurant, clickd_cat_data : data, cat_id : data.id});
        }
    }

    const SaveCartFunction=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();

        var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
        var randomid = hours+min+sec+RandomNumber;
        var created_time = `${year}-${month}-${date} ${hours}:${min}`;

        var cartarray = [];
        cartarray.push({'id' : randomid,'cartprice' : oldcartprice, 'cartitems' : oldcartdata, 'saved' : created_time, 'cartqty' : oldcartqty});
        
        AsyncStorage.getItem('savedcartitems', (err, oldsavedcartitems) => {
        if (oldsavedcartitems == null) {
            AsyncStorage.setItem('savedcartitems', JSON.stringify(cartarray));
            ClearCartFunction();
        } else {
            const concactedObject = JSON.parse(oldsavedcartitems).concat(cartarray);
            AsyncStorage.setItem('savedcartitems', JSON.stringify(concactedObject));
            ClearCartFunction();
        }
        })
    }

    const ClearCartFunction=()=>{
        AsyncStorage.removeItem('cartitems');
        AsyncStorage.removeItem('cartprice');
        AsyncStorage.removeItem('cartqty');
        AsyncStorage.removeItem('cartrestaurantid');
        AsyncStorage.removeItem('appliedpromo');
        CloseClearCartPopup();
        setcartrestaurantid('no_cart_restaurant');
        ClearCartAndNavigate();
    }

    const ClearCartAndNavigate=()=>{
        // clickedcatdata.id = 0;
        // if(clickedcatdata.id == undefined){
        //     clickedcatdata.id = 1;
        // }
        navigation.push('MenulistCategory', {resid : nearestRestaurantId, restaurantdata : clickedrestaurantdata, clickd_cat_data : clickedcatdata, cat_id : clickedcatdata.id});
    }

    const RenderItem = (item) => {
        return(
            <TouchableOpacity onPress={()=>NavigateFunction(item)} style={[styles.itemcontainer]}>
                <Image style={[styles.image]} source={{uri : item.image}}/>
                <Text style={[styles.itemtitlestyle, {textAlign : 'center'}]} numberOfLines={2}>{item.category_name}</Text>
            </TouchableOpacity>
        );
    }

  return(
    <View style={[styles.container]}>
        {isLoading ? null : 
        <View style={{width: '100%', justifyContent : 'center'}}>
        <FlatList
            horizontal={true}
            data={categories}
            style={styles.gridView}
            renderItem={({ item}) => RenderItem(item)}
        />
        </View>}
        {clearcartpopup ? 
            <Clearcartpopup Cancel={CloseClearCartPopup} StartNew={SaveCartFunction} visibility={clearcartpopup} Closepopup={CloseClearCartPopup}/>
        :null}
    </View>
  );
}
export default Categories;