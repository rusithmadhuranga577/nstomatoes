import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    AppState,
    Text,
    Linking,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart';
import { Languages, Colors} from '@common';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import styles from './styles';

class LocationPermissionContainer extends React.Component {

    state = {
        permissiondenied : false,
        appState: AppState.currentState
    };

    componentDidMount(){
        this.initFunction();
    }

    initFunction = () => {
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
            console.log('Check ',result)
            if(result == 'blocked'){
                this.setState({permissiondenied : true});
            } else {
                this.setState({permissiondenied : false});
            }
        });
        this.checkAppState();
    }

    checkAppState = () => {
        this.appStateSubscription = AppState.addEventListener("change",
            nextAppState => {
                if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
                    this.initFunction();
                    // RNRestart.Restart();
                }
                this.setState({ appState: nextAppState });
            }
        );
    }

    componentWillUnmount() {
        this.appStateSubscription.remove();
    }

    render(){
        return(
            <>
            {this.state.permissiondenied ? 
            <TouchableOpacity activeOpacity={0.6} style={[styles.container]}  onPress={()=>Linking.openURL('app-settings:')}>
                <View style={[styles.textcontainer]}>
                    <Text style={[styles.heythere]}>{Languages.LocationPermissionDenied}</Text>
                    <Text style={[styles.loginor]}>{Languages.CannotGetYourLocation}</Text>
                </View>
                <Icon name={'location'} size={35} color={Colors.white}/>
            </TouchableOpacity>
            : null}
            </>
        )
    }
}
export default LocationPermissionContainer;