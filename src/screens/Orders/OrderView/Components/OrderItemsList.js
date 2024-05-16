import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, Text, Image, ScrollView, FlatList } from 'react-native';
import { Store, Languages, Images, Url, Constants } from '@common';
import styles from '../styles';

const OrderItemsList = ({items}) => {

    const RenderAddonItem = (item) => {
        return(
            <Text numberOfLines={2} style={[styles.cartitemaddon]}>{item.name} {item.price == 0 ? null : `(${Number(item.price).toFixed(2)})`}</Text>
        );
    }
    
    const RenderItem = (item) => {
        const addons = item.addons.length == 0 ? [] : JSON.parse(item.addons);
        return(
            <View>
                <View style={[styles.orderitemcontainer]}>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <View style={[styles.orderitemqtyholder]}>
                            <Text style={{fontFamily : Constants.fontFamilybold, fontSize : 18}}>{item.qty}</Text>
                        </View>
                        <View style={{width : '70%'}}>
                            <Text numberOfLines={2} style={{fontFamily : Constants.fontFamilybold, width : '100%'}}>{item.food_name}</Text>
                            <Text numberOfLines={1} style={[styles.cartitemportion]}>{item.type_name} ( {Number(item.type_price).toFixed(2)} )</Text>
                            {item.addons.length != 0 ?
                            <ScrollView style={{marginTop : 5, width : '85%'}}>
                                <FlatList
                                    itemDimension={80}
                                    staticDimension={300}
                                    fixed
                                    spacing={5}
                                    data={addons}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => RenderAddonItem(item)}
                                />
                            </ScrollView> : null}
                        </View>
                    </View>
                    <Text style={{fontFamily : Constants.fontFamilynormal}}>{Number(item.sub_total).toFixed(2)}</Text>
                </View>
            </View>
        );
    }

    return(
        <View style={{marginBottom : 10}}>
            <FlatList
                itemDimension={80}
                staticDimension={300}
                fixed
                spacing={5}
                ItemSeparatorComponent={()=>(<View style={[styles.itemseparator]}/>)}
                data={items}
                key={item => item.id}
                renderItem={({ item, index }) => RenderItem(item)}
            />
        </View>
    );
}

export default OrderItemsList;