import React from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import PropTypes from 'prop-types';
import { Store, Colors, Icons, Url } from '@common';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';

const QueryString = require('query-string');

class UserLocationMapView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            origin : [],
            time : {hours : 0, minutes : 0},
            res_data : [],
            res_lat : 0,
            res_lan : 0,
            distance : 0
        };
        this.getTime = this.getTime.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.getTime();
        }, 3000);
        this.getRestaurantData();
    }

    getRestaurantData = () => {
        AsyncStorage.getItem('cartrestaurantid', (err, id) => {
            axios.post(Url.getrestaurantdetailsurl, 
            QueryString.stringify({
                restaurant_id : id,
            }), 
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded",}
            }).then(response => {
                const res_data = response.data;
                this.setState({res_data : res_data});
                this.setState({res_lat: Number(res_data.map_latitude)})
                this.setState({res_lan: Number(res_data.map_longitude)})
            });
        });
    }

    getTime(){
        this.props.getTime(this.state.time);
    }

    render(){
        let { latitude } = this.props;
        let { longitude } = this.props;
        const res_data = this.state.res_data;
        return(
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={{height: 150, zIndex: 1, bottom: 0, width: '100%'}}
                region={{
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                    latitudeDelta: 0.010,
                    longitudeDelta: 0.015,
                }}>
                <Marker
                    coordinate={{
                        latitude: Number(latitude),
                        longitude: Number(longitude),
                    }}
                    title={'Your order will be delivered here'}
                >
                    <Image source={Icons.userlocationmapicon} style={{width : 30, height : 30}}/>
                </Marker>
                <Marker
                    coordinate={{
                        latitude: this.state.res_lat,
                        longitude: this.state.res_lan,
                    }}
                    title={'Merchant'}
                >
                    <Image source={Icons.merchantlocationmapicon} style={{width : 30, height : 30}}/>
                </Marker>
    
                <MapViewDirections
                    origin={{ latitude: Number(latitude), longitude : Number(longitude) }}
                    strokeColor={Colors.black}
                    optimizeWaypoints={true}
                    destination={{latitude: Number(this.state.res_lat), longitude: Number(this.state.res_lan)}}
                    apikey={Store.mapsapi}
                    strokeWidth={3}
                    onReady={result => {
                        var mins = result.duration;
                        let hours = Math.floor(mins / 60);
                        let minutes = mins % 60;
                        minutes = minutes < 10 ? '0' + minutes : minutes;
    
                        this.state.time = { hours: parseInt(hours),  minutes : parseInt(mins) };
                        this.props.getDistance(result.distance);
                        console.log(`DISTANCE :::::::: ${result.distance}`);
                        this.setState({distance : result.distance});
                    }}
                    onError={(errorMessage) => {
                        console.log(errorMessage);
                        // this.props.getDistance(100);
                    }}
                />
          </MapView>
        );
    };
}

UserLocationMapView.propTypes = {
    getTime: PropTypes.func,
};

export default UserLocationMapView;