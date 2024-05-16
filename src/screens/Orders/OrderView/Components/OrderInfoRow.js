import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, Text, Image, ScrollView } from 'react-native';
import styles from '../styles';

const OrderInfoRow = ({title, value}) => {
    return(
        <View style={[styles.subtextholder]}>
            <Text style={[styles.subtext, {width : '30%'}]} numberOfLines={1}>{title}</Text>
            <Text style={[styles.subtext]}>:</Text>
            <Text style={[styles.subtext, {width : '60%'}]} numberOfLines={1}>{value}</Text>
        </View>
    );
}

export default OrderInfoRow;