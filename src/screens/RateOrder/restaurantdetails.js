import { View, Text, Image } from 'react-native';
import React from 'react';
import styles from './styles';

function TopContent({data}){

    return(
        <View style={[styles.restaurantdetailsbar]}>
            <View style={[styles.imageholder]}>
                <Image source={{uri : data.logo}} style={[styles.image]}/>
            </View>
            <View>
                <Text numberOfLines={1} style={[styles.restaurantname]}>{data.name}</Text>
                <Text numberOfLines={3} style={[styles.restaurantnamesubline]}>{data.address_line_1}, {data.address_line_2}</Text>
            </View>
        </View>
    );
}

export default TopContent;