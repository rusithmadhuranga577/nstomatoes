import React, { useEffect, useState } from 'react';
import { View, Image , Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-banner-carousel-updated';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { Url, Colors } from '@common';
import { Clearcartpopup } from '@components';
import Geolocation from 'react-native-geolocation-service';

const BannerWidth = (Dimensions.get('window').width)-20;
const BannerHeight = 140;
const QueryString = require('query-string');

export default function OffersBanner({url}) {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [location, setlocation] =  useState([]);

  const [cartrestaurantid, setcartrestaurantid] = useState(null);
  const [clickedrestaurantid, setclickedrestaurantid]=useState('');
  const [clearcartpopup, setclearcartpopup] = useState(false);
  const [clickedrestaurantdata, setclickedrestaurantdata]=useState([]);
  const [oldcartdata, setoldcartdata] = useState([]);
  const [oldcartprice, setoldcartprice] = useState(0);
  const [oldcartqty, setoldcartqty] = useState(0);

  useEffect(() => {
      fetchData();
      GetLocationData();
      AsyncStorage.getItem('cartrestaurantid', (err, id)=>{
        if(id != null){
            setcartrestaurantid(id);
        }else{
            setcartrestaurantid('no_cart_restaurant');
        }
      });

      AsyncStorage.getItem('cartitems', (err, cartitems)=>{
          const cartitemsdata = JSON.parse(cartitems);
          if(cartitemsdata != null){
              setoldcartdata(cartitemsdata);
          }            
      });

      AsyncStorage.getItem('cartprice', (err, oldcartprice) => {
          setoldcartprice(oldcartprice);
      });
      AsyncStorage.getItem('cartqty', (err, oldcartqty) => {
          setoldcartqty(oldcartqty);
      });
  }, [isFocused])

  const GetLocationData = () => {
    Geolocation.getCurrentPosition(
        position => {
            setlocation(position);
            setLoading(false);
        },
        error => {
            // alert(error.message.toString());
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        },
    );
  }

  const fetchData=()=>{
    axios.post(url, 
    QueryString.stringify({
    }), 
    {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
    }).then(response => {
      setItems(response.data.offers)
      setLoading(false);
    })
  }

  var images = []
  if(items.length > 0){
    for( i=0; i < items.length; i++){
      images.push({'image' : items[i].image, 'res_id' : items[i].restaurant_id, 'type' : items[i].type});
    }
  }

  
  const renderPage = (item,index)=> {
    return (
      <TouchableOpacity onPress={()=>OnClickFunction(item.type, item.res_id)} style={{ width: BannerWidth, height: BannerHeight, borderRadius : 15 }}  key={index}>
          <Image style={{ height: BannerHeight, borderRadius : 15 }} source={{ uri: item.image }} />
      </TouchableOpacity>
    )
  }

  const OnClickFunction = (type, id) => {
    if(type == 'c-restaurant'){
        NavigateToRestaurantListFunction('restaurant');
    }else if(type == 'c-fashion'){
        NavigateToRestaurantListFunction('fashion');
    }else if(type == 'c-grocery'){
        NavigateToRestaurantListFunction('grocery');
    }else if(type == 'restaurant'){
        FetchRestaurantData(type, id);
    }else if(type == 'fashion'){
        FetchRestaurantData(type, id);
    }else if(type == 'grocery'){
        FetchRestaurantData(type, id);
    }
  }

  const NavigateToRestaurantListFunction = (type) => {
    if(type == 'restaurant'){
        navigation.push('RestaurantList', {type : type, filter : 'nearest', lat : location.coords.latitude, lon : location.coords.longitude, bannerurl : Url.foodsbannerurl});
    }else if(type == 'grocery'){
        navigation.push('RestaurantList', {type : type, filter : 'nearest', lat : location.coords.latitude, lon : location.coords.longitude, bannerurl : Url.grocerybannerurl});
    }else if(type == 'fashion'){
        navigation.push('RestaurantList', {type : type, filter : 'nearest', lat : location.coords.latitude, lon : location.coords.longitude, bannerurl : Url.fashionbannerurl});
    }
  }

  const NavigateFunction=(type, item)=>{
    const res_id = item.id;
    const res_id_state = cartrestaurantid;
    if(res_id_state != 'no_cart_restaurant'){
        if(res_id != res_id_state){
            setclickedrestaurantid(res_id);
            setclickedrestaurantdata(item);
            OpenClearCartPopup();
        }else{
          NavigateToRestaurantFunction(type, res_id, item);
        }
    }else{
      NavigateToRestaurantFunction(type, res_id, item);
    }
  }

  const NavigateToRestaurantFunction = (type, res_id, restaurantdata) => {
    if(type == 'fashion' || type == 'grocery'){
        navigation.push('MenuListGrocery', {resid : res_id, restaurantdata : restaurantdata});
    }else{
        navigation.push('MenuList', {resid : res_id, restaurantdata : restaurantdata});
    }
  }

  const OpenClearCartPopup=()=>{
      setclearcartpopup(true);
  }

  const CloseClearCartPopup=()=>{
      setclearcartpopup(false);
  }

  const SaveCartAndNavigate = () => {
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
    cartarray.push({'id' : randomid, 'cartprice' : oldcartprice, 'cartitems' : oldcartdata, 'saved' : created_time, 'cartqty' : oldcartqty});
    
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
      ClearCartAndNavigate();
  }

  const ClearCartAndNavigate=()=>{
      Navigation({resid : clickedrestaurantid, restaurantdata : clickedrestaurantdata});
  }

  const FetchRestaurantData = (type, id) => {
    axios.post(Url.getrestaurantdetailsurl, 
    QueryString.stringify({  
        restaurant_id : id
    }),
    {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
    })
    .then(response => {
        NavigateFunction(type, response.data);
    }).catch(error => {
    })
  }

  const Navigation = ({resid, restaurantdata}) => {
    const type = restaurantdata.restaurant_type;
    if(type == 'fashion' || type == 'grocery'){
        navigation.push('MenuListGrocery', {resid : resid, restaurantdata : restaurantdata});
    }else{
        navigation.push('MenuList', {resid : resid, restaurantdata : restaurantdata});
    }
  }

  return (
      <View style={{width : '95%', alignSelf : 'center', elevation : 5, backgroundColor : Colors.gray, borderRadius : 15}}>
        {isLoading ? 
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              alignSelf={'center'}
              width={BannerWidth}
              height={BannerHeight}
              borderRadius={15}
            />
          </SkeletonPlaceholder>
            : 
          <Carousel
            autoplay
            autoplayTimeout={6000}
            loop
            index={0}
            pageSize={BannerWidth}
            useNativeDriver={false}
          >
              {images.map((item, index) => renderPage(item, index))}
          </Carousel>
            }
          {clearcartpopup ? 
          <Clearcartpopup Cancel={CloseClearCartPopup} StartNew={SaveCartAndNavigate} visibility={clearcartpopup} Closepopup={CloseClearCartPopup}/>
          :null}
      </View>
    );

}
