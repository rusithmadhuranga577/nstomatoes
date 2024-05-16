import React from 'react';
import { View, Text } from 'react-native';
import { Colors, Languages, Url } from '@common';
import Icon from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import {getPreciseDistance} from 'geolib';
import styles from './styles';
import axios from 'axios';

const QueryString = require('query-string');

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
        setTimeout(() => {
            this.getRestaurantData();
        }, 1500);
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            setTimeout(() => {
                this.getRestaurantData();
            }, 1500);
        });
    }

    getRestaurantData=()=>{
        const id = this.props.res_id;
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : id
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            this.getEstTime(response.data, id);
        }).catch(error => {
            alert(error);
        })
    }

    getEstTime=(data, res_id)=>{
        // 7.482359412862086 80.3581914342395 8.587826361206751 81.21023191139102
        const res_data = data;
        const restaurantid = res_id;
        const m_lat = Number(res_data.map_latitude);
        const m_lan = Number(res_data.map_longitude);
        const u_lat = Number(this.props.ulat);
        const u_lan = Number(this.props.ulan);

        var pdis = getPreciseDistance(
            {latitude: m_lat, longitude: m_lan},
            {latitude: u_lat, longitude: u_lan},
        );
        var distance = pdis/1000
        axios.post(Url.getesttimeurl, 
        QueryString.stringify({
            restuarant_id : restaurantid,
            ordertype : 'delivery',
            km : distance,
            time : res_data.delivery_time
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            const estmin = response.data.est_min;
            this.setState({est_time : Number(estmin)});
            this.setState({est_delivery_time : response.data.est_min_str});
            this.setState({est_arrival_time : response.data.est_time});
        }).catch(error => {
            alert(error);
        })
    }

    render(){ 
        const { navigation } = this.props;
        return(
            <View style={[styles.buttoncontainer]}>
                <View style={{flexDirection : 'row', alignItems : 'center', width : '85%'}}>
                    <View style={{width : 40, height : 40, alignItems : 'center', justifyContent : 'center'}}>
                        <Icon name={'clock'} color={Colors.primary} size={25}/>
                    </View>
                    <View style={{marginLeft : 15}}>
                        <Text style={[styles.buttontitle]}>{Languages.ArrivalTime}</Text>
                        <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{this.state.est_delivery_time}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <EstTimeComponent {...props} navigation={navigation} />;
} 
