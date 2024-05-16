import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import VerticleList from './VerticleList';
import { LoadingComponent } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Url, Languages } from '@common';
import SearchPage from './SearchPage';
import SearchBarContainer from './SearchContainer';

const RestaurantList = ({route}) => {
    const { dummydata } = route.params;
    const { type } = route.params;
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [loading, setloading] = useState(false);
    const [searchpage, setsearchpage] = useState(false);
    const [searchbartext, setsearchbartext] = useState('');
    
    const [cartprice, setcartprice] = useState([]);
    const [cartqty, setcartqty] = useState([]);
    const popupanimation = useRef(new Animated.Value(0)).current;
    const [popup, setpopup] = useState(false);

    useEffect(()=>{
        Getcartdata();
    }, [isFocused])

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

    const MainView = () => {
      return(
        <View style={[styles.container]}>
          <LoadingComponent visibility={loading}/>
          {/* <AddressBar/> */}
          
          <ScrollView>
            <VerticleList type={type} getLoadingstate={(state)=>setloading(state)} params={route.params} dummydata={dummydata}/>
          </ScrollView>
          {searchpage ? <SearchPage visibility={searchpage} type={type} params={route.params} closeSearchPage={()=>setsearchpage(false)}/> : null}
          <CartPopup/>
        </View>
      );
    }
    return(
      <>
      
      <SearchBarContainer nav={navigation} openSearchPage={()=>setsearchpage(true)} type={type} getText={(text)=>setsearchbartext(text)} value={searchbartext}/>
        {MainView()}
      </>
    );
}

export default RestaurantList;