import React from 'react';
import { View, Text, Image } from 'react-native';
import { Languages, Icons, Colors } from '@common';
import styles from '../styles';

const PaymentInfo = ({type, title, value}) => {
    return(
        <View style={[styles.row, {marginTop : 10, backgroundColor : Colors.gray, padding : 5}]}>
            <Image source={type == 'COD' ? Icons.cashpayment : Icons.cardpayment} style={{height : 30, width : 60}}/>
            <Text style={[styles.orderchargeinfotext, {width : '50%', textAlign : 'right'}]} numberOfLines={1}>{type == 'COD' ? Languages.CashPayment : Languages.CardPayment}</Text>
        </View>
    );
}

export default PaymentInfo;