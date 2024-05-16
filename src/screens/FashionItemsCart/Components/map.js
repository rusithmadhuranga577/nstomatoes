import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import PropTypes from 'prop-types';
import { Store, Colors, Icons } from '@common';
import MapViewDirections from 'react-native-maps-directions';
import { Image } from 'react-native';

class UserLocationMapView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            origin : { latitude: Store.merchantlat, longitude : Store.merchantlan },
            time : {hours : 0, minutes : 0}
        };
        this.getTime = this.getTime.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.getTime();
        }, 3000);
    }

    getTime(){
        this.props.getTime(this.state.time);
    }

    render(){
        let { latitude } = this.props;
        let { longitude } = this.props;
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
                    title={'marker.title'}
                >
                    <Image source={Icons.userlocationmapicon} style={{width : 30, height : 30}}/>
                </Marker>
                <Marker
                    coordinate={{
                        latitude: Store.merchantlat,
                        longitude: Store.merchantlan,
                    }}
                    title={'marker.title'}
                >
                    <Image source={Icons.merchantlocationmapicon} style={{width : 30, height : 30}}/>
                </Marker>
    
                <MapViewDirections
                    origin={this.state.origin}
                    strokeColor={Colors.black}
                    optimizeWaypoints={true}
                    destination={{latitude: Number(latitude), longitude: Number(longitude)}}
                    apikey={Store.mapsapi}
                    strokeWidth={3}
                    onReady={result => {
                        var mins = result.duration;
                        let hours = Math.floor(mins / 60);
                        let minutes = mins % 60;
                        minutes = minutes < 10 ? '0' + minutes : minutes;
    
                        this.state.time = { hours: parseInt(hours),  minutes : parseInt(mins) };
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