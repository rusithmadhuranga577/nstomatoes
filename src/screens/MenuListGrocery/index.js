/** @format */

import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  Image,
  Text,
  Animated,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Icons, Constants, Colors, Url, Languages } from '@common';
import { FlatGrid } from 'react-native-super-grid';
import { LoadingComponent } from '@components';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import NavBar from './navbar';
import styles from './styles';
import HorizontalList from './HorizontalList';
import MenuSearchPage from './MenuSearchPage';

const QueryString = require('query-string');
const screenwidth = Dimensions.get('window').width;

const MenuListGrocery =({route}) => {
  const { resid } = route.params;
  const { restaurantdata } = route.params;
  const res_type = restaurantdata.restaurant_type;
  const popupanimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [allList, setallList] = useState([]);
  const [menulist, setmenulist] = useState([]);
  const [categorylist, setcategorylist] = useState([]);
  const [saleslist, setsaleslist] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [searchpage, setsearchpage] = useState(false);
  var [titletext, settitletext] = useState('All Products');

  const [loading, setloading] = useState(false);
  const [cartprice, setcartprice] = useState([]);
  const [cartqty, setcartqty] = useState([]);

  useEffect(()=>{
    Getcartdata();
    FetchMenuList();
    setsearchpage(false);
    console.log('TYPE',restaurantdata)
  }, [isFocused])

  const FetchMenuList=()=>{
    setloading(true);
    axios.post(Url.fashionmenulisturl, 
    QueryString.stringify({
      restaurant_id : resid,
    }), 
    {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
    }).then(response => {
      setCategoryList(response.data[0].data);
      setsaleslist(response.data[1].data);
      setmenulist(response.data[2].data);
      setallList(response.data[2].data);
      setloading(false);
    })
  }

  const setCategoryList = (data) => {
    var array = [];
    array.push({'id' : 9998,'category_name' : 'All', 'subcategories' : [], 'image' : res_type == 'fashion' ? 'https://app.nstomatoes.lk/public/assets/icons/categoryicons/allfashionicon.png' : 'https://app.nstomatoes.lk/public/assets/icons/categoryicons/groceryicon.png'}, {'id' : 9999,'category_name' : 'Offers', 'subcategories' : [], 'image' : 'https://app.nstomatoes.lk/public/assets/icons/categoryicons/offericon.png'});
    for(i=0; i < data.length; i++){
      array.push({'id' : data[i].id ,'category_name' : data[i].category_name, 'subcategories' : data[i].subcategories, image : data[i].image})
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
      }else{
        animatein();
        setcartprice(cartdata[0][1]);
        setcartqty(cartdata[1][1]);
      }
    });
  }

  const getPercentage = (price, original_price) => {
    const price1 = price;
    const price2 = original_price;
    var percentage = 0;

    percentage = ((price2 - price1) / price2 *100).toFixed(0);

    if(price2 == null){
      return <></>;
    }else if (price1 < price2){
      return (
        <View style={[styles.populerbadge]}>
          <Text style={[styles.percentage]}>{percentage}% OFF</Text>
        </View>  
      );
    }else{
      return <></>;
    }
  }

  const getPercentage2 = (price, original_price) => {
    const price1 = price;
    const price2 = original_price;
    var percentage = 0;

    percentage = ((price2 - price1) / price2 *100).toFixed(0);

    if(price2 == null){
      return <></>;
    }else if (price1 < price2){
      return (
        <Text style={[styles.price, {textDecorationLine: 'line-through', color : 'red', fontSize : 12}]}>{Languages.Rs}{Number(price2).toFixed(2)}</Text>
      );
    }else{
      return <></>;
    }
  }

  const filterList = (e, subcategorieslist) => {
    console.log('subcategorieslist', subcategorieslist.length)
    let storsdata = menulist;
    if(!(e == '9999' || e == '9998')){
      settitletext('');
      setsubcategories(subcategorieslist);
      let text = e.toString()
      let restaurants = allList;
      let filteredName = restaurants.filter((item) => {
        var cat_id_1 = item.main_category_id;
        return cat_id_1.toString().match(text)
      })
      if (!text || text === '') {
      setmenulist(allList);
      } else if (Array.isArray(filteredName)) {
        if(filteredName.length == 0){
          setmenulist(filteredName);
        }else{
          setmenulist(filteredName);
        }
      }
    }else if(e == '9998'){
      titletext = 'All Products';
      settitletext('All Products');
      console.log('All')
      setmenulist(allList);
      setsubcategories([]);
    }else if(e == '9999'){
      settitletext('Special Promotion');
      console.log('Special Promotion');
      setmenulist(saleslist);
      setsubcategories([]);
    }
    
  }

  const filterList2 = (e) => {
    if(e != ''){
      let text = e.toString()
      let restaurants = allList;
      let filteredName = restaurants.filter((item) => {
        var cat_id_1 = item.food_category_id;
        return cat_id_1.toString().match(text)
      })
      if (!text || text === '') {
      setmenulist(allList);
      } else if (Array.isArray(filteredName)) {
        if(filteredName.length == 0){
          setmenulist(filteredName);
        }else{
          setmenulist(filteredName);
        }
      }
    }    
  }

  const nav = (item) => {
    if(res_type == 'fashion'){
      navigation.push('FashionItem' , {name: item.food_name, price: item.price, image: item.image_large, id: item.id , foodtypes : item.foodtype, secondline: item.second_line, description: item.second_line,  addons: item.addons.length == 0? null : item.addons[0].addonitems, restaurant_id : restaurantdata.id, restaurantdata : restaurantdata, original_price : item.original_price, gallery : item.galleryimages });
    }else{
      navigation.push('FoodItem' , {name: item.food_name, price: item.price, image: item.image_large, id: item.id , foodtypes : item.foodtype, secondline: item.second_line, description: item.description, addons: item.addons.length == 0? null : item.addons[0].addonitems, restaurant_id : restaurantdata.id, restaurantdata : restaurantdata, original_price : item.original_price });
    }
  }

  var i = 0;
  const RenderItem = (item) => {
    return(
      <>
        <View style={{margin : 5}}>
        <TouchableOpacity onPress={()=>item.available == 0 ? null : nav(item)} style={[styles.itemcontainer, {opacity : item.available == 0 ? 0.4 : 1, height : res_type == 'fashion' ? 240 : 200}]}>
          <View>
              {item.image_thumb == null ? null : <Image style={[styles.image, {height : res_type == 'fashion' ? 150 : 100}]} source={{uri: item.image_thumb}} ></Image>}    
              {getPercentage(item.price, item.original_price)}
          </View>
          <View style={{width : '100%', padding : 7}}>
              <Text numberOfLines={1} style={[styles.foodname]}>{item.food_name}</Text>
              {item.second_line == '' ? null : <Text numberOfLines={2} style={[styles.foodsecondline]}>{item.second_line}</Text>}
            <View>
              <View style={{width: '100%', flexDirection : res_type == 'fashion' ? 'row' : 'column', alignItems : res_type == 'fashion' ? 'center' : 'flex-start', justifyContent : 'space-between', marginTop : 5}}>
                <Text style={[styles.price, {fontFamily : Constants.fontFamilybold, fontSize : 16}]}>{Languages.Rs}{Number(item.price).toFixed(2)}</Text>
                {getPercentage2(item.price, item.original_price)}
              </View>
              {item.price < item.original_price ? 
              <View style={{flexDirection : 'row', alignItems : 'center'}}>
                
              </View>:null}
            </View>
          </View>
                                        
          
        </TouchableOpacity>
        {item.available == 0 ?
        <View style={[styles.itemoverlay]}>
          <Text style={[styles.notavailabletext]}>{Languages.ItemNotAvailable}</Text>
        </View>
        :null}
        </View>
      </>
    );
  }

  const CartPopup = () => {
    return(
      <TouchableOpacity onPress={NavigateToCartPage}>
          <Animated.View style={[styles.cartpopupcontainer, {height : popupanimation}]}>
            <View style={{alignSelf : 'center', marginLeft : 25}}>
              <Text onPress={NavigateToCartPage} style={[styles.cartpricetext]}>{Languages.Rs}{Number(cartprice).toFixed(2)}</Text>
              <Text onPress={NavigateToCartPage} style={[styles.cartqtytext]}>{cartqty} {Languages.ItemsinCart}</Text>
            </View>
            <Icon onPress={NavigateToCartPage} name={'cart'} size={35} style={[styles.cartpopupicon]} color={Colors.white}/>
          </Animated.View>
      </TouchableOpacity>
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
          <Text style={[styles.restaurantdescription, {color : 'red', marginTop : 10}]}>{item.promotxt}</Text>

        <TouchableOpacity onPress={()=>navigation.navigate('MerchantInfo', {title : item.name, data : item})}  style={[styles.merchantinfobutton]}>
          <Image source={Icons.shopicon} style={{width : 25, height : 25}}/>
          <Text style={[styles.restaurandeliverytime, {marginTop : 3, color : Colors.primary}]}>{Languages.Info}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  

  const MainView = () => {
    return(
      <View style={{width : '100%', height : '100%', backgroundColor : '#fff'}}>
      <LoadingComponent visibility={loading}/>
        <ScrollView>
          <Image source={{uri : restaurantdata.cover_banner}} style={{width: '98%', height : 200, alignSelf : 'center', resizeMode : 'cover'}}/>
          <RestaurantDetails/>
          <HorizontalList items={categorylist} filterCategory={(data, subcategorieslist)=>filterList(data, subcategorieslist)} type={'main'} res_type={res_type}/>
          <HorizontalList items={subcategories} filterCategory={(data)=>filterList2(data)} type={'sub'}/>
          {titletext != '' ?
          <Text style={[styles.allproducts]}>{titletext}</Text>
          :null}
          <FlatGrid
            data={menulist}
            itemDimension={res_type == 'fashion' ? screenwidth / 2 : screenwidth/3 }
            staticDimension={screenwidth}
            spacing={0}
            renderItem={({ item}) => RenderItem(item)}
          />
          <View style={{height : 100}}/>
        </ScrollView>
      </View>
      
    );
  }

  return (
    <>
      {MainView()}
      {searchpage ?  <MenuSearchPage visibility={searchpage} closeModel={()=>setsearchpage(false)} res_type={res_type} id={resid} navigation={navigation} restaurantdata={restaurantdata}/> : null}
      <NavBar onpress={()=>setsearchpage(true)} title={restaurantdata.name} navigation={navigation} />
      <CartPopup/>
    </>
  );
}

export default MenuListGrocery;