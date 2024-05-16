/** @format */

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Languages, Url, Store } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage } from "react-native-flash-message";
import RNRestart from 'react-native-restart';
import axios from 'axios';

const QueryString = require('query-string');

const CreateNewAccount =() => {

  const navigation = useNavigation();
  const [userid, setuserid] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [city, setcity] = useState('');

  const [pickuppointdata, setpickuppointdata] = useState([{"id":1 ,"label":"Kurunegala","city_lat":Number(Store.merchantlat),"city_lan":Number(Store.merchantlan),"d_range":15000}]);
  const [loading, setloading] = useState(false);
  const [fieldsemptylert, setfieldsemptylert] = useState(false);
  const [lat, setlat] = useState(0);
  const [lan, setlan] = useState(0);

  useEffect(()=>{
    AsyncStorage.multiGet(['userid', 'email', 'fname', 'lname', 'phonenumber', 'authmode', 'city', 'latitude', 'longitude'], (err, userinfo) => {
      console.log(userinfo[0])
      setuserid(userinfo[0][1]);
      setlat(userinfo[7][1]);
      setlan(userinfo[8][1]);
      if(userinfo[1][1] != 'null'){
        setemail(userinfo[1][1]);
      }
      if(userinfo[2][1] != 'null'){
        setfname(userinfo[2][1]);
      }
      if(userinfo[3][1] != 'null'){
        setlname(userinfo[3][1]);
      }
      if(userinfo[4][1] != 'null'){
        setphone(userinfo[4][1]);
      }
    })
    fetch(Url.deliveryareaurl)
    .then((response) => response.json())
    .then((data) => setCiiesArray(data.data))
    .catch((error) => console.error(error))
  },[])

  const setCiiesArray = (data) => {
    const citydata = data;
    var cities = [];
    
    for(i=0; i < citydata.length; i++){
      cities.push({'id' : citydata[i].id, 'label' : citydata[i].cityname, 'city_lat' : citydata[i].city_latitude, 'city_lan' : citydata[i].city_longitude, 'd_range' : citydata[i].delivery_range});
    }
    setpickuppointdata(cities[0]);
  }
  
  const SavePickupPointData = () => {
    const data = JSON.stringify(pickuppointdata);
    console.log(data)
    AsyncStorage.setItem('pickuppoint', data);
  }

  const setPhoneNumber = (number) => {
    const length = number.length;
    if(length <= 10){
      setphone(number)
    }
  }

  const UpdateFunction = () => {
    if(email == '' || fname == '' || phone == ''){
      setfieldsemptylert(true);
    }else{
      setloading(true);
      axios.put(Url.updateuserinfourl+userid, 
      QueryString.stringify({
        first_name : fname,
        last_name : lname,
        phonenumber : phone,
        email : email,
        def_city : city,
        lat : lat,
        lon : lan
      }), 
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
      }).then(response => {
        if(response.data.status == 1){
          showMessage({
            message: "Profile updated successfully",
            type: "success",
            icon : 'success',
            duration : 3000
          });
          setloading(false);
          AsyncStorage.setItem('email', email);
          AsyncStorage.setItem('fname', fname);
          AsyncStorage.setItem('lname', lname);
          AsyncStorage.setItem('city', city);
          AsyncStorage.setItem('phonenumber', phone);
          SavePickupPointData();
          AsyncStorage.getItem('logged', (err, logged) => {
            if(logged == null){
              AsyncStorage.setItem('logged', 1+'');
              RNRestart.Restart();
            }else{
              navigation.goBack();
            }
          })
        }else{
          setloading(false);
          showMessage({
            message: "Something went wrong, please try again.",
            type: "danger",
            icon : 'danger',
            duration : 3000
          });
        }
      })
    }
  }

  return(
    <View>
      <ScrollView style={[styles.container, {padding: 10}]}>
        <View style={{marginBottom: 15}}>
        <Text style={[styles.placeholdertitle]}>{Languages.FirstName}</Text>
          <View style={[styles.inputcontainer]}>
          <View style={[styles.iconholder]}>
            <Icon name={'user'} size={20}/>
          </View>
          <TextInput 
            value={fname}
            onChangeText={input => setfname(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
          />
          </View>
        </View>

        <View style={{marginBottom: 15}}>
        <Text style={[styles.placeholdertitle]}>{Languages.LastName}</Text>
          <View style={[styles.inputcontainer]}>
          <View style={[styles.iconholder]}>
            <Icon name={'user'} size={20}/>
          </View>
          <TextInput 
            value={lname}
            onChangeText={input => setlname(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
          />
          </View>
        </View>

        <View style={{marginBottom: 15}}>
        <Text style={[styles.placeholdertitle]}>{Languages.MobileNumber}</Text>
          <View style={[styles.inputcontainer]}>
          <View style={[styles.iconholder]}>
            <Icon name={'phone'} size={20}/>
          </View>
          <TextInput 
            value={phone}
            keyboardType={'number-pad'}
            onChangeText={input => setPhoneNumber(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
          />
          </View>
        </View>

        <View style={{marginBottom: 50}}>
        <Text style={[styles.placeholdertitle]}>{Languages.Email}</Text>
          <View style={[styles.inputcontainer]}>
          <View style={[styles.iconholder]}>
            <Icon name={'at'} size={20}/>
          </View>
          <TextInput 
            value={email}
            onChangeText={input => setemail(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
          />
          </View>
        </View>

        {/* <Text style={[styles.placeholdertitle]}>{Languages.City}</Text>
        {cityselected ?
        <View style={[styles.pickercontainer]}>
          <Text style={[styles.placeholdertitle]}>{selectedcity}</Text>
          <TouchableOpacity onPress={()=>setcityselected(false)}>
            <Text style={[styles.changetext]}>{Languages.Change}</Text>
          </TouchableOpacity>
        </View>
        :
        <CustomPicker
          placeholder={'Select Time Slot'}
          defaultValue={'Select Time Slot'}
          options={cities}
          fieldTemplate={PickerContainer}
          getLabel={item => item.label}
          maxHeight={'70%'}
          modalAnimationType={'slide'}
          onValueChange={(value) => (SetCityFunction(value))}
        /> } */}
        
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Button title={Languages.Update} action={UpdateFunction}/>
        </View>
      </ScrollView>
    {/* Alerts */}

    <CustomAlert
      displayMode={'alert'}
      displayMsg={Languages.SomeRequiredFieldsEmpty}
      displaymsgtitle={Languages.Alert}
      visibility={fieldsemptylert}
      dismissAlert={setfieldsemptylert}
      cancellable={true}
      buttons={(
        <>
          <CustomAlertButton buttontitle={Languages.Ok} theme={'alert'} buttonaction={()=>setfieldsemptylert(false)}/>
        </>
      )}
    />

      <LoadingComponent visibility={loading}/>

    </View>
  );
}
export default CreateNewAccount;