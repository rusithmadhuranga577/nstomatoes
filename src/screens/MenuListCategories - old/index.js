/** @format */

import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  Image,
  Text,
  Animated,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colors, Url, Languages } from '@common';
import { LoadingComponent } from '@components';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import NavBar from './navbar';
import styles from './styles';
import HorizontalList from './HorizontalList';

const QueryString = require('query-string');

const MenuListCategoryOld =({route}) => {

  const { restaurantdata } = route.params;
  const { clickd_cat_data } = route.params;
  const popupanimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [allList, setallList] = useState([]);
  const [menulist, setmenulist] = useState([]);
  const [categorylist, setcategorylist] = useState([]);
  const [saleslist, setsaleslist] = useState([]);
  const [loading, setloading] = useState(false);
  const [cartprice, setcartprice] = useState([]);
  const [cartqty, setcartqty] = useState([]);
  const [popup, setpopup] = useState(false);

  useEffect(()=>{
    Getcartdata();
    FetchMenuList();
  }, [isFocused])

  const FetchMenuList=()=>{
    setloading(true);
    axios.post(Url.categorymenulisturl, 
    QueryString.stringify({
      restaurant_id : 0,
    }), 
    {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
    }).then(response => {
      setCategoryList(response.data[0].data);
      setsaleslist(response.data[1].data);
      setmenulist(response.data[2].data);
      setallList(response.data[2].data);
      initialfilterList(clickd_cat_data.id, response.data[2].data);
      setloading(false);
    })
  }

  const setCategoryList = (data) => {
    var array = [];
    array.push({'id' : 9998,'category_name' : 'ALL', 'subcategories' : []}, {'id' : 9999,'category_name' : 'PROMOTION ITEMS', 'subcategories' : []});
    for(i=0; i < data.length; i++){
      array.push({'id' : data[i].id ,'category_name' : data[i].category_name, 'subcategories' : data[i].subcategories})
      setcategorylist(array);
    }
  }

  const animatein = () => {
    Animated.timing(popupanimation, {
      toValue: 70,
      duration: 500
    }).start();
  };

  const animateout = () => {
    Animated.timing(popupanimation, {
      toValue: 0,
      duration: 600
    }).start();
  };

  const NavigateToCartPage = () => {
    AsyncStorage.getItem('cart_merchant_type', (err, type) => {
      if(type != 'fashion'){
          navigation.push('CartPage');
      }else{
          navigation.push('FashionItemsCart');
      }
    });
  }

  const Getcartdata = () => {
    AsyncStorage.multiGet(['cartprice', 'cartqty'], (err, cartdata) =>{
      if(cartdata[0][1] == null && cartdata[1][1] == null){
          animateout();
          setpopup(false);
      }else{
        setpopup(true);
        animatein();
        setcartprice(cartdata[0][1]);
        setcartqty(cartdata[1][1]);
      }
    });
  }

  const initialfilterList = (e, data) => {
    if(!(e == '9998' || e == '9999')){
      let text = e.toString()
      let restaurants = data;
      let filteredItems = restaurants.filter((item) => {
        var cat_name = item.food_category_id;
        return cat_name.toString().match(text)
      })
      if (!text || text === '') {
      console.log('State 1')
      setmenulist(data);
      } else if (Array.isArray(filteredItems)) {
        if(filteredItems.length == 0){
          setmenulist(filteredItems);
        }else{
          setmenulist(filteredItems);
        }
      }
    }else if(e == '9998'){
      setmenulist(data);
    }else if(e == '9999'){
      setmenulist(data);
    }
    
  }

  const filterList = (e) => {
    if(!(e == '9998' || e == '9999')){
      let text = e.toString()
      let restaurants = allList;
      let filteredItems = restaurants.filter((item) => {
        var cat_name = item.food_category_id;
        return cat_name.toString().match(text)
      })
      if (!text || text === '') {
      setmenulist(allList);
      } else if (Array.isArray(filteredItems)) {
        if(filteredItems.length == 0){
          setmenulist(filteredItems);
        }else{
          setmenulist(filteredItems);
        }
      }
    }else if(e == '9998'){
      setmenulist(allList);
    }else if(e == '9999'){
      setmenulist(saleslist);
    }
    
  }

  const nav = (item) => {
    console.log(item.foodtype)
    navigation.push('FoodItem' , {name: item.food_name, price: item.price, image: item.image_large, id: item.id , foodtypes : item.foodtype, secondline: item.second_line,  addons: item.addons.length == 0? null : item.addons[0].addonitems, restaurant_id : restaurantdata.id, restaurantdata : restaurantdata });
  }

  var i = 0;
  const RenderItem = (item) => {
    return(
      <>
        <TouchableOpacity onPress={()=>item.available == 0 ? null : nav(item)} style={[styles.itemcontainer, {opacity : item.available == 0 ? 0.4 : 1}]}>
          <View style={{width : '70%'}}>
              <Text numberOfLines={1} style={[styles.foodname]}>{item.food_name}</Text>
              {item.second_line == '' ? null : <Text numberOfLines={2} style={[styles.foodsecondline]}>{item.second_line}</Text>}
            <View>
              <Text style={[styles.price]}>{Languages.Rs}{Number(item.price).toFixed(2)}</Text>
            </View>
            {/* {item.popularitem == 0 ? null : <View style={[styles.populerbadge]}><Text style={[styles.populerbadgetext]}>Populer</Text></View>} */}
          </View>
                                        
          <View>
              {item.image_thumb == null ? null : <Image style={styles.image} source={{uri: item.image_thumb}} ></Image>}      
          </View>
        </TouchableOpacity>
        {item.available == 0 ?
        <View style={[styles.itemoverlay]}>
          <Text style={[styles.notavailabletext]}>{Languages.ItemNotAvailable}</Text>
        </View>
        :null}
      </>
    );
  }

  const CartPopup = () => {
    return(
      <>
          {popup ?
          <TouchableOpacity onPress={NavigateToCartPage}>
              <Animated.View style={[styles.cartpopupcontainer, {height : popupanimation}]}>
                <View style={{alignSelf : 'center', marginLeft : 25}}>
                  <Text onPress={NavigateToCartPage} style={[styles.cartpricetext]}>{Languages.Rs}{Number(cartprice).toFixed(2)}</Text>
                  <Text onPress={NavigateToCartPage} style={[styles.cartqtytext]}>{cartqty} {Languages.ItemsinCart}</Text>
                </View>
                <Icon onPress={NavigateToCartPage} name={'cart'} size={35} style={[styles.cartpopupicon]} color={Colors.white}/>
              </Animated.View>
          </TouchableOpacity>
          : null}
        </>
    );
  }

  const RestaurantDetails = () => {
    const item = restaurantdata;
    return(
      <View style={[styles.res_banner_overlay]}>
        <Text style={[styles.restaurantname]}>{item.name}</Text>
        <Text style={[styles.restaurantdescription]}>{item.company} - {item.city}</Text>
        <View style={{width : '100%', flexDirection : 'row', alignItems : 'center'}}>
          <Icon name={'star'} style={{paddingRight : 5}} size={12} color={Colors.alertyellow}/>
          <Text style={[styles.restaurandeliverytime]}>{item.def_rating} ({item.def_rating_count})</Text>
          <Text style={[styles.restaurandeliverytime]}>   | </Text>
          <Icon name={'bicycle-outline'} style={{paddingRight : 10, paddingLeft : 10}} size={18} color={Colors.black}/>
          <Text style={[styles.restaurandeliverytime]}>{Languages.Delivery} {Languages.Within} {item.fashion_delivery_time}</Text>
          <Text style={[styles.restaurandeliverytime]}>   |   </Text>
          <Icon name={'time-outline'} style={{paddingRight : 5}} size={12} color={Colors.black}/>
          <Text style={[styles.restaurandeliverytime]}>{Number(item.open_time).toFixed(2)} - {Number(item.close_time).toFixed(2)}</Text>
        </View>
        <View style={{width : '100%', flexDirection : 'row', alignItems : 'center'}}>
          
        </View>
      </View>
    );
  }

  const MainView = () => {
    return(
      <View style={{width : '100%', height : '100%', backgroundColor : '#fff'}}>
        <LoadingComponent visibility={loading}/>
        <ScrollView>
        <View style={{marginTop : 50}}/>
        <HorizontalList items={categorylist} filterCategory={(data)=>filterList(data.id)} type={'main'} initId={clickd_cat_data.id}/>
        <FlatList
          data={menulist}
          itemDimension={ restaurantdata.restaurant_type == 'grocery' ? 100 : 130}
          spacing={3}
          renderItem={({ item}) => RenderItem(item)}
        />
        </ScrollView>
      </View>
    );
  }

  return (
    <>
      {MainView()}
      <NavBar title={restaurantdata.name}/>
      <CartPopup/>
    </>
  );
}

export default MenuListCategoryOld;