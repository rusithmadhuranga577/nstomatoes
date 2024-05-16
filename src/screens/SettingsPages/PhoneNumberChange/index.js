/** @format */

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Languages, Countries } from '@common';
import { CustomPicker } from 'react-native-custom-picker'
import { Constants } from '@common';
import { Button, CustomAlert, CustomAlertButton, LoadingComponent } from '@components';
import { showMessage } from "react-native-flash-message";

const PhoneNumberChange =() => {

  const navigation = useNavigation();
  const [selectedcountrycode, setseletedcountrycode] = useState('+94');
  const [oldphonenumber, setoldphonenumber] = useState('');
  const [phonenumber, setphonenumber] = useState(oldphonenumber);
  const [deliveryname, setdeliveryname] = useState('');
  const [nonumberalert, setnonumberalert] = useState(false);
  const [loading, setloading] = useState(false);

  const options = [];
  useEffect(() => {
    for (var i=0; i < Countries.length; i++) {
      options.push({'label':Countries[i].flag+' '+Countries[i].label, 'value' : Countries[i].code, 'flag' : Countries[i].flag})
    }
    AsyncStorage.multiGet(['fname', 'lname', 'phonenumber'], (err, user) => {
      const p_number = user[2][1] == null ? "" : user[2][1];
      const f_name = user[0][1];
      const l_name = user[1][1];
      
      if(p_number != "") {
        var p = [];
        for (var i=1; i < p_number.length; i++) {
          p.push(p_number[i])
        }
        if(user[0][1] == null && user[1][1] == null){
          setdeliveryname('');
        }else{
          setdeliveryname(`${f_name} ${l_name}`);
        }
        setphonenumber(p.join(''));
        }
    })
  }, [])

  const PickerContainer = (settings) => {
    const { selectedItem } = settings;
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

  const UpdateFunction = () => {
    setloading(true);
    if(phonenumber == '' || selectedcountrycode == ''){
      setnonumberalert(true);
      setloading(false);
    }else{
      const p_number = selectedcountrycode+phonenumber;
      AsyncStorage.setItem('phonenumber', p_number);
      AsyncStorage.setItem('deliveryname', deliveryname);
      showMessage({
        message: "Successfully Updated !",
        type: "success",
        icon : 'success',
        duration : 2500
      });
      setloading(false);
      navigation.goBack();
    }
  }

  return(
    <View>
      <LoadingComponent visibility={loading}/>
      <ScrollView style={[styles.container, {padding : 10}]}>
        <Text style={[styles.usernametitle]}>{Languages.DeliveryName}</Text>
        <TextInput
          placeholder={Languages.DeliveryNamePlaceholder}
          style={[styles.usernameinput, {fontFamily: Constants.fontFamilynormal}]}
          onChangeText={text => setdeliveryname(text)}
          value={deliveryname}
          placeholderTextColor={'rgba(0,0,0,0.4)'}
        />
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
              onChangeText={number => setphonenumber(number)}
              keyboardType = {'phone-pad'}
              value={phonenumber}
              placeholderTextColor={'rgba(0,0,0,0.4)'}
            />
          </View>
        </View>

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

        <View style={{marginTop : 40}}>
          <Button action={UpdateFunction} title={Languages.Update}/>
        </View>
      </ScrollView>
    </View>
  );
}
export default PhoneNumberChange;