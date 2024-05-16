import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { Colors, Languages } from "@common";

const DeliveryInfoButton = ({icon, title, subtext, page, arrow, sheduleaction, time, date, selected_shedule_type}) => {
    
    const navigation = useNavigation();
    const navtopage = () => {
        if(page == 'LocationSettings'){
            navigation.push('LocationSettings', {logged : 1})
        }else if(page == 'PhoneNumberChange'){
            navigation.push('PhoneNumberChange')
        }
    }

    return(
        <TouchableOpacity onPress={page == 'Schedule' ? sheduleaction : navtopage} style={[styles.buttoncontainer]}>
            <View style={{flexDirection : 'row', alignItems : 'center', width : '85%'}}>
                <View style={{width : 40, height : 40, alignItems : 'center', justifyContent : 'center'}}>
                    <Icon name={icon} color={Colors.primary} size={25}/>
                </View>
                <View style={{marginLeft : 15}}>
                    <Text style={[styles.buttontitle]}>{title}</Text>
                    {selected_shedule_type == 0 ? 
                    <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{Languages.Now}</Text>
                    :
                    <>
                    {date != '' && time != '' ?
                    <View>
                        <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{Languages.Date} : {date}</Text>
                        <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{Languages.Time} : {time}</Text>
                    </View>
                    :
                    <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{subtext}</Text>}
                    </>}
                </View>
            </View>
            {arrow == false ? null : <Icon name={'arrow-right'} size={15}/>}
        </TouchableOpacity>
    );
}

export default DeliveryInfoButton;;