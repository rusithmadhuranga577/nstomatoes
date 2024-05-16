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
import { Languages, Colors, Url } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { showMessage } from "react-native-flash-message";

const QueryString = require('query-string');

const CreateNewAccount =() => {

  const navigation = useNavigation();
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [city, setcity] = useState('');

  const [cities, setcities] = useState([]);
  const [loading, setloading] = useState(false);
  const [passwordvisible, setpasswordvisible] = useState(false);
  const [fieldsemptylert, setfieldsemptylert] = useState(false);
  const [erroralert, seterroralert] = useState(false);
  const [errormsg, seterrormsg] = useState('');
  
  const [lat, setlat] = useState(0);
  const [lan, setlan] = useState(0);

  useEffect(() => {
    AsyncStorage.multiGet(['latitude', 'longitude'], (err, userinfo) => {
      setlat(userinfo[0][1]);
      setlan(userinfo[1][1]);
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
    setcities(cities);
  }

  const RegisterFunction = () => {
    if(email == '' || password == '' || fname == '' || phone == '' ){
      setfieldsemptylert(true);
    }else{
      if(password == confirmpassword){
        setloading(true);
        axios.post(Url.createnewuserurl, 
        QueryString.stringify({
          authmode : 'Email_Auth',
          fname : fname,
          lname : lname,
          phonenumber : phone,
          email : email,
          password : password,
          password_confirmation : confirmpassword,
          city : city,
          lat : lat,
          lon : lan
        }), 
        {
          headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
          console.log()
          if(response.data.status == 1){
            var id = response.data.loginid;
            setloading(false);
            const d_name = `${fname} ${lname}`;
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('userid', response.data.customer.id + '');
            AsyncStorage.setItem('fname', fname);
            AsyncStorage.setItem('lname', lname);
            AsyncStorage.setItem('deliveryname', d_name);
            AsyncStorage.setItem('phonenumber', phone);
            AsyncStorage.setItem('createaccountstep', 2+'');
            AsyncStorage.setItem('logged', 1+'');
            showpopup();
            navigation.replace('Splash');
          }else if(response.data.status == 404){
            ErrorMsgFunction(response.data.error)
            setloading(false);
            seterroralert(true);
          }else{
            setloading(false);
            seterroralert(true);
          }
        })
      }else{
        showMessage({
          message: "Passwords does not match",
          type: "danger",
          icon : 'danger',
          duration : 2500
        });
      }
    }
  }

  const showpopup = () => {
    showMessage({
      message: "User Account Created",
      type: "success",
      icon : 'success',
      duration : 2500
    });
  }

  const ErrorMsgFunction = (msg) => {
    var errormsg = '';

    if(msg.email){
      errormsg = msg.email[0];
    }if(msg.email && msg.password){
      errormsg = '* '+msg.email[0]+`\n`+'* '+msg.password[0];
    }if(msg.password){
      errormsg = msg.password[0];
    }
    seterrormsg(errormsg)
  }

  return(
    <View>
      <LoadingComponent visibility={loading}/>
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
                onChangeText={input => setphone(input)}
                style={[styles.input]}
                keyboardType = {'numeric'}
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

          <View style={{marginBottom: 15}}>
          <Text style={[styles.placeholdertitle]}>{Languages.Password}</Text>
            <View style={[styles.inputcontainer]}>
            <View style={[styles.iconholder]}>
              <Icon name={'lock'} size={20}/>
            </View>
            <TextInput 
                value={password}
                secureTextEntry={!passwordvisible}
                onChangeText={input => setpassword(input)}
                style={[styles.input]}
                placeholderTextColor={'rgba(0,0,0,0.4)'}
            />
            </View>
          </View>

          <View style={{marginBottom: 5}}>
          <Text style={[styles.placeholdertitle]}>{Languages.ConfirmPassword}</Text>
            <View style={[styles.inputcontainer]}>
            <View style={[styles.iconholder]}>
              <Icon name={'lock'} size={20}/>
            </View>
            <TextInput 
                value={confirmpassword}
                secureTextEntry={!passwordvisible}
                onChangeText={input => setconfirmpassword(input)}
                style={[styles.input]}
                placeholderTextColor={'rgba(0,0,0,0.4)'}
            />
            </View>
          </View>

          <View style={[styles.checkboxcontainer]}>
            <CheckBox
              disabled={false}
              value={passwordvisible}
              tintColors={{ true: Colors.primary, false: 'black' }}
              onValueChange={(newValue) => setpasswordvisible(newValue)}
            />
            <Text style={[styles.checkboxcontainertext]}>{Languages.ShowHidePassword}</Text>
          </View>

          {/* <Text style={[styles.placeholdertitle]}>{Languages.City}</Text>
          <CustomPicker
            placeholder={'Select Your City'}
            defaultValue={'Select Your City'}
            options={cities}
            fieldTemplate={PickerContainer}
            getLabel={item => item.label}
            maxHeight={'70%'}
            modalAnimationType={'slide'}
            onValueChange={(item) => (SetCityFunction(item))}
          /> */}
          
          <View style={{marginTop: 20, marginBottom: 20}}>
            <Button title={Languages.Update} action={RegisterFunction}/>
          </View>

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

          <CustomAlert
            displayMode={'error'}
            displayMsg={errormsg}
            displaymsgtitle={Languages.Error}
            visibility={erroralert}
            dismissAlert={seterroralert}
            cancellable={true}
            buttons={(
              <>
                <CustomAlertButton buttontitle={Languages.Retry} theme={'alert'} buttonaction={()=>seterroralert(false)}/>
              </>
            )}
          />
        </ScrollView>
    </View>
  );
}
export default CreateNewAccount;