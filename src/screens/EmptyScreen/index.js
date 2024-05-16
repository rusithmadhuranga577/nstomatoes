import React, { useEffect } from 'react';
import {
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmptyScreen = ({route}) => {

    const {type} = route.params;
    const navigation = useNavigation();

    useEffect(()=>{
        if(type == 'fashion'){
            navigation.replace('FashionItemsCart');
        }else{
            navigation.replace('CartPage');
        }
    },[])

    return(
        <View></View>
    );
}

export default EmptyScreen;