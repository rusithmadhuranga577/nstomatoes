/** @format */

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { Languages, Url } from '@common';
import { LogoutPopup, LoadingComponent } from '@components';
import RNRestart from 'react-native-restart';
import Button from './button';

const Account =() => {

  const navigation = useNavigation();
  const [appsettings, setappsettings] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setloading] = useState(false);
  const [showlogoutpopup, setshowlogoutpopup] = useState(false);

  const [profilepic, setprofilepic] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [id, setid] = useState('');

  useEffect(() => {
    setloading(true)
    AsyncStorage.multiGet(['userPhoto', 'fname', 'lname', 'email', 'userid'], (err, user)=>{
      setprofilepic(user[0][1]);
      setfname(user[1][1]);
      setlname(user[2][1]);
      setemail(user[3][1])
      setid(user[4][1]);
    });
    fetch(Url.getappsettings)
    .then((response) => response.json())
    .then((data) => setappsettings(data[0]))
    .catch((error) => console.error(error))
    .finally(() => setloading(false));
  }, [isFocused]);

  const LogoutFunction = () => {
    setshowlogoutpopup(false);
    AsyncStorage.clear();
    RNRestart.Restart();
  }

  loginButtonPress=()=>{
    AsyncStorage.clear();
    navigation.replace('LoginMethods')
  }

  return(
    <View style={[styles.container]}>
    <LoadingComponent visibility={loading}/>
    <View style={[styles.container]}>
      <Text style={[styles.pagetitle]}>{Languages.Account}</Text>
      <View style={styles.topcard}>
      </View>
      <View style={[styles.floatingcard]}>
        <View style={styles.imageholder}>
          <Image source={{uri : profilepic}} style={styles.image}/>
        </View>
        <Text style={[styles.name]}>{fname} {lname}</Text>
        <Text style={[styles.email]}>{email}</Text>
        {id == '0' ?  
          <TouchableOpacity onPress={()=>loginButtonPress()} style={[styles.loginbutton]}>
            <Text style={[styles.loginbuttontitle]}>{Languages.Login}</Text>
          </TouchableOpacity> : null
        }
        <ScrollView>
          {id == '0' ?  null :
            <>
              <Button icon={'person-circle-outline'} title={Languages.MyProfile} screen={'UpdateUserInfo'} navigation={navigation}/>
              <Button icon={'map-outline'} title={Languages.Address} screen={'LocationSettings'} navigation={navigation}/>
              <Button icon={'list-circle-outline'} title={Languages.Orders} screen={'OrdersPage'} navigation={navigation}/>
            </>
          }
          <Button icon={'star-outline'} title={Languages.RateUs} screen={'RateUs'} navigation={navigation} url={appsettings.rate_link}/>
          <Button icon={'shield-checkmark-outline'} title={Languages.PrivacyPolicy} screen={'PrivacyPolicy'} navigation={navigation} url={appsettings.privacy_policy}/>
          <Button icon={'information-circle-outline'} title={Languages.AboutUs} screen={'AboutUs'} navigation={navigation} url={appsettings.about_us_link}/>
          {id == '0' ?  null :
            <Button icon={'log-out-outline'} title={Languages.LogOut} screen={'Logout'} navigation={navigation} logoutstate={(state)=>setshowlogoutpopup(state)}/>
          }
        </ScrollView>
      </View>
    </View>
    {showlogoutpopup ?
      <View style={{width : '100%', height : '100%', position : 'absolute'}}>
        <LogoutPopup Logout={LogoutFunction} CancelLogout={()=>setshowlogoutpopup(false)} visibility={showlogoutpopup}/>
      </View>:null}
    </View>
  );
}
export default Account;