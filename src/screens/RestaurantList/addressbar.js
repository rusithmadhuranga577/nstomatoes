/** @format */

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Languages } from '@common';

const AddressBar =() => {

  const navigation = useNavigation();
  const [address, setaddress] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('address', (err, address) => {
      setaddress(address);
    });
  }, [])

  return(
    <TouchableOpacity onPress={()=>navigation.navigate('LocationSettings', {logged : 1, cart : 0})} style={[styles.addressbar]}>
        <View style={{width : '80%'}}>
            <View style={{alignSelf :'center'}}>
                <Text style={[styles.addressbartitle]}>{Languages.DeliveringFood}</Text>
            </View>
            <Text style={[styles.addresstext]} numberOfLines={1}>{address}</Text>
        </View>
    <Icon name={'chevron-back-outline'} size={20} style={{position : 'absolute', left : 15}} onPress={()=>navigation.goBack()}/>
    </TouchableOpacity>
  );
}
export default AddressBar;