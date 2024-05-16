/** @format */

import React, { useEffect } from 'react';
import { connect } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Images, Languages } from '@common';


const Button =({title, action}) => {

  useEffect(() => {
  
  })

  return(
    <TouchableOpacity onPress={action} style={[styles.buttoncontainer]}>
        <Text style={[styles.title]}>{title}</Text>
    </TouchableOpacity>
  );
}
export default Button;