import React from 'react';
import {View, Text} from 'react-native';
import { Languages } from '@common';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

class EstTimeComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            u_lat : 0,
            u_lan : 0,
            est_time : 0,
            est_delivery_time : '',
            est_arrival_time : ''
        };
    }

    componentDidMount(){
        const orderid = this.props.orderid;
        const subscriber = firestore()
        .collection('orders')
            .doc(orderid.toString())
            .onSnapshot(documentSnapshot => {
                if(documentSnapshot.data()){
                    console.log('firestore data',documentSnapshot.data().est_min_str);
                    this.setState({est_delivery_time : documentSnapshot.data().est_min_str});
                    this.setState({est_arrival_time : documentSnapshot.data().estimated_time});
                }
        }); 
        return () => subscriber();
    }

    render(){ 
        return(
            <View>
               <View style={[styles.est_timerowstyle]}>
                    <Text style={[styles.time]}>{this.state.est_delivery_time}</Text>
                    <Text style={[styles.est_arrivaltext]}>{this.props.ordertype == 'Delivery' ? Languages.EstTime : Languages.EstPreparingTime}</Text>
                </View>
                <Text style={[styles.est_arrivaltext2]}>{Languages.EstimatedDeliveryTime} : {this.state.est_arrival_time}</Text>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <EstTimeComponent {...props} navigation={navigation} />;
} 
