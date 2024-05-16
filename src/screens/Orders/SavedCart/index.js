import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { CustomAlert, CustomAlertButton } from '@components';
import { Languages, Url, Icons } from '@common';
import axios from 'axios'; 

const QueryString = require('query-string');

const SavedCart = () => {
    const navigation = useNavigation();
    const [cartdata, setcartdata] = useState([]);
    const isFocused = useIsFocused();
    const [addtocartalert, setaddtocartalert] = useState(false);
    const [clearitemsalert, setclearitemsalert] = useState(false);
    const [selecteditemindex, setselecteditemindex] = useState(null);

    useEffect(()=>{
        AsyncStorage.getItem('savedcartitems', (err, savedcart)=>{
            if(savedcart != null){
                const savedcartdata = JSON.parse(savedcart)
                setcartdata(savedcartdata);
                console.log(savedcartdata)
            }
        })
    },[isFocused])

    const RemoveItem = (index) => {
        const oldarray = cartdata;
        console.log(oldarray);
        oldarray.splice(0,1);
        console.log(oldarray);
        setcartdata(oldarray)
    }

    const RenderItem = (item, index) => {
        return(
            <View>
                {cartdata.length != 0 ?
                <View style={[styles.itemcontainer]}>
                    <View style={[styles.toprow]}>
                        <Text numberOfLines={1} style={[styles.restaurantname]}>{ (item.cartitems[0].restaurant_name) ? item.cartitems[0].restaurant_name : null }</Text>
                        <Text style={[styles.datetime]}>{item.saved}</Text>
                    </View>
                    <View style={{marginTop : 15}}>
                        <FlatList
                            itemDimension={80}
                            data={item.cartitems}
                            spacing={3}
                            renderItem={({ item }) => RenderFoodItemRow(item)}
                        />
                    </View>
                    <View style={[styles.totalcontainer]}>
                        <Text style={[styles.total]}>{Languages.Total}</Text>
                        <Text style={[styles.total]}>{Number(item.cartprice).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.totalcontainer]}>
                        <TouchableOpacity onPress={()=>SetClickedItemIndex(index)} style={[styles.buttoncontainer]}>
                            <Text style={[styles.buttontext]}>{Languages.Cart}</Text>
                        </TouchableOpacity>
                    </View>
                </View> : null}
            </View>
        );
    }

    const SetClickedItemIndex = (index) => {
        console.log(index);
        setselecteditemindex(index);
        setaddtocartalert(true);
    }

    const getSelectedRestaurantData = (id) => {
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : id,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            const res_data = response.data;
            
            if(res_data){
                const type = res_data.restaurant_type;
                AsyncStorage.setItem('cart_merchant_type', type+'');
                if(type != 'fashion'){
                    navigation.push('CartPage');
                }else{
                    navigation.push('FashionItemsCart');
                }
            }else{
                alert('Restaurant is not available right now');
            }
        });
    }

    const AddItemToDefaultCart = (index) => {
        AsyncStorage.getItem('savedcartitems', (err, savedcart)=>{
            if(savedcart != null){
                const savedcartdata = JSON.parse(savedcart)
                const parsedItems = savedcartdata[index];
                const cartitems = JSON.stringify(parsedItems.cartitems);
                const cartprice = parsedItems.cartprice;
                const cartqty = parsedItems.cartqty;
                
                console.log(parsedItems.cartitems[0].restaurant_id)

                AsyncStorage.setItem('cartrestaurantid', parsedItems.cartitems[0].restaurant_id+'');
                AsyncStorage.setItem('cartitems', cartitems);
                AsyncStorage.setItem('cartqty', cartqty + '');
                AsyncStorage.setItem('cartprice', cartprice + '');
                setaddtocartalert(false);
                getSelectedRestaurantData(parsedItems.cartitems[0].restaurant_id);
            }
        });
    }

    const RenderFoodItemRow = (item) => {
        return(
            <View style={[styles.fooditemcontainer]}>
                <Text style={[styles.listitemtext]}>{item.item_name} ({item.item_qty})</Text>
                <Text style={[styles.listitemtext]}>{Languages.Rs}{Number(item.item_total).toFixed(2)}</Text>
            </View>
        );
    }

    const RemoveFunction = (index) => {
        setcartdata([]);
        const items = cartdata;
        cartdata.splice(index, 1);
        // const filteredItems = items.filter(item => item !== valueToRemove);
        console.log(items);
        setcartdata(items);
    }

    const ClearFunction = () => {
        console.log('clear')
        AsyncStorage.removeItem('savedcartitems');
        setcartdata([]);
        setclearitemsalert(false)
    }

    return(
        <View style={[cartdata.length == 0 ? styles.noordercontainer : styles.container]}>
            {cartdata.length == 0 ?
            <Text style={[styles.noorderstext]}>{Languages.YouHaveNoSavedCart}</Text>
            :
            <FlatList
                itemDimension={80}
                data={cartdata}
                spacing={3}
                style={{marginTop : 50}}
                renderItem={({ item, index }) => RenderItem(item, index)}
            />}
            {cartdata.length != 0 ?
            <TouchableOpacity onPress={()=>setclearitemsalert(true)} style={[styles.cleariconrow]}>
                <Image source={Icons.clearlisticon} style={[styles.clearicon]}/>
                <Text style={[styles.cleartext]}>{Languages.Clearsavedcart}</Text>
            </TouchableOpacity>:null}

            {/* Add Items To Cart */}
            <CustomAlert
                displayMode={'alert'}
                displayMsg={Languages.AddThisItemsToCart}
                displaymsgtitle={Languages.AddToCart}
                visibility={addtocartalert}
                dismissAlert={setaddtocartalert}
                cancellable={false}
                buttons={(
                    <>
                    <CustomAlertButton buttontitle={Languages.Ok} theme={'alert'} buttonaction={()=>AddItemToDefaultCart(selecteditemindex)}/>
                    <CustomAlertButton buttontitle={Languages.Cancel} theme={'inverse'} buttonaction={()=>setaddtocartalert(false)}/>
                    </>
                )}
            >
            </CustomAlert>

            {/* Clear Items */}
            <CustomAlert
                displayMode={'error'}
                displayMsg={Languages.ClearSavedItems}
                displaymsgtitle={Languages.Clearsavedcart}
                visibility={clearitemsalert}
                dismissAlert={setclearitemsalert}
                cancellable={false}
                buttons={(
                    <>
                    <CustomAlertButton buttontitle={Languages.Clear} theme={'error'} buttonaction={ClearFunction}/>
                    <CustomAlertButton buttontitle={Languages.Cancel} theme={'inverse'} buttonaction={()=>setclearitemsalert(false)}/>
                    </>
                )}
            >
            </CustomAlert>
        </View>
    );
}

export default SavedCart;