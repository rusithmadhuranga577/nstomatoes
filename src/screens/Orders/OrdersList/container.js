import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Languages, Colors } from '@common';

const Container = ({data}) => {

    const navigation = useNavigation();


    const RenderSubtextContainer = ({title, value}) => {
        return(
            <View style={[styles.subtextholder]}>
                <Text style={[styles.subtext, {width : '35%'}]} numberOfLines={1}>{title}</Text>
                <Text style={[styles.subtext]}>:</Text>
                <Text style={[styles.subtext, {width : '55%'}]} numberOfLines={1}>{value}</Text>
            </View>
        );
    }

    const NavigateFunction = (id, status, merchant_type, ordertype) => {
        if(merchant_type == 'fashion'){
            navigation.navigate('OrderViewFashion', {title : `#${id} Order`, orderid : id, status : status})
        }else{
            if(status < 6){
                navigation.navigate('OrderStatus', {title : `#${id} Order`, orderid : id});
            }else if(status == 6 || status == 9){
                navigation.navigate('OrderView', {title : `#${id} Order`, orderid : id})
            }
        }
    }

    return(
        <View style={[styles.containerview]}>
            <View style={{width : '100%', marginTop : 10, marginLeft : 10}}>
                <Text style={[styles.restaurantname]} numberOfLines={1}>{data._data.restuarant_name}</Text>
            </View>
            <View style={{flexDirection : 'row', marginLeft : 10, marginRight : 10}}>
                <View style={{width : '25%'}}>
                    <View style={[styles.imageholder]}>
                        <Image source={{uri : data._data.restaurant_logo}} style={{width : '100%', height : '100%', borderRadius : 10}}/>
                    </View>
                </View>
                <View style={{width : '75%'}}>
                    <RenderSubtextContainer title={Languages.OrderId} value={`#${data._data.order_id}`}/>
                    <RenderSubtextContainer title={Languages.OrderDate} value={data._data.createdtime}/>
                    <RenderSubtextContainer title={Languages.DeliveryAddress} value={data._data.delivery_address}/>
                    <RenderSubtextContainer title={Languages.DeliveryName} value={data._data.customer_name}/>
                    <RenderSubtextContainer 
                        title={Languages.OrderStatus} 
                        value={
                            data._data.status == 0 ? Languages.Pending : ''||
                            data._data.status == 1 ? Languages.Confirmed : ''||
                            data._data.status == 2 ? Languages.Preparing : ''||
                            data._data.status == 3 ? Languages.Prepared : ''||
                            data._data.status == 4 ? Languages.DriverPicked : ''||
                            data._data.status == 6 ? Languages.Delivered : '' ||
                            data._data.status == 9 ? Languages.Canceled : ''
                        }
                    />
                </View>
            </View>
            <Text style={[styles.pricetext]} numberOfLines={1}>{Languages.Rs}{Number(data._data.order_amount).toFixed(2)}</Text>
            <TouchableOpacity 
            onPress={()=>NavigateFunction(data._data.order_id, data._data.status, data._data.merchant_type, data.ordertype)} 
            style={[styles.orderstatuscontainer, {
                backgroundColor : 
                data._data.status == 6 ? Colors.successgreen : 
                data._data.status == 9 ? Colors.alertred : 
                data._data.status < 6 ? Colors.alertyellow : null
            }]}
            >
                <Text style={[styles.orderstatustext]}>
                    {
                        data._data.status == 6 ? Languages.View : 
                        data._data.status == 9 ? Languages.Canceled : 
                        data._data.status < 6 ? Languages.Track : null
                    }
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Container;