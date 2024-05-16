import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, Text, Image, ScrollView } from 'react-native';
import { Store, Languages, Images } from '@common';
import styles from '../styles';

const OrderChargeInfoRow = ({title, value}) => {
    return(
        <View style={[styles.orderchargeinforow]}>
            <Text style={[styles.orderchargeinfotext, {width : '50%', color : title == 'Promotion' ? 'red' : 'black'}]} numberOfLines={1}>{title}</Text>
            <Text style={[styles.orderchargeinfotext, {width : '50%', textAlign : 'right', color : title == 'Promotion' ? 'red' : 'black'}]} numberOfLines={1}>{title == 'Promotion' ? '-' : ''}{value}</Text>
        </View>
    );
}

export default OrderChargeInfoRow;