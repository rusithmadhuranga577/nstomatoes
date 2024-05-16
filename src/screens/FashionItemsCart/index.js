import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LoadingComponentCart} from '@components';
import { Languages, Url, Store } from '@common';
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

const FashionItemsCart = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [clearcartalert, setclearcartalert] = useState(false);
    const [nodeliveryinfoalert, setnodeliveryinfoalert] = useState(false);

    const [totalloading, settotalloading] = useState(true);
    const [deliveryinfoarray, setdeliveryinfoarray] = useState([]);
    const [selectedrestaurantdata, setselectedrestaurantdata] = useState([]);

    const [restauranttype, setrestauranttype] = useState('');
    const [restaurantid, setrestaurantid] = useState('');
    const [restaurantname, serestaurantname] = useState('');
    const [deliveryname, setdeliveryname] = useState('');
    const [cartitems, setcartitems] = useState([]);
    const [userid, seuserid] = useState(0);
    const [deliverynote, setdeliverynote] = useState(0);
    const [ordertype, setordertype] = useState(0);
    const [paymentmethod, setpaymentmethod] = useState('COD');
    const [appliedpromo, setappliedpromo] = useState([]);
    const [promocodeshave, setpromocodeshave] = useState(false);
    const [carttype, setcarttype] = useState('');

    const [appsettings, setappsettings] = useState([]);
    const [cartprice, setcartprice] = useState(0);

    const [subtotal, setsubtotal] = useState(0);
    const [total, settotal] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [deliveryfee, setdeliveryfee] = useState(0);

    const [orderdiscount, setorderdiscount] = useState([]);

    const [unavailableitems, setunavailableitems] = useState([]);

    const onRegister =(token)=> {
        this.setState({registerToken: token.token, fcmRegistered: true});
    }
    
    const notif = useMemo(() => {
        return new Service(onRegister);
    }, [])

    const paymentoptions = [{id : 1, label : 'Cash on Delivery', price : total, data : 'COD'}, {id : 1, label : 'Card Payment', price : total, data : 'CARD'}];

    useEffect(()=>{
        settotalloading(true);
        AsyncStorage.multiGet(['userid', 'deliveryname', 'cart_merchant_type', 'fname', 'lname'], (err, user) => {
            seuserid(user[0][1]);
            setdeliveryname(`${user[3][1]} ${user[4][1]}`);
            setcarttype(user[2][1]);
        });
        
        AsyncStorage.multiGet(['cartitems', 'appliedpromo'], (err, cartitems)=>{
            const cartitemsdata = JSON.parse(cartitems[0][1]);
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
                    ClearCartAndBack();
                }else{
                    if(cartitemsdata != null){
                        setrestaurantid(cartitemsdata[0].restaurant_id);
                        serestaurantname(cartitemsdata[0].restaurant_name);
                        setcartitems(cartitemsdata);
                        getCartCharges(cartitems[0][1], cartitems[1][1]);
                        getSelectedRestaurantData(cartitemsdata[0].restaurant_id);
                    }else{
                        ClearCartAndBack();
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
    }, [isFocused])

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

    const checkInfoAvailable = () => {
        if(deliveryinfoarray.infohave == true){
            SetOrder();
        }else{
            setnodeliveryinfoalert(true);
        }
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

            "notify_url": "http://app.nstomatoes.lk/notify",
            "order_id": payhere_orderid,
            "items": Store.storename,
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
        const promo_code = appliedpromo !== null ? appliedpromo.promo_code : '';
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
            ordertype : ordertype,
            order_shedule_type : 0,
            food_amount : subtotal,
            delivery : deliveryfee,
            small_order : 0,
            discount : discount,
            order_total : total,
            orderforfriend : 0,
            delivery_name : deliveryname,
            delivery_address : deliveryinfoarray.useraddress,
            delivery_lon : 0,
            delivery_lat : 0,
            delivery_phone : deliveryinfoarray.phonenumber,
            estimate_time : '',
            notes : deliverynote,
            orderitems : orderitems,
            promocode : promo_code,
            paymentmode : paymentmethod,
            payhereid : payhereid,
            restuarant_details_id : restaurantid,
            restaurant_name : restaurantname,
            paid : paid
        }]
        console.log(orderarray[0])
        axios.post(Url.neworderurl,
            QueryString.stringify(
                orderarray[0],
            ),
            {
              headers: {"Content-Type": "application/x-www-form-urlencoded",}
            })
            .then(response => {
                console.log(response.data)
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
                navigation.replace('OrderViewFashion', {title : `#${orderid} Order`, orderid : orderid});
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
            alert(error);
            settotalloading(false);
        })
    }

    const ClearCart = () => {
        AsyncStorage.removeItem('cartitems');
        AsyncStorage.removeItem('cartprice');
        AsyncStorage.removeItem('cartqty');
        AsyncStorage.removeItem('cartrestaurantid');
        AsyncStorage.removeItem('appliedpromo');
    }

    const ClearCartAndBack = () => {
        AsyncStorage.removeItem('cartitems');
        AsyncStorage.removeItem('cartprice');
        AsyncStorage.removeItem('cartqty');
        AsyncStorage.removeItem('cartrestaurantid');
        AsyncStorage.removeItem('appliedpromo');
        showMessage({
            message: "Cart cleared",
            type: "success",
            icon : 'success',
            duration : 2000
        });
        navigation.goBack();
    }

    const SetNewRestaurantData = (value) => {
        setrestaurantid(value.id);
        serestaurantname(value.label);
        getSelectedRestaurantData(value.id);
    }

    const getCartCharges = (items, promo) => {
        const promodata = JSON.parse(promo)
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

            axios.post(Url.getcartcalculations,
            QueryString.stringify({
                restuarant_id : res_id,
                ordertype : ordertype,
                items : items,
                km : 0,
                time : 0,
                promocode : promodata ? promodata.promo_code : ''
            }),
            {headers: {"Content-Type": "application/x-www-form-urlencoded",}})
            .then(response => {
                settotal(response.data.total);
                setsubtotal(response.data.subtotal);
                setdiscount(response.data.discount);
                setcartitems(response.data.items);
                setdeliveryfee(response.data.deliveryfee);
                setunavailableitems(response.data.unavailableitems);
                setorderdiscount(response.data.orderdiscount);
                AsyncStorage.setItem('cartprice', response.data.subtotal + '');
                AsyncStorage.setItem('cartqty', response.data.totalqty + '');
                settotalloading(false);
            }).catch(error => {
                alert(error);
                settotalloading(false);
            });
        })
    }

    const getCartCharges_2 = (items, type) => {
        settotalloading(true);
        axios.post(Url.getcartcalculations,
        QueryString.stringify({
            restuarant_id : restaurantid,
            ordertype : type,
            items : items,
            km : 0,
            time : 0,
            promocode : promocodeshave ? appliedpromo.promo_code : ''
        }),
        {headers: {"Content-Type": "application/x-www-form-urlencoded",}})
        .then(response => {
            settotal(response.data.total);
            setsubtotal(response.data.subtotal);
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
    }

    return(
        <View style={[styles.container]}>
            <LoadingComponentCart visibility={totalloading} subtitle={Languages.CalculatingTotal}/>
            <ScrollView>
                <OrderTypeOptions 
                    setTime={(time)=>console.log(time)} 
                    getType={(type)=>(setdeliveryinfoarray(type), setordertype(type.ordertype))} 
                    navigation={navigation} restaurantname={restaurantname} 
                    restauranttype={restauranttype} 
                    getNewRestaurant={(value)=>SetNewRestaurantData(value)}
                    res_id={restaurantid}
                    carttype={carttype}
                    res_data={selectedrestaurantdata}
                    onChangeState={(type)=>{
                        console.log('type', type)
                        getCartCharges_2(JSON.stringify(cartitems), type)
                    }}
                />
                <ItemsList 
                    setClearCartAlert={(state)=>setclearcartalert(state)}
                    unavailableitems={unavailableitems}
                    getRefreshState={(state)=>{console.log(state)}}
                    setCartPrice={(price)=>setcartprice(price)}
                    getItemList={()=>null}
                    cartItems={cartitems}
                    type={'fashion'}
                />
                <PromotionButton type={'fashion'}/>
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
                
                {cartitems.length > 0 ?
                <>
                <Text style={[styles.paymentsummerytext, {marginLeft : 10, marginTop : 20}]}>{Languages.PayWith}</Text>
                <RadioButtonOrderScreen
                    data={paymentoptions}
                    initial={1}
                    box = {false}
                    selectedBtn={(e) => {setpaymentmethod(e.data)}}            
                    animationTypes= {['pulse', 'shake', 'rotate']}
                />
                <View style={[styles.buttonholder]}>
                    <Button title={Languages.PlaceOrder} action={checkInfoAvailable}/>
                </View>
                </>:null}
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

            {/* No delivery info alert */}
            <CustomAlert
                displayMode={'alert'}
                displayMsg={Languages.PleaseAddDeliveryInfo}
                visibility={nodeliveryinfoalert}
                cancellable={false}
                buttons={(
                <>
                    <CustomAlertButton buttontitle={Languages.Ok} theme={'alert'} buttonaction={()=>{setnodeliveryinfoalert(false), navigation.push('AddAddress')}}/>
                </>
                )}>
            </CustomAlert>
        </View>
    );
}
export default FashionItemsCart;