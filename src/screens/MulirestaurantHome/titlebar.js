/** @format */

import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages, Colors } from '@common';
import Icon from 'react-native-vector-icons/Ionicons';

const TitleBar =({title, page}) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selfpickupuer, setselfpickupuer] = useState(false);
  const [name, setname] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('fname', (err, fname) => {
        setname(fname);
    })
  }, [isFocused])

  return(
    // <TouchableOpacity onPress={()=>navigation.navigate(page, {logged : 1})} style={[styles.titlebar]}>
    <TouchableOpacity activeOpacity={0.8} style={[styles.titlebar]}>
        <Text style={[styles.titlebartext]}>{title}</Text>
        <Icon name={'arrow-forward-outline'} size={25} color={Colors.white}/>
    </TouchableOpacity>
  );
}
export default TitleBar;