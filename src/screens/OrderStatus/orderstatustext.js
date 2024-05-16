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
        let type = this.props.type;
        return(
            <View style={[styles.orderstatustextcontainer]}>
                <Text numberOfLines={1} style={[styles.orderstatustext]}>
                    { 
                        status == 0 ? Languages.OrderPending : null ||   
                        status == 1 ? Languages.OrderConfirmed : null || 
                        status == 2 ? Languages.OrderPreparing : null || 
                        status == 3 ? Languages.OrderPrepared : null || 
                        status == 4 ? Languages.OrderPickedByDriver : null || 
                        status == 5 ? Languages.OrderPrepared : null || 
                        status == 6 ? (type == 'Delivery' ? Languages.OrderDelivered : Languages.Collected) : Languages.UndefinedOrderStatus
                    }
                </Text>
            </View>
        );
    }
}

export default OrderStatusText;