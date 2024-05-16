import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, AsyncStorage, ScrollView, Image, TouchableOpacity} from 'react-native';
import { Store, Colors, Icons, Languages } from '@common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const OrderItemView = (data) => {

    const item = data;
    const addondata = JSON.parse(item.addons);

    const RenderAddonItem = (item) => {
        return(
            <Text numberOfLines={1} style={[styles.cartitemaddon]}>{item.name} {item.price == 0 ? null : `(${Languages.Rs} ${item.price})`}</Text>
        );
    }
    
    return(
        <View style={[styles.cartitemcontainer]}>
            <View style={[styles.cartitemimageholder]}>
                <Image source={{uri : item.image_thumb}} style={[styles.cartitemimage]}/>
            </View>
            <View style={{width : '60%'}}>
                <Text numberOfLines={1} style={[styles.cartitemtitle]}>{item.food_name}</Text>
                <Text numberOfLines={1} style={[styles.cartitemportion]}>{item.item_type_name}({Languages.Rs}{item.price} × {item.qty})</Text>
                {item.addons.length != 0 ?
                    <ScrollView style={{marginTop : 5, width : '80%'}}>
                        <FlatList
                            itemDimension={80}
                            staticDimension={300}
                            fixed
                            spacing={5}
                            data={addondata}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => RenderAddonItem(item)}
                        />
                    </ScrollView> : null}
                {item.item_Preparation_note ? <Text numberOfLines={1} style={[styles.cartitempreparationnote]}>Notes : {item.item_Preparation_note}</Text> : null}
            </View>
            <Text numberOfLines={1} style={[styles.cartitemtotal]}>{Languages.Rs}{Number(item.price)*Number(item.qty).toFixed(2)}</Text>
        </View>
    );
}
export default OrderItemView;