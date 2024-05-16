import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { Colors, Constants } from '@common'
import styles from './styles';

import OrdersList from '../OrdersList';
import SavedCart from '../SavedCart';
import { View } from 'react-native';

const TabNavigator = () => {

    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarLabelStyle: { fontSize: 12 },
            tabBarItemStyle: [styles.container],
            tabBarLabelStyle: [styles.tabtitle],
            tabBarStyle: [styles.container],
            unmountInactiveRoutes: true,
        })}
        tabBarOptions={{
        labelStyle: [styles.tabtitle],
        indicatorStyle: {
            backgroundColor: Colors.primary,
        },
        }}
        >
          <Tab.Screen name="Orders" component={OrdersList} />
          <Tab.Screen name="Saved Cart" component={SavedCart} />
        </Tab.Navigator>
    );
}

export default TabNavigator;