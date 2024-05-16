import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class DriverRate extends React.Component{

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
        const driver_info = this.props.driver_info;
        return(
            <View style={[styles.containercard, {justifyContent : 'space-between', marginTop : 10}]}>
                <View style={[styles.imagecontainer]}>
                    <Image style={[styles.image]} source={{uri : driver_info.profile_pic}}/>
                </View>
                <View style={{marginLeft : 20, justifyContent : 'center', alignItems : 'center'}}>
                    <View>
                        <Text numberOfLines={2} style={[styles.restaurantname]}>{driver_info.displayname}</Text>
                        <Text numberOfLines={2} style={[styles.restaurantnamesubline, {alignSelf : 'center'}]}>{driver_info.bike_no}</Text>
                    </View>

                    <View style={[styles.orderrateiconbarcontainer]}>
                        <TouchableOpacity onPress={()=>this.LikeFunction(order_rate)} style={[styles.iconcontainer]}>
                            <Icon color={order_rate == 5 ? Colors.primary : Colors.primary} size={23} name={order_rate == 5 ?'thumb-up' : 'thumb-up-outline'} style={[styles.iconstyle]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.UnlikeFunction(order_rate)} style={[styles.iconcontainer]}>
                            <Icon color={order_rate == 0 || order_rate == 1 ? Colors.black : Colors.black} size={23} name={order_rate == 0 || order_rate == 1 ?'thumb-down' : 'thumb-down-outline'} style={[styles.iconstyle]}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default DriverRate;