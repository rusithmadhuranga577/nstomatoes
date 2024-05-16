import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class OrderRate extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            order_rate : this.props.data,
        };
        this.GetLikedState = this.GetLikedState.bind(this);
    }

    GetLikedState(state){
        this.props.GetStates(state);
    }

    LikeFunction( order_rate){
        const ratevalue = order_rate;
        if(ratevalue == 5){
            this.setState({order_rate : 1});
            this.GetLikedState(1);
        }else if(ratevalue == 0 || ratevalue == 1){
            this.setState({order_rate : 5});
            this.GetLikedState(5);
        }
    }

    UnlikeFunction(order_rate){
        const ratevalue = order_rate;
        if(ratevalue == 5){
            this.setState({order_rate : 1});
            this.GetLikedState(1);
        }else if(ratevalue == 0 || ratevalue == 1){
            this.setState({order_rate : 5});
            this.GetLikedState(5);
        }
    }

    render(){
        const order_rate = this.state.order_rate;
        const res_data = this.props.res_data;
        return(
            <View style={[styles.containercard]}>
                <View style={[styles.imageholder]}>
                    <Image source={{uri : res_data.logo}} style={[styles.image]}/>
                </View>
                
                <View style={{width: '68%'}}>
                    <View>
                        <Text numberOfLines={2} style={[styles.restaurantname]}>{res_data.name}</Text>
                        <Text numberOfLines={2} style={[styles.restaurantnamesubline]}>{res_data.address_line_1}</Text>
                    </View>

                    <View style={[styles.orderrateiconbarcontainer]}>
                        <TouchableOpacity onPress={()=>this.LikeFunction(order_rate)} style={[styles.iconcontainer]}>
                            <Icon color={order_rate == 5 ? Colors.primary : Colors.primary} size={30} name={order_rate == 5 ?'thumb-up' : 'thumb-up-outline'} style={[styles.iconstyle]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.UnlikeFunction(order_rate)} style={[styles.iconcontainer]}>
                            <Icon color={order_rate == 0 || order_rate == 1 ? Colors.black : Colors.black} size={30} name={order_rate == 0 || order_rate == 1 ?'thumb-down' : 'thumb-down-outline'} style={[styles.iconstyle]}/>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

export default OrderRate;