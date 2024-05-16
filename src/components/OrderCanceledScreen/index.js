import React from 'react';
import {View, Image} from 'react-native';
import { Languages, Images, Text } from '@common';
import { useNavigation } from '@react-navigation/native';
import { CustomAlertButton, CustomAlert } from '@components';
import styles from './styles';

class OrderCanceledScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cartitems : [],
            removeitemalert : false,
            clickeditemid : 0,
            clearcartalert : false
        };
    }

    render(){
        return(
            <View style={[styles.container]}>
                <Text style={[styles.title]}>{Languages.OrderCanceled}</Text>
                <Image source={Images.ordercanceled} style={[styles.image]}/>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <OrderCanceledScreen {...props} navigation={navigation} />;
} 