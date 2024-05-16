import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Linking,
    Platform
} from 'react-native';
import { Colors, Constants, Store } from '@common';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('screen').width;

const UpdateAppButton = ({appsettings}) => {

    onPress = () => {
        if(Platform.OS === 'ios') {
            Linking.canOpenURL(appsettings.ios_app_link).then(supported => {
                supported && Linking.openURL(appsettings.ios_app_link);
            }, (err) => console.log(err));
        } else {
            Linking.canOpenURL(appsettings.android_app_link).then(supported => {
                supported && Linking.openURL(appsettings.android_app_link);
            }, (err) => console.log(err));
        }
    }

    return(
        <TouchableOpacity
            onPress={()=> {onPress()}}
        >
            <View style={styles.container}>
                <View style={styles.btncontainer}>
                    <Icon 
                        name={'download'} 
                        size={30} 
                        color={Colors.black} 
                        style={{marginBottom : 2}}
                    />
                    <View style={{marginLeft: 30}}>
                        <Text style={styles.title}>
                            UPGRADE YOUR EXPERIENCE
                        </Text>
                        <Text style={styles.subtitle}>
                            Tap here to get the latest version of this app
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    btncontainer: {
        width: screenWidth/1.05,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.alertyellow,
        elevation: 4
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.black
    }
});

export default UpdateAppButton;