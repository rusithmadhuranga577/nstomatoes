/** @format */

import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Images, Languages, Countries } from '@common';
import { CustomPicker } from 'react-native-custom-picker'
import { Constants, Url } from '@common';
import { Button, CustomAlert, CustomAlertButton, LoadingComponent } from '@components';
import { showMessage } from "react-native-flash-message";

const QueryString = require('query-string');

const PhoneInput =() => {

  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [selectedcountrycode, setseletedcountrycode] = useState('+94');
  const [phonenumber, setphonenumber] = useState('');
  const [nonumberalert, setnonumberalert] = useState(false);
  const [alreadysentalert, setalreadysentalert] = useState(false);
  const [alertmessage, setalertmessage] = useState('');

  const options = [];
  useEffect(() => {
    for (var i=0; i < Countries.length; i++) {
      options.push({'label':Countries[i].flag+' '+Countries[i].label, 'value' : Countries[i].code, 'flag' : Countries[i].flag})
    }
  })

  const PickerContainer = (settings) => {
    const { selectedItem, defaultText, getLabel, clear } = settings;
    return(
      <View style={[styles.pickercontainer]}>
        <Text style={{fontSize: 20}}>{selectedcountrycode == '+94' ? '🇱🇰' : selectedItem.flag}</Text>
      </View>
    );
  }

  const PickerOption = (settings) => {
    const { item, getLabel } = settings;
    return(
      <View style={[styles.pickeroptioncontainer]}>
        <Text style={{fontSize: 18}}>{getLabel(item)}</Text>
        <Text style={{fontSize: 18}}>{item.value}</Text>
      </View>
    );
  }

  const RegisterFunction = () => {
    if(phonenumber == '' || selectedcountrycode == ''){
      setnonumberalert(true)
    }else{
      if(phonenumber.length >= 9){
        setloading(true);
        const p_number = selectedcountrycode+phonenumber;
        axios.post(Url.phonenumberauthurl, 
        QueryString.stringify({
          mobilenumber : p_number,
        }), 
        {headers: {"Content-Type": "application/x-www-form-urlencoded",}})
        .then(response => {
          console.log(response.data)
          if(response.data.status == 1){
            showMessage({
              message: response.data.message,
              type: "success",
              icon : 'success',
              duration : 2500
            });
            setTimeout(() => {
              setloading(false);
              navigation.replace('VerifyOtp', {phoneno : p_number});
            }, 1500);
          }else if(response.data.status == 2){
            setloading(false);
            setalertmessage(response.data.message);
            setalreadysentalert(true);
          }
        })
      }else{
        showMessage({
          message: 'Invalid phone number',
          type: "danger",
          icon : 'danger',
          duration : 2500
        });
      }
    }
  }

  return(
    <View>
      <LoadingComponent visibility={loading}/>
      <View style={[styles.container, {padding: 10, paddingTop : 130}]}>
        <Text style={[styles.phonenumbertitle]}>{Languages.EnterPhoneNumber}</Text>
        <View style={[styles.componentrow]}>
          <CustomPicker
            options={options}
            getLabel={item => item.label}
            optionTemplate={PickerOption}
            fieldTemplate={PickerContainer}
            onValueChange={value => {
              setseletedcountrycode(value.value);
              console.log(value)
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.countrycodeholder]}>
              <Text style={{fontFamily: Constants.fontFamilynormal}}>{selectedcountrycode}</Text>
            </View>
            <TextInput
              placeholder={Languages.PhonenumberInputPlaeholder}
              style={[styles.input, {fontFamily: Constants.fontFamilynormal}]}
              onChangeText={setphonenumber}
              value={phonenumber}
              keyboardType={'phone-pad'}
              placeholderTextColor={'rgba(0,0,0,0.4)'}
            />
          </View>
        </View>

        <Image source={Images.Logo} style={[styles.phoneinputlogoimage]}/>
        {/* No phone number alert */}

        <CustomAlert
          displayMode={'error'}
          displayMsg={Languages.NonumberAlert}
          displaymsgtitle={'Error'}
          visibility={nonumberalert}
          dismissAlert={setnonumberalert}
          cancellable={false}
          buttons={(
            <>
              <CustomAlertButton buttontitle={'Ok'} theme={'error'} buttonaction={()=>setnonumberalert(false)}/>
            </>
          )}
        >
        </CustomAlert>

        {/* Already sent alert */}
        
        <CustomAlert
          displayMode={'alert'}
          displayMsg={alertmessage}
          displaymsgtitle={'Alert'}
          visibility={alreadysentalert}
          dismissAlert={setalreadysentalert}
          cancellable={false}
          buttons={(
            <>
              <CustomAlertButton buttontitle={Languages.Ok} theme={'alert'} buttonaction={()=>setalreadysentalert(false)}/>
            </>
          )}
        >
        </CustomAlert>

        <View style={{marginTop : 20}}>
          <Button action={RegisterFunction} title={Languages.RegisterButtonTitle}/>
        </View>
      </View>
    </View>
  );
}
export default PhoneInput;