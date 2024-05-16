/** @format */

import React, { useEffect, useState, useRef } from 'react';
import {
    Animated,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '@common';
import styles from './styles';

const FloatinCartButton = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const animatedValue = useRef(new Animated.Value(1)).current;
    const [show, setshow] = useState(false);

    useEffect(()=>{
        handleAnimation();
        AsyncStorage.multiGet(['cartprice', 'cartqty'], (err, cartdata) =>{
            if(cartdata[0][1] == null && cartdata[1][1] == null){
                setshow(false);
            }else{
                setshow(true);
            }
        });
    }, [isFocused])

    const handleAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1.19, 
                    duration: 200,
                }),
                Animated.timing(animatedValue, {
                    toValue: 1, 
                    duration: 200,
                }),
            ]),
        { iterations: 5 }
        ).start();
    }

    return(
        <>
        {show ?
        <Animated.View style={[styles.buttoncontainer, {transform : [{scale: animatedValue}]}]}>
            <TouchableOpacity onPress={()=>navigation.push('CartPage')} style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}}>
                <Icon name={'cart'} size={25} color={Colors.black}/>
            </TouchableOpacity>
        </Animated.View>:null}
        </>
    );

}

export default FloatinCartButton;