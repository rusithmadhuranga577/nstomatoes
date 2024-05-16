import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Languages } from '@common';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

const PromotionButton = ({type}) => {

    const navigation = useNavigation();
    const [promoavailable, setpromoavailable] = useState(false);

    useEffect(()=>{
        AsyncStorage.getItem('appliedpromo', (err, promo)=>{
            if(promo !== null){
                setpromoavailable(true);
            }else{
                setpromoavailable(false);
            }
        })
    },[])

    return(
        <TouchableOpacity style={[styles.promobuttoncontainer]} onPress={()=>navigation.replace('Promotion', {type : type})}>
            <View style={{width : '80%', flexDirection : 'row', alignItems : 'center'}}>
                <Icon name={'pricetag'} size={25}/>
                {promoavailable ? 
                    <Text style={[styles.promobuttontitle]}>{Languages.ClickToChangePromoCode}</Text> : 
                    <Text style={[styles.promobuttontitle]}>{Languages.ClickToAddPromoCode}</Text>
                }
            </View>
            <Icon name={'arrow-forward'} size={25}/>
        </TouchableOpacity>
    );
}

export default PromotionButton;