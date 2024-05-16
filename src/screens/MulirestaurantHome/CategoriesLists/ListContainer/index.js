import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React , { useState, useEffect } from 'react';
import { Languages, Colors, Url } from '@common';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { showMessage } from "react-native-flash-message";
import { Clearcartpopup } from '@components';
import axios from 'axios';

const QueryString = require('query-string');

function ListContainer({type, emptytext}){

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [items, setItems] = useState(null);

    const [oldcartprice, setoldcartprice] = useState(0);
    const [oldcartdata, setoldcartdata] = useState([]);
    const [oldcartqty, setoldcartqty] = useState(0);

    const [clearcartpopup, setclearcartpopup] = useState(false);
    const [clickedrestaurantid, setclickedrestaurantid]=useState('');
    const [clickedrestaurantdata, setclickedrestaurantdata]=useState([]);
    const [cartrestaurantid, setcartrestaurantid] = useState(null);

    useEffect(() => {
        setLoading(true);
        AsyncStorage.multiGet(['latitude', 'longitude'], (err, location) => {
            console.log('LOCATION IS ------->   ',location)
            axios.post(Url.restaurantlisturl, 
            QueryString.stringify({
                filter : 'nearest',
                type : type,
                count : 5,
                lat : Number(location[0][1]),
                lon : Number(location[1][1]),
            }), 
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded",}
            }).then(response => {
                setItems(response.data.data.length)
                if(response.data.data.length == 0){
                    setItems('empty')
                    setLoading(false);
                }else{
                    setItems(response.data.data)
                    setLoading(false);
                }
            })
        })

        AsyncStorage.getItem('cartrestaurantid', (err, id)=>{
            if(id != null){
              setcartrestaurantid(id);
              AsyncStorage.getItem('cartitems', (err, cartitems)=>{
                const cartitemsdata = JSON.parse(cartitems);
                if(cartitemsdata != null){
                  setoldcartdata(cartitemsdata)
                }            
              });
              AsyncStorage.getItem('cartprice', (err, oldcartprice) => {
                setoldcartprice(oldcartprice);
              });
              AsyncStorage.getItem('cartqty', (err, oldcartqty) => {
                setoldcartqty(oldcartqty);
              });
            }else{
                setcartrestaurantid('no_cart_restaurant');
            }
        });
    }, []);

    const NavigateFunction=(item)=>{
        console.log(item.id)
        const res_id = item.id;
        const res_id_state = cartrestaurantid;
        if(res_id_state != 'no_cart_restaurant'){
            if(res_id != res_id_state){
                setclickedrestaurantid(res_id);
                setclickedrestaurantdata(item);
                OpenClearCartPopup();
            }else{
                if(type == 'grocery' || type == 'fashion'){
                    navigation.push('MenuListGrocery', {resid : item.id, restaurantdata : item});
                }else{
                    navigation.push('MenuList', {resid : item.id, restaurantdata : item});
                }
            }
        }else{
            if(type == 'grocery' || type == 'fashion'){
                navigation.push('MenuListGrocery', {resid : res_id, restaurantdata : item});
            }else{
                navigation.push('MenuList', {resid : res_id, restaurantdata : item});
            }
        }
    }

    const OpenClearCartPopup=()=>{
        setclearcartpopup(true);
    }
    
    const CloseClearCartPopup=()=>{
        setclearcartpopup(false);
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
            console.log('cart array',cartarray);
            ClearCartFunction();
          } else {
            const concactedObject = JSON.parse(oldsavedcartitems).concat(cartarray);
            AsyncStorage.setItem('savedcartitems', JSON.stringify(concactedObject));
            console.log(concactedObject);
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
        if(type == 'grocery' || type == 'fashion'){
            navigation.push('MenuListGrocery', {resid : clickedrestaurantid, restaurantdata : clickedrestaurantdata});
        }else{
            navigation.push('MenuList', {resid : clickedrestaurantid, restaurantdata : clickedrestaurantdata});
        }
    }
    
    const ShowShopCloasedAlert = (name) => {
        showMessage({
            message: `Sorry ${name} is closed now`,
            type: "warning",
            icon : 'warning',
            duration : 3000
        });
    }

    return(
        <View>
            {isLoading ? 
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  marginTop={15}
                  alignSelf={'center'}
                  width={'95%'}
                  height={150}
                  borderRadius={10}
                />
            </SkeletonPlaceholder>: 
            <View>
                {items == 'empty' ? <View style={[styles.emptycontainer]}><Text style={[styles.emptytext]} numberOfLines={2}>{emptytext}</Text></View>:
                <FlatList
                    horizontal
                    itemDimension={80}
                    data={items}
                    style={styles.gridView}
                    spacing={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=>item.open == 0 ? ShowShopCloasedAlert(item.name) : NavigateFunction(item)} style={[styles.itemcontainer]} >
                            <Image source={{uri : item.cover_banner}} style={[styles.image]}/>

                            <View style={{flexDirection : 'row', alignItems : 'center', width : '100%', justifyContent : 'space-between', marginTop : 10}}>
                                <Text style={[styles.name, {width : '70%'}]} numberOfLines={2}>{item.name}</Text>
                                {item.app_deliveryfee == null ? null : 
                                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                    <Icon name={'bicycle'} color={Colors.darkgray} size={16} style={{marginRight : 5}}/>
                                    <Text style={[styles.resdetailstext]}>{Languages.currency} {Number(item.app_deliveryfee).toFixed(2)}</Text>
                                </View>}
                            </View>
                            <Text style={[styles.address]} numberOfLines={2}>{item.address_line_1} {item.address_line_2}</Text>

                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                {item.def_rating == 5 || item.def_rating == 4 ? 
                                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                    <Text style={[styles.resdetailstext, {marginRight : 5}]}>{item.def_rating == 5 ? '😍' : null || item.def_rating == 4 ? '🥰' : null}</Text>
                                    <Text style={[styles.resdetailstext]}>{item.def_rating == 5 ? 'Amazing' : null || item.def_rating == 4 ? 'Verry Good' : null}    | </Text>
                                </View> : null}

                                <View style={{flexDirection : 'row', alignItems : 'center', marginLeft : 10, marginTop : 3}}>
                                    <Icon name={'time-outline'} color={Colors.darkgray} size={16} style={{marginRight : 5}}/>
                                    <Text style={[styles.resdetailstext]}>{item.delivery_time}</Text>
                                </View>
                            </View>
                            
                            <Text style={[styles.promo]} numberOfLines={2}>{item.promotxt}</Text>
                            <View style={[styles.openclosecontainer, {backgroundColor : item.open == 1 ? Colors.successgreen : null || item.open == 0 ? Colors.alertred : null || item.open == 2 ? Colors.alertyellow : null || item.open == 3 ? Colors.alertyellow : null}]}>
                                <Text style={[styles.openclosetext]} numberOfLines={2}>{item.open == 1 ? Languages.Open : null || item.open == 0 ? Languages.Close : null || item.open == 2 ? Languages.MerchantIsBusyNow : null || item.open == 3 ? Languages.SelfPickupDineInOnly : null}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />}
            </View>}
        {clearcartpopup ? 
        <Clearcartpopup Cancel={CloseClearCartPopup} StartNew={SaveCartFunction} visibility={clearcartpopup} Closepopup={CloseClearCartPopup}/>
        :null}
        </View>
    );
}

export default ListContainer;