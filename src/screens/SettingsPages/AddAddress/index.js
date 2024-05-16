import React, { useEffect, useState } from 'react';
import {
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import { Languages } from "@common";
import { useNavigation } from '@react-navigation/native';
import TextInputContainer from './TextInputContainer';
import {Button, CustomAlert, CustomAlertButton} from '@components';
import { showMessage } from "react-native-flash-message";

const AddAddress = () => {

    const navigation = useNavigation();
    const [addressline1, setaddressline1] = useState('');
    const [addressline2, setaddressline2] = useState('');
    const [city, setcity] = useState('');
    const [deliverycontact, setdeliverycontact] = useState('');
    const [fieldsemptyalert, setfieldsemptyalert] = useState(false);

    useEffect(()=>{
        AsyncStorage.multiGet(['user_addressline1', 'user_addressline2', 'user_deliverycontact', 'user_city'], (err, user)=>{
            console.log(user);
            if(user[0][1] != 'null'){setaddressline1(user[0][1]);}
            if(user[1][1] != 'null'){setaddressline2(user[1][1]);}
            if(user[2][1] != 'null'){setdeliverycontact(user[2][1]);}
            if(user[3][1] != 'null'){setcity(user[3][1]);}
        });
    },[])

    const setPhoneNumber = (number) => {
        console.log(deliverycontact.length)
        if(deliverycontact.length >= 9){
            null
        }else{
            setdeliverycontact(number);
        }
    }

    const SaveFunction = () => {
        if(addressline1 == '' || addressline2 == '' || deliverycontact == '' || city == ''){
            setfieldsemptyalert(true);
        }else{
            AsyncStorage.setItem('user_addressline1', addressline1);
            AsyncStorage.setItem('user_addressline2', addressline2);
            AsyncStorage.setItem('user_deliverycontact', deliverycontact);
            AsyncStorage.setItem('user_city', city);
            AsyncStorage.setItem('user_fulladdress', `${addressline1}, ${addressline2}`);
            showMessage({
                message: "Delivery info updated...",
                type: "success",
                icon : 'success',
                duration : 2000
            });
            navigation.goBack();
        }
    }

    return(
        <View style={[styles.container]}>
            <TextInputContainer onChangeValue={(text)=>{setaddressline1(text)}} value={addressline1} placeholder={Languages.AddressLine1}/>
            <TextInputContainer onChangeValue={(text)=>{setaddressline2(text)}} value={addressline2} placeholder={Languages.AddressLine2}/>
            <TextInputContainer onChangeValue={(text)=>{setcity(text)}} value={city} placeholder={Languages.City}/>
            <TextInputContainer onChangeValue={(text)=>{setdeliverycontact(text)}} value={deliverycontact} placeholder={Languages.DeliveryContact} type={'numeric'} maxLength={11}/>
            <View style={[styles.buttonholder]}>
                <Button title={Languages.Save} action={SaveFunction}/>
            </View>

            {/* Cannot apply promo code alert */}
            <CustomAlert
                displayMode={'alert'}
                displayMsg={Languages.SomeRequiredFieldsEmpty}
                visibility={fieldsemptyalert}
                cancellable={false}
                buttons={(
                <>
                    <CustomAlertButton buttontitle={Languages.Ok} theme={'alert'} buttonaction={()=>setfieldsemptyalert(false)}/>
                </>
                )}>
            </CustomAlert>
        </View>
    );
}
export default AddAddress;