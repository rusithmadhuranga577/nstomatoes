/** @format */

import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { Languages } from '@common';
import { Colors, Constants, Url } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage } from "react-native-flash-message";

const QueryString = require('query-string');

const UsernamepasswordLoginModel =() => {

  const navigation = useNavigation();
  
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const [loading, setloading] = useState(false);
  const [passwordvisible, setpasswordvisible] = useState(false);
  const [loginfailederror, setloginfailederror] = useState(false);
  const [nouseralert, setnouseralert] = useState(false);
  const [errormsg, seterrormsg] = useState('');

  useEffect(() => {
  })

  const NewAccountFunction = () => {
    navigation.navigate('CreateNewAccount');
  }

  const showpopup = () => {
    showMessage({
      message: "Login Success !",
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
    console.log(errormsg);
    seterrormsg(errormsg)
  }

  const LoginFunction = () => {
    console.log(Url.loginurl);
    if(email == '' || password == ''){
      alert('Details you entered are incorrect, please check again and retry');
    }else{
      setloading(true);
      axios.post(Url.loginurl, 
      QueryString.stringify({
        email : email,
        password : password
      }), 
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
      }).then(response => {
        console.log(response.data.customer)
        if(response.data.status == 1){
          const d_name = `${response.data.fname} ${response.data.customer.lname+''}`
          AsyncStorage.setItem('email', response.data.customer.email+'');
          AsyncStorage.setItem('userid', response.data.customer.id+'');
          AsyncStorage.setItem('fname', response.data.customer.first_name);
          AsyncStorage.setItem('lname', response.data.customer.last_name);
          AsyncStorage.setItem('deliveryname', d_name+'');
          AsyncStorage.setItem('phonenumber', response.data.customer.phonenumber+'');
          AsyncStorage.setItem('homenumber', response.data.customer.homenumber+'');
          AsyncStorage.setItem('city', response.data.customer.def_city+'');
          AsyncStorage.setItem('userPhoto', response.data.customer.photo+'');
          showpopup();
          setTimeout(() => {
            navigation.replace('UpdateUserInfo');
            setloading(false);
          }, 1500);
        }else if(response.data.status == 2){
          setnouseralert(true);
          setloading(false);
        }else{
          seterrormsg(response.data.error);
          setloading(false);
          setloginfailederror(true);
        }
      })
    }
  }

  return(
    
    <View>
      <LoadingComponent visibility={loading}/>
      <ScrollView style={styles.container}>
      <View style={[styles.container, {alignItems : 'center', justifyContent : 'center'}]}>
        <Text style={[styles.logintitle, {alignSelf : 'flex-start'}]}>{Languages.Login}</Text>

          <Text style={[styles.textinputtitle, {marginTop: 20, marginBottom: 8, alignSelf : 'flex-start'}]}>{Languages.Email}</Text>
          <View style={[styles.textinputviewrow]}>
              <View style={[styles.iconholder]}>
                  <Icon name={'at'} size={25}/>
              </View>
              <TextInput 
                  value={email}
                  placeholder={Languages.Emailplaceholder}
                  onChangeText={text => setemail(text)}
                  style={[styles.input, {fontFamily: Constants.fontFamilynormal, width: '90%'}]}
                  placeholderTextColor={'rgba(0,0,0,0.4)'}
              />
          </View>

          <Text style={[styles.textinputtitle, {marginTop: 20, marginBottom: 8, alignSelf : 'flex-start'}]}>{Languages.Password}</Text>
          <View style={[styles.textinputviewrow]}>
              <View style={[styles.iconholder]}>
                  <Icon name={'lock'} size={25}/>
              </View>
              <TextInput 
                  value={password}
                  secureTextEntry={!passwordvisible}
                  placeholder={Languages.Passwordplaceholder}
                  onChangeText={text => setpassword(text)}
                  style={[styles.input, {fontFamily: Constants.fontFamilynormal, width: '90%'}]}
                  placeholderTextColor={'rgba(0,0,0,0.4)'}
              />
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

        <View style={{marginTop : 20, width : '100%'}}>
          <Button title={Languages.Login} action={LoginFunction}/>
        </View>
          <Text style={[styles.textinputtitle, {marginTop: 10, marginBottom: 10, alignSelf: 'center'}]}>{Languages.Or}</Text>
        <View style={{width : '100%'}}>
          <Button title={Languages.CreateNewAccount} action={NewAccountFunction}/>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')}>
          <Text style={[styles.textinputtitle, {marginTop: 20, alignSelf: 'center'}]}>{Languages.ForgetPassword}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

      {/* Something Went Wrong*/}
      <CustomAlert
        displayMode={'error'}
        displayMsg={errormsg}
        displaymsgtitle={'Error'}
        visibility={loginfailederror}
        dismissAlert={setloginfailederror}
        cancellable={true}
        buttons={(
          <>
            <CustomAlertButton buttontitle={'Ok'} theme={'error'} buttonaction={()=>setloginfailederror(false)}/>
          </>
        )}
      />

      {/* No User Found Alert*/}
      <CustomAlert
        displayMode={'alert'}
        displayMsg={Languages.NoUserFound}
        displaymsgtitle={'Alert'}
        visibility={nouseralert}
        dismissAlert={setnouseralert}
        cancellable={true}
        buttons={(
          <>
            <CustomAlertButton buttontitle={Languages.Retry} theme={'alert'} buttonaction={()=>setnouseralert(false)}/>
            <CustomAlertButton buttontitle={Languages.CreateNewAccount} theme={'inverse'} buttonaction={()=>setnouseralert(false)}/>
          </>
        )}
      />
    </View>
  );
}
export default UsernamepasswordLoginModel;