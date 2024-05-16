import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Languages, Constants } from '@common';
import styles from '../styles';

const OrderItemsList = ({items}) => {

    const getPercentage = (price, original_price) => {
        const price1 = price;
        const price2 = original_price;
        var percentage = 0;
    
        percentage = ((price2 - price1) / price2 *100).toFixed(0);
        if(price2 == null){
          return <></>;
        }else if (price1 < price2){
          return (
            <View style={[styles.populerbadge]}>
              <Text style={[styles.populerbadgetext]}>Save {percentage}%</Text>
            </View>  
          );
        }else{
          return <></>;
        }
     }

    const RenderItem = (item) => {
        return(
            <View>
                <View style={[styles.orderitemcontainer]}>
                    <View style={{width : 90, height : 90, borderRadius : 5, borderWidth : 1, alignItems : 'center', justifyContent : 'center', marginRight : 10}}>
                        <Image source={{uri : item.image_large}} style={{width : 80, height : 80, borderRadius : 5, borderWidth : 1}}/>
                    </View>
                    <View style={{width : '90%'}}>
                        <View style={{flexDirection : 'row',  width : '80%'}}>
                            <Text numberOfLines={2} style={{fontFamily : Constants.fontFamilybold, width : '80%'}}>{item.food_name}</Text>
                        </View>
                        <Text style={{fontFamily : Constants.fontFamilynormal}}>Variation - {item.type_name}</Text>
                        <Text style={{fontFamily : Constants.fontFamilynormal}}>({Languages.Rs}{Number(item.price)} × {item.qty})</Text>
                    </View>
                </View>
                <View style={{position : 'absolute', right : 10, bottom : 10}}>
                    {getPercentage(item.price, item.original_price)}
                    <Text style={{fontFamily : Constants.fontFamilybold, fontSize : 17}}>{Languages.Rs}{(Number(item.price)*item.qty).toFixed(2)}</Text>
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