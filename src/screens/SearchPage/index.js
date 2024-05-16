import React, { useState } from 'react';
import {View} from 'react-native';
import styles from './styles';

const TabNavigator = () => {

    const [searchtext, setsearchtext] = useState('');

    return (
        <View style={[styles.container]}>
        </View>
    );
}

export default TabNavigator;