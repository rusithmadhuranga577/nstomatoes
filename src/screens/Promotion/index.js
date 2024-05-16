/** @format */

import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import { Languages, Colors, Url } from '@common';
import { showMessage } from "react-native-flash-message";
import axios from 'axios';

const QueryString = require('query-string');

const Promotion = ({route}) => {

  const {type} = route.params;
  const navigation = useNavigation();
  const [appliedpromoid, setappliedpromoid] = useState('');
  const [loading, setloading] = useState(true);
  const [alreadyapplied, setalreadyapplied] = useState(false);
  const [clickedpromo, setclickedpromo] = useState([]);
  const [promolist, setpromolist] = useState([]);

  useEffect(() => {
    AsyncStorage.multiGet(['userid', 'cartrestaurantid'], (err, cartdata)=>{
      axios.post(Url.getcartoffersurl, 
        QueryString.stringify({  
          customer_id : cartdata[0][1],
          restaurant_id : cartdata[1][1]
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            setpromolist(response.data.offers);
            setloading(false);
        }).catch(error => {
            console.log(error);
            setloading(false);
      })
      AsyncStorage.getItem('appliedpromo', (err, promo) => {
        const appliedpromo = JSON.parse(promo);
        if(appliedpromo){
          setappliedpromoid(appliedpromo.id);
        }
      })
    });
  }, []);

  const RemovePromo = () => {
    AsyncStorage.removeItem('appliedpromo');
    setappliedpromoid('');
    showMessage({
      message: "Promotion successfully removed !",
      type: "warning",
      icon : 'warning',
      duration : 2500
    });
    if(type == 'fashion'){
        navigation.replace('FashionItemsCart');
    }else{
        navigation.replace('CartPage');
    }
  }

  const ApplyPromoCode = (selectedpromo) => {
    AsyncStorage.getItem('appliedpromo', (promo) => {
      if(!promo){
        setappliedpromoid(selectedpromo.id);
        const promoforapply = JSON.stringify(selectedpromo);
        AsyncStorage.setItem('appliedpromo', promoforapply);
        showMessage({
          message: "Promotion successfully added !",
          type: "success",
          icon : 'success',
          duration : 2500
        });
        if(type == 'fashion'){
            navigation.replace('FashionItemsCart');
        }else{
            navigation.replace('CartPage');
        }
      }else{
        setclickedpromo(selectedpromo);
        setalreadyapplied(true);
      }
    })
  }

  const RemoveAndApply = () => {
    AsyncStorage.removeItem('appliedpromo');
    setappliedpromoid('');
    console.log(clickedpromo);
    const promoforapply = JSON.stringify(clickedpromo);
    AsyncStorage.setItem('appliedpromo', promoforapply);
    setappliedpromoid(clickedpromo.id);
    setalreadyapplied(false);
    showMessage({
      message: "Promotion successfully added !",
      type: "success",
      icon : 'success',
      duration : 2500
    });
    if(type == 'fashion'){
        navigation.replace('FashionItemsCart');
    }else{
        navigation.replace('CartPage');
    }
  }

  const RenderItem = (item) => {
    return(
      <View style={{marginBottom : 22}}>
        <View style={[styles.card, {backgroundColor : appliedpromoid == item.id ? '#183051' : Colors.white}]}>
          <View style={[styles.titlerow]}>
            <Image source={{uri : item.image}} style={{width : 120, height : 120, borderRadius : 15}}></Image>
          </View>
          <View style={{width : '55%'}}>
            <Text style={[styles.description, {color : appliedpromoid == item.id ? Colors.white : Colors.black}]} numberOfLines={2}>{item.name}</Text>
            <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start', marginTop : 5}}>
              <Text style={[styles.validto]} numberOfLines={3}>{Languages.Validtill} {item.valid_to}</Text>
            </View>
            <View style={[styles.promocodeholder]}>
              <Text numberOfLines={2} style={[styles.promocode]}>{item.promo_code}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={()=> appliedpromoid == item.id ? RemovePromo() : ApplyPromoCode(item)} style={[styles.applybutton, {backgroundColor : appliedpromoid == item.id ? Colors.alertred : '#183051'}]}>
          <Text style={[styles.applytext]}>{appliedpromoid == item.id ? Languages.Remove : Languages.Apply}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return(
    <View style={[styles.container]}>
      <LoadingComponent visibility={loading}/>
      <FlatList
        fixed
        spacing={5}
        data={promolist}
        keyExtractor={item => item.id}
        renderItem={({ item }) => RenderItem(item)}
      />
      <CustomAlert
          displayMode={'alert'}
          displayMsg={Languages.YouHaveAlreadyApplied}
          displaymsgtitle={Languages.Alert}
          visibility={alreadyapplied}
          dismissAlert={setalreadyapplied}
          cancellable={true}
          buttons={(
            <>
              <CustomAlertButton buttontitle={Languages.Yes} theme={'alert'} buttonaction={RemoveAndApply}/>
              <CustomAlertButton buttontitle={Languages.No} theme={'inverse'} buttonaction={()=>setalreadyapplied(false)}/>
            </>
          )}
      />
    </View>
  );
}
export default Promotion;