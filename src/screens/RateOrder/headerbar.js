import { View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { Languages } from '@common';
import styles from './styles';

const HeaderBar=(props)=>{
    return(
        <View style={[styles.headerbar]}>
            <Text style={[styles.headertitle]}>{Languages.RateOrder} #{props.orderid}</Text>
            <TouchableOpacity onPress={()=>props.action()} style={[styles.canceltextholder]}>
                <Text style={[styles.canceltext]}>{Languages.Cancel}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HeaderBar;