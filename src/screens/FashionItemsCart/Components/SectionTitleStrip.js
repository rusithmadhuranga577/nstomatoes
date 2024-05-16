import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Colors, Languages } from '@common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles';

const SectionTitleStrip = (props) => {
    
    return(
        <View style={[styles.sectiontitlestrip]}>
            <Text style={[styles.sectiontitlestriptext]}>{Languages.CartItems}</Text>
            <TouchableOpacity onPress={props.action} style={{alignSelf : 'center', flexDirection : 'row'}}>
                <Icon name={'trash-alt'} size={18} color={Colors.primary}/>
                <Text style={[styles.clearcarttext]}>{Languages.ClearCart}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SectionTitleStrip;