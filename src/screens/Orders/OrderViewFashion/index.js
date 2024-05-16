/** @format */

import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Languages, Images, Url, Colors } from '@common';
import { LoadingComponent } from '@components';
import OrderInfoRow from './Components/OrderInfoRow';
import OrderChargeInfoRow from './Components/OrderChargeInfoRow';
import Separator from './Components/Separator';
import OrderItemsList from './Components/OrderItemsList';
import PaymentInfo from './Components/PaymentInfo';
import styles from './styles';
import axios from 'axios';

const QueryString = require('query-string');

const OrderViewFashion =({route}) => {

    const {orderid} = route.params;
    const {status} = route.params;
    const [orderdata, setorderdata] = useState([]);
    const [fname, setfname] = useState('');
    const [loading, setloading] = useState(false);
    const [isfashionstore, setisfashionstore] = useState(false);
    const [esttime, setesttime] = useState(false);
    const [restaurant, setrestaurant] = useState([]);

    useEffect(() => {
        console.log(status)
        setloading(true);
        axios.post(Url.getorderdetailsurl, 
        QueryString.stringify({
            orderid : orderid
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            setorderdata(response.data);
            getRestaurantData(response.data.order.restuarant_details_id)
            setloading(false);
            AsyncStorage.getItem('fname', (err, fname)=>{
                setfname(fname);
            })
            setrestaurant(response.data.resturant);
        }).catch(error => {
            alert(error);
            setloading(false);
        })
    }, []);

    const getRestaurantData = (id) => {
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : id
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            if(response.data.restaurant_type == 'fashion'){
                setisfashionstore(true);
                setesttime(response.data.fashion_delivery_time);
            }
            
        }).catch(error => {
            alert(error);
        })
    }

    return(
        <View style={{width : '100%', height : '100%', backgroundColor : Colors.white}}>
            <LoadingComponent visibility={loading}/>
            {orderdata.length == 0 ? null :
            <ScrollView style={[styles.container]}>
                <View style={[styles.row]}>
                    <Image source={Images.Logo} style={[styles.vectorimage]}/>
                    <Icon name={'call'} size={30} onPress={()=>Linking.openURL(`tel:${restaurant.hotline}`)}/>
                </View>
                <View style={[styles.orderstatusbadge]}>
                    <Text style={[styles.orderstatusbadgetext]}>
                        {
                            status == 0 ? 'Pending' : null ||
                            status == 1 ? 'Confirmed' : null ||
                            status == 3 ? 'Package has being prepared' : null || 
                            status == 4 ? 'Out for Delivery' : null || 
                            status == 6 ? 'Successfully Delivered' : null || 'Pending'
                        }
                    </Text>
                </View>
                <View style={{marginTop : 15}}>
                    <OrderInfoRow title={Languages.OrderId} value={`#${orderid}`}/>
                    <OrderInfoRow title={Languages.OrderDate} value={orderdata.order.created_at}/>
                    <OrderInfoRow title={Languages.DeliveryAddress} value={orderdata.order.delivery_address}/>
                    <OrderInfoRow title={Languages.RecieverName} value={orderdata.order.delivery_name}/>
                    {isfashionstore ? 
                    <OrderInfoRow title={Languages.EstTime} value={esttime}/> : null}
                </View>
                <View style={{marginTop : 20}}/>
                <Separator/>
                    <OrderInfoRow title={Languages.MerchantName} value={restaurant.name}/>
                    <OrderInfoRow title={Languages.Address} value={`${restaurant.address_line_1}, ${restaurant.address_line_2}`}/>
                <Separator/>
                <OrderItemsList items={orderdata.order.orderitems}/>
                <Separator/>
                <View >
                    <OrderChargeInfoRow title={Languages.SubTotal} value={Number(orderdata.order.food_amount).toFixed(2)}/>
                    {orderdata.order.small_order == 0 ? null : <OrderChargeInfoRow title={Languages.ServiceCharge} value={Number(orderdata.order.small_order).toFixed(2)}/>}
                    {orderdata.order.discount == 0 ? null : <OrderChargeInfoRow title={Languages.Promotion} value={Number(orderdata.order.discount).toFixed(2)}/>}
                    {orderdata.order.delivery == 0 ? null : <OrderChargeInfoRow title={Languages.DeliveryCharge} value={Number(orderdata.order.delivery).toFixed(2)}/>}
                </View>
                <View style={[styles.row, {marginTop : 10, alignItems : 'flex-end', justifyContent : 'flex-end'}]}>
                    <Text style={[styles.total, {marginRight : 10}]}>{Languages.Total}  : </Text>
                    <Text style={[styles.total]}>{Languages.Rs} {Number(orderdata.order.order_total).toFixed(2)}</Text>
                </View>
                <Separator/>
                <Text style={[styles.paidby]}>{Languages.PaymentMethod}</Text>
                <PaymentInfo type={orderdata.order.paymentmode}/>
                
                <Text style={[styles.thanksfororder]} numberOfLines={1}>{Languages.ThanksForOrdering}{fname}</Text>
                <Text style={[styles.infotext]}>{Languages.IfYouHadAny}</Text>
                <Text style={[styles.infotextbold]}>{Languages.Hotline} : +9475 120 0200</Text>
                <Text style={[styles.infotextbold]}>{Languages.Email} : info@nstomatoes.lk</Text>
                <View style={{marginBottom : 80}}/>
            </ScrollView>}
        </View>
    );
}
export default OrderViewFashion;