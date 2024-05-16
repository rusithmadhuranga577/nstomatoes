import React from 'react';
import {View, Text} from 'react-native';
import { Languages } from '@common';
import styles from './styles';

class OrderStatusText extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    render(){
        let status = this.props.status;
        return(
            <View style={[styles.orderstatustextcontainer]}>
                <Text numberOfLines={1} style={[styles.orderstatustext]}>
                    { 
                    status == 0 ? Languages.OrderPending : null ||   
                    status == 1 ? Languages.OrderConfirmed : null || 
                    status == 3 ? Languages.OrderPrepared : null || 
                    status == 6 ? Languages.OrderDelivered : Languages.UndefinedOrderStatus
                    }
                </Text>
            </View>
        );
    }
}

export default OrderStatusText;