import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoadingComponentCart } from '@components';
import { Languages, Url } from '@common';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { RadioButtonOrderScreen, Button, CustomAlertButton, CustomAlert } from '@components';
import styles from './styles';
import ItemsList from './Components/ItemsList';
import PromotionButton from './Components/promotionbutton';
import OrderCharges from './Components/ordercharges';
import OrderTypeOptions from './OderTypeOptions/index';
import axios from 'axios';
import { showMessage } from "react-native-flash-message";
import { Service } from '@notificationservice';
import PayHere from '@payhere/payhere-mobilesdk-reactnative';

const QueryString = require('query-string');

const CartPage = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [clearcartalert, setclearcartalert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [totalloading, settotalloading] = useState(true);
    const [deliveryinfoarray, setdeliveryinfoarray] = useState([]);
    const [selectedrestaurantdata, setselectedrestaurantdata] = useState([]);
    const [appsettings, setappsettings] = useState([]);

    const [restauranttype, setrestauranttype] = useState('');
    const [restaurantid, setrestaurantid] = useState('');
    const [restaurantname, serestaurantname] = useState('');
    const [deliveryname, setdeliveryname] = useState('');
    const [cartitems, setcartitems] = useState([]);
    const [userid, seuserid] = useState(0);
    const [deliverynote, setdeliverynote] = useState(0);
    const [ordertype, setordertype] = useState(0);
    const [paymentmethod, setpaymentmethod] = useState('COD');
    const [carttype, setcarttype] = useState('');
    const [appliedpromo, setappliedpromo] = useState([]);
    const [promocodeshave, setpromocodeshave] = useState(false);
    const [esttimestr, setesttimestr] = useState('');
    const [distance, setdistance] = useState(0);
    
    const [sadditionalcharge, setsadditionalcharge] = useState(0);
    const [subtotal, setsubtotal] = useState(0);
    const [total, settotal] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [deliveryfee, setdeliveryfee] = useState(0);
    const [deliveryavailable, setdeliveryavailable] = useState(true);
    
    const [orderdiscount, setorderdiscount] = useState([]);
    const [gotostatusscreen, setgotostatusscreen] = useState(0);

    const [unavailableitems, setunavailableitems] = useState([]);

    const onRegister =(token)=> {
        this.setState({registerToken: token.token, fcmRegistered: true});
    }
    
    const notif = useMemo(() => {
        return new Service(onRegister);
    }, [])

    const paymentoptions = [{id : 1, label : 'Cash on Delivery', price : total, data : 'COD'}, {id : 1, label : 'Card Payment', price : total, data : 'CARD'}];
    const paymentoptions1 = [{id : 1, label : 'Card Payment', price : total, data : 'CARD'}];
    const paymentoptions2 = [{id : 1, label : 'Pay on shop', price : total, data : 'COD'}, {id : 1, label : 'Card Payment', price : total, data : 'CARD'}];
    
    useEffect(()=>{
        setLoading(true);
        AsyncStorage.multiGet(['userid', 'deliveryname', 'cart_merchant_type', 'fname', 'lname'], (err, user) => {
            seuserid(user[0][1]);
            setdeliveryname(`${user[3][1]} ${user[4][1]}`);
            setcarttype(user[2][1]);
        });

        AsyncStorage.multiGet(['cartitems', 'appliedpromo'], (err, cartitems)=>{
            const cartitemsdata = cartitems[0][1] == null ? [] : JSON.parse(cartitems[0][1]);
            const promo = cartitems[1][1];
            if(promo){
                const appliedpromo = JSON.parse(promo);
                setappliedpromo(appliedpromo);
                setpromocodeshave(true);
            }else{
                setappliedpromo([]);
                setpromocodeshave(false);
            }

            try{
                if(cartitemsdata.length == 0){
                    if(gotostatusscreen == 0){
                        ClearCartAndBack();
                    }
                }else{
                    if(cartitemsdata != null){
                        setrestaurantid(cartitemsdata[0].restaurant_id);
                        serestaurantname(cartitemsdata[0].restaurant_name);
                        setcartitems(cartitemsdata);
                        getCartCharges(cartitems[0][1], cartitems[1][1]);
                        getSelectedRestaurantData(cartitemsdata[0].restaurant_id);
                    }else{
                        if(gotostatusscreen == 0){
                            ClearCartAndBack();
                        }
                    }
                }
            }
            catch(error){
                ClearCart();
            }
        });

        fetch(Url.getappsettings)
        .then((response) => response.json())
        .then((data) => {setappsettings(data[0])})
        .catch((error) => console.error(error))
        setLoading(false);
    }, [isFocused])

    const getCartCharges = (items, promo) => {
        const promodata = JSON.parse(promo);
        settotalloading(true);
        AsyncStorage.getItem('cartrestaurantid', (err, res_id)=>{
            var ordertype = 'Delivery';
            const ordertypeid = deliveryinfoarray.ordertype;
            if(ordertypeid == 0){
                ordertype = 'Delivery';
            }else if(ordertypeid == 1){
                ordertype = 'SelfPickup';
            }else if(ordertypeid == 2){
                ordertype = 'DineIn';
            } 
            console.log('Cart Items ::::: '+res_id);

            axios.post(Url.getcartcalculations,
            QueryString.stringify({
                restuarant_id : res_id,
                ordertype : ordertype,
                items : items,
                km : distance,
                time : 0,
                promocode : promodata ? promodata.promo_code : ''
            }),
            {headers: {"Content-Type": "application/x-www-form-urlencoded",}})
            .then(response => {
                if(response.data.deliveryavailable == 1){
                    setdeliveryavailable(true);
                }else{
                    setdeliveryavailable(false);
                }
                if(Number(response.data.total) > Number(appsettings.max_cod)){
                    setpaymentmethod('CARD');
                }else{
                    setpaymentmethod('COD');
                }
                settotal(response.data.total);
                setesttimestr(response.data.est_min_str);
                setsubtotal(response.data.subtotal);
                setdiscount(response.data.discount);
                setcartitems(response.data.items);
                setdeliveryfee(response.data.deliveryfee);
                setunavailableitems(response.data.unavailableitems);
                setorderdiscount(response.data.orderdiscount);
                AsyncStorage.setItem('cartprice', response.data.subtotal + '');
                AsyncStorage.setItem('cartqty', response.data.totalqty + '');
                console.log('DISCOUNT ::: 000 ::: '+response.data.discount);
            }).catch(error => {
                settotalloading(false);
            });
        })
    }

    const getCartCharges_2 = (items, type, distance) => {
        settotalloading(true);
        AsyncStorage.getItem('cartrestaurantid', (err, res_id)=>{
            axios.post(Url.getcartcalculations,
                QueryString.stringify({
                    restuarant_id : res_id,
                    ordertype : type,
                    items : items,
                    km : distance,
                    time : 0,
                    promocode : promocodeshave ? appliedpromo.promo_code : ''
                }),
                {headers: {"Content-Type": "application/x-www-form-urlencoded",}})
                .then(response => {
                    if(response.data.deliveryavailable == 1){
                        setdeliveryavailable(true);
                    }else{
                        setdeliveryavailable(false);
                    }
                    if(Number(response.data.total) > Number(appsettings.max_cod)){
                        setpaymentmethod('CARD');
                    }else{
                        setpaymentmethod('COD');
                    }
                    settotal(response.data.total);
                    setsubtotal(response.data.subtotal);
                    setesttimestr(response.data.est_min_str);
                    setdiscount(response.data.discount);
                    setcartitems(response.data.items);
                    setdeliveryfee(response.data.deliveryfee);
                    setorderdiscount(response.data.orderdiscount);
                    AsyncStorage.setItem('cartprice', response.data.subtotal + '');
                    AsyncStorage.setItem('cartqty', response.data.totalqty + '');
                    settotalloading(false);
                }).catch(error => {
                    alert(error);
                    settotalloading(false);
                });
        });
    }

    const getSelectedRestaurantData = (id) => {
        settotalloading(true);
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : id,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            const res_data = response.data;
            setrestauranttype(res_data.restaurant_type);
            settotalloading(false);
        });
    }

    const SetOrder = () => {
        var t = new(Date);
        var hour = t.getHours();
        var minutes = t.getMinutes();
        var seconds = t.getSeconds();
        var year = t.getFullYear();
        var month = t.getMonth();
        var day = t.getDate();
        var payhere_orderid = `${hour}${minutes}${year}${month}${day}-${userid}`

        const paymentObject = {
            "sandbox": appsettings.payhere_mode == 0 ? true : false,
            "merchant_id": appsettings.merchant_id,
            "merchant_secret": appsettings.merchant_secret,
            "notify_url": "http://app.nstomatoes.lk/payment/notify",
            "order_id": payhere_orderid,
            "items": restaurantname+" - "+payhere_orderid,
            "amount": total,
            "currency": "LKR",
            "first_name": deliveryinfoarray.fname,
            "last_name": deliveryinfoarray.lname,
            "email": deliveryinfoarray.email,
            "phone": deliveryinfoarray.phonenumber,
            "address": deliveryinfoarray.useraddress,
            "city": deliveryinfoarray.city,
            "country": "Sri Lanka",
            "delivery_address": deliveryinfoarray.useraddress,
            "delivery_city": deliveryinfoarray.city,
            "delivery_country": "Sri Lanka",
            "custom_1": "",
            "custom_2": ""
        };

        if(paymentmethod == 'CARD'){
            PayHere.startPayment(
                paymentObject, 
                (paymentId) => {PostOrder(paymentId, 1)},
                (errorData) => {console.log("Payment Error", errorData)},
                () => {console.log("Payment Dismissed")}
            );
        }else{
            PostOrder('', 0)
        }
    }

    const PostOrder = (payhereid, paid) => {
        settotalloading(true);
        const promo_code = promocodeshave ? appliedpromo.promocode : '';
        const orderitems = JSON.stringify(cartitems);

        var ordertype = '';
        const ordertypeid = deliveryinfoarray.ordertype;
        if(ordertypeid == 0){
            ordertype = 'Delivery';
        }else if(ordertypeid == 1){
            ordertype = 'SelfPickup';
        }else if(ordertypeid == 2){
            ordertype = 'DineIn';
        }

        const orderarray = [{
            customers_id : userid,
            delivery : deliveryfee,
            delivery_address : deliveryinfoarray.useraddress,
            delivery_lat : deliveryinfoarray.userlat,
            delivery_lon : deliveryinfoarray.userlan,
            delivery_name : deliveryname,
            delivery_phone : deliveryinfoarray.phonenumber,
            discount : discount,
            estimate_time : '',
            food_amount : deliveryinfoarray.cartprice,
            notes : deliverynote,
            order_shedule_date : deliveryinfoarray.date,
            order_shedule_time : deliveryinfoarray.time,
            order_shedule_type : deliveryinfoarray.shedule_type,
            order_total : total,
            orderforfriend : 0,
            orderitems : orderitems,
            ordertype : ordertype,
            paid : paid,
            payhereid : payhereid,
            paymentmode : paymentmethod,
            promocode : promo_code,
            restaurant_name : restaurantname,
            restuarant_details_id : restaurantid,
            small_order : sadditionalcharge
        }];

        axios.post(Url.neworderurl,
        QueryString.stringify(
            orderarray[0],
        ),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
        if(response.data.status == 1){
            const orderid = response.data.id;
            showMessage({
                message: "Order placed successfully",
                type: "success",
                icon : 'success',
                duration : 3000
            });
            settotalloading(false);
            ClearCart();
            setgotostatusscreen(1);
            navigation.replace('OrderStatus', {title : `#${orderid} Order`, orderid : orderid});
            notif.localNotif('sample.mp3', Languages.Orderplaced, Languages.OrderPlacedSuccessfully);
        }else{
            showMessage({
                message: "Something went wrong, please try again.",
                type: "danger",
                icon : 'danger',
                duration : 3000
            });
            settotalloading(false);
        }
        }).catch(error => {
            showMessage({
                message: 'error',
                type: "danger",
                icon : 'danger',
                duration : 3000
            });
            settotalloading(false);
            alert(error);
        })
    }

    const ClearCart = () => {
        AsyncStorage.removeItem('cartitems');
        AsyncStorage.removeItem('cartprice');
        AsyncStorage.removeItem('cartqty');
        AsyncStorage.removeItem('cartrestaurantid');
        AsyncStorage.removeItem('appliedpromo');
        AsyncStorage.removeItem('cart_merchant_type');
    }

    const ClearCartAndBack = () => {
        AsyncStorage.removeItem('cartitems');
        AsyncStorage.removeItem('cartprice');
        AsyncStorage.removeItem('cartqty');
        AsyncStorage.removeItem('cartrestaurantid');
        AsyncStorage.removeItem('appliedpromo');
        AsyncStorage.removeItem('cart_merchant_type');
        showMessage({
            message: "Cart cleared",
            type: "success",
            icon : 'success',
            duration : 2000
        });
        navigation.replace('HomeTabNavigator');
    }

    const SetNewRestaurantData = (value) => {
        setrestaurantid(value.id);
        serestaurantname(value.name);
        getSelectedRestaurantData(value.id);
        AsyncStorage.multiGet(['cartitems', 'appliedpromo'], (err, cartitems)=>{
            getCartCharges(cartitems[0][1], cartitems[1][1]);
        })
    }

    return(
        <View style={[styles.container]}>
            <LoadingComponentCart visibility={totalloading} subtitle={Languages.CalculatingTotal}/>
            <ScrollView>
                <OrderTypeOptions 
                    getType={(type)=>(setdeliveryinfoarray(type), setordertype(type.ordertype))} 
                    deliveryavailable={deliveryavailable}
                    navigation={navigation} 
                    restaurantname={restaurantname} 
                    restauranttype={restauranttype} 
                    getNewRestaurant={(value)=>SetNewRestaurantData(value)}
                    res_id={restaurantid}
                    res_data={selectedrestaurantdata}
                    carttype={carttype}
                    est_time={esttimestr}
                    onChangeState={(type, distance)=>{
                        getCartCharges_2(JSON.stringify(cartitems), type, distance)
                    }}
                    getDistance={(distance)=>{
                        getCartCharges_2(JSON.stringify(cartitems), 'Delivery', distance);
                        setdistance(distance);
                    }}
                />
                <ItemsList 
                    setClearCartAlert={(state)=>setclearcartalert(state)}
                    unavailableitems={unavailableitems}
                    getRefreshState={(state)=>{console.log(state)}}
                    setCartPrice={(price)=>setcartprice(price)}
                    getItemList={()=>null}
                    cartItems={cartitems}
                    type={'restaurant'}
                />
                <PromotionButton type={'restaurant'}/>
                <TextInput 
                    value={deliverynote}
                    placeholder={Languages.AddDeliveryNote}
                    onChangeText={text => setdeliverynote(text)}
                    style={[styles.textinput]}
                    placeholderTextColor={'rgba(0,0,0,0.4)'}
                /> 
                <OrderCharges
                    getordercharges={(ordercharges)=>settotal(ordercharges)} 
                    navigation={navigation}
                    subtotal={subtotal}
                    total={total}
                    deliveryfee={deliveryfee}
                    discount={discount}
                    additionalcharge={100}
                    orderdiscount={orderdiscount}
                /> 

                <>
                {subtotal <= 0 ? null : 
                    <>
                        <Text style={[styles.paymentsummerytext, {marginLeft : 10, marginTop : 20}]}>{Languages.PayWith}</Text>
                        <RadioButtonOrderScreen
                            data={ (ordertype == 0 && total > Number(appsettings.max_cod)) ? paymentoptions1 : ( ordertype == 0 ) ? paymentoptions : paymentoptions2}
                            initial={1}
                            box = {false}
                            selectedBtn={(e) => {setpaymentmethod(e.data), console.log(e)}}            
                            animationTypes= {['pulse', 'shake', 'rotate']}
                        />
                        <View style={[styles.buttonholder]}>
                            <Button title={Languages.PlaceOrder} action={SetOrder}/>
                        </View>
                    </>}
                </> 
            </ScrollView>

            {/* Cannot apply promo code alert */}
            <CustomAlert
                displayMode={'alert'}
                displayMsg={Languages.ClearCart}
                displaymsgtitle={Languages.AreYouSure}
                visibility={clearcartalert}
                cancellable={false}
                buttons={(
                <>
                    <CustomAlertButton buttontitle={Languages.Yes} theme={'alert'} buttonaction={ClearCartAndBack}/>
                    <CustomAlertButton buttontitle={Languages.Cancel} theme={'inverse'} buttonaction={()=>setclearcartalert(false)}/>
                </>
                )}>
            </CustomAlert>
        </View>
    );
}
export default CartPage;