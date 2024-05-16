import React from 'react';
import {View, Text, Image} from 'react-native';
import { Constants, Colors, Icons, Languages } from '@common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const OrderChargesView = ({cartitemdata}) => {

    const data = cartitemdata;
    const additionalchargename = 'Service Charge';

    return(
        <View style={{margin : 10}}>
            <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargestext]}>{Languages.SubTotal} ({Languages.Rs})</Text>
                    <Text style={[styles.orderchargestext]}>{Number(data.food_amount).toFixed(2)}</Text>
                </View>
                {data.small_order != 0 ? 
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargestext]}>{additionalchargename} ({Languages.Rs})</Text>
                    <Text style={[styles.orderchargestext]}>{Number(data.small_order).toFixed(2)}</Text>
                </View> : null}
                {data.discount != 0 ?
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargespromotiontext]}>{Languages.Promotion} ({Languages.Rs})</Text>
                    <Text style={[styles.orderchargespromotiontext]}>-{Number(data.discount).toFixed(2)}</Text>
                </View> : null}
                {data.ordertype == 'Delivery' ?
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargestext]}>{Languages.DeliveryCharge} ({Languages.Rs})</Text>
                    <Text style={[styles.orderchargestext]}>{Number(data.delivery).toFixed(2)}</Text>
                </View> : null }
                <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 10}}>
                    <Text style={[styles.orderchargestext]}>{Languages.Total}  ({Languages.Rs})</Text>
                    <Text style={[styles.orderchargestext]}>{Number(data.order_total).toFixed(2)}</Text>
            </View>

            <View style={[styles.paymentmodeinfocontainer]}>
                <Text style={[styles.orderchargestext, {fontFamily : Constants.fontFamilynormal}]}>{Languages.PaymentMethod}</Text>
                {data.paymentmode == 'CARD' ? 
                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Image source={Icons.cardpayment} style={{width : 80, height : 20}}></Image>
                </View>
                :
                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Text style={[styles.orderchargestext, {marginRight : 10}]}>Cash</Text>
                    <Icon name={'cash-multiple'} size={25} color={Colors.primary}/>
                </View>}
            </View>
        </View>
    );
}
export default OrderChargesView;