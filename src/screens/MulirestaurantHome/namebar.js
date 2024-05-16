/** @format */

import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  Linking,
  Text,
  Animated,
  View,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import NotifService from '../../notificationservice/Service';
import { Images, Languages, Icons, Url } from '@common';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const NameBar = ({appsettings}) => {

  const navigation = useNavigation();
  const name_in = useRef(new Animated.Value(-400)).current;
  const phone_in = useRef(new Animated.Value(200)).current;
  const isFocused = useIsFocused();
  const [name, setname] = useState('');
  const [userid, setuserid] = useState('');
  const [greetingtext, setgreetingtext] = useState('Hi');
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      Animated.timing(
        name_in,
        {
          toValue: 0,
          duration: 600,
        }
      ).start();
      Animated.timing(
        phone_in,
        {
          toValue: 0,
          duration: 600,
        }
      ).start();
    }, 1000);
    AsyncStorage.multiGet(['fname', 'userid'], (err, data) => {
      setname(data[0][1]);
      setuserid(data[1][1]);
    });
    getGreetingTime();
    setloading(false);
  }, [isFocused])

  const getGreetingTime = () => {
    var today = new Date()
    var curHr = today.getHours()
    var currentHour = moment(curHr, "H").format("HH");

    if (currentHour < 12) {
      setgreetingtext(Languages.GoodMorning)
    } else if (curHr < 18) {
      setgreetingtext(Languages.GoodAfternoon)
    } else {
      setgreetingtext(Languages.GoodEvening)
    }
  }

  return(
    <View style={[styles.namebar, {marginTop : userid == '0' ? 0 : 60}]}>
        {userid == '0' ? null :
          <>
            <Animated.View  style={[ styles.namestrip, {transform: [{translateX: name_in}]}]}>
                <Text style={[styles.nametitle]} numberOfLines={1}>{greetingtext}, {name}</Text>
                <Text style={[styles.namesubtitle, {marginTop : 3}]}>{Languages.WhatDoYouWantToFind}</Text>
            </Animated.View>
            <Animated.View style={{ transform: [{translateX: phone_in}] }}>
              <TouchableOpacity onPress={()=>Linking.openURL(`tel:${appsettings.main_hotline}`)}>
                {loading ? null : 
                  <Image source={Icons.oldphone} style={{width : 40, height : 40}}/>
                }
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={()=>navigation.push('SearchPage', {title : Languages.Search})}>
                <Icon name={'search'} size={20}/>
              </TouchableOpacity> */}
            </Animated.View>
          </>
        }
    </View>
  );
}
export default NameBar;