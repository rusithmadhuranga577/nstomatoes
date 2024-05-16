/** @format */

import React from 'react';
import {
  View,
} from 'react-native';
import styles from './styles';
import { Colors } from '@common';
import {
  BarIndicator,
} from 'react-native-indicators';

export default function LoadingComponent({
    visibility,
  }) {
    return (
      <>
        {visibility ? 
            <View style={[styles.overlay]} >
                <View style={[styles.indicatorholsder]}>
                  <BarIndicator count={3} color={Colors.loader} size={50}/>
                </View>
            </View>:null
        }
      </>
    );
}