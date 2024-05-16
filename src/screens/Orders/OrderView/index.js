/** @format */

import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Store, Languages, Images, Url, Colors } from '@common';
import { LoadingComponent } from '@components';
import OrderInfoRow from './Components/OrderInfoRow';
import OrderChargeInfoRow from './Components/OrderChargeInfoRow';
import Separator from './Components/Separator';
import OrderItemsList from './Components/OrderItemsList';
import PaymentInfo from './Components/PaymentInfo';
import styles from './styles';
import axios from 'axios';

const QueryString = require('query-string');

const OrderView =({route}) => {

    const {orderid} = route.params;
    const [orderdata, setorderdata] = useState([]);
    const [fname, setfname] = useState('');
    const [loading, setloading] = useState(false);
    const [isfashionstore, setisfashionstore] = useState(false);
    const [esttime, setesttime] = useState(false);

    useEffect(() => {
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
            });
        }).catch(error => {
            console.log(error);
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
            console.log(error);
        })
    }

    return(
        <View style={{width : '100%', height : '100%', backgroundColor : Colors.white}}>
            <LoadingComponent visibility={loading}/>
            {orderdata.length == 0 ? null :
            <ScrollView style={[styles.container]}>
                <View style={[styles.row]}>
                    <Image source={Images.Logo} style={[styles.vectorimage]}/>
                </View>
                <Text style={[styles.thanksfororder]} numberOfLines={1}>{Languages.ThanksForOrdering}{fname}</Text>
                <View style={[styles.orderstatuscontainer]}>
                    <Text style={[styles.orderstatus, {color : orderdata.order.status == 6 ? 'green' : null || orderdata.order.status == 9 ? 'red' : null}]} numberOfLines={1}>{orderdata.order.status == 6 ? 'Delivered' : null || orderdata.order.status == 9 ? 'Canceled' : null}</Text>
                </View>
                <View style={{marginTop : 15}}>
                    <OrderInfoRow title={Languages.OrderId} value={`#${orderid}`}/>
                    <OrderInfoRow title={Languages.OrderDate} value={orderdata.order.created_at}/>
                    <OrderInfoRow title={Languages.DeliveryAddress} value={orderdata.order.delivery_address}/>
                    <OrderInfoRow title={Languages.DeliveryName} value={orderdata.order.delivery_name}/>
                    {isfashionstore ? 
                    <OrderInfoRow title={Languages.EstTime} value={esttime}/> : null}
                </View>
                <Separator/>
                <OrderItemsList items={orderdata.order.orderitems}/>
                <Separator/>
                <View >
                    <OrderChargeInfoRow title={Languages.SubTotal} value={Number(orderdata.order.food_amount).toFixed(2)}/>
                    {orderdata.order.small_order == 0 ? null : <OrderChargeInfoRow title={Languages.ServiceCharge} value={Number(orderdata.order.small_order).toFixed(2)}/>}
                    {orderdata.order.discount == 0 ? null : <OrderChargeInfoRow title={Languages.Promotion} value={Number(orderdata.order.discount).toFixed(2)}/>}
                    {orderdata.order.delivery == 0 ? null : <OrderChargeInfoRow title={Languages.DeliveryCharge} value={Number(orderdata.order.delivery).toFixed(2)}/>}
                </View>
                <View style={[styles.row, {marginTop : 10}]}>
                    <Text style={[styles.total]}>{Languages.Total}</Text>
                    <Text style={[styles.total]}>{Languages.Rs} {Number(orderdata.order.order_total).toFixed(2)}</Text>
                </View>
                <Separator/>
                <Text style={[styles.paidby]}>{Languages.PaymentMethod}</Text>
                <PaymentInfo type={orderdata.order.paymentmode}/>
            </ScrollView>}
        </View>
    );
}
export default OrderView;