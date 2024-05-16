/** @format */

import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';
import styles from './styles';
import { Languages } from '@common';

const Button =({total, action}) => {

  useEffect(() => {
  
  })

  return(
    <TouchableOpacity onPress={action} style={[styles.buttoncontainer]}>
        <Text style={[styles.title]}>{Languages.AddToCart}  </Text>
        <Text style={[styles.title]}>{Languages.Rs}{total ? Number(total).toFixed(2) : '0.00'}</Text>
    </TouchableOpacity>
  );
}
export default Button;