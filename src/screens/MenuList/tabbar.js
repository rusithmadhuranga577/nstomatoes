/** @format */

import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Url , Colors } from '@common';

const TabBar =({selected_id}) => {

  const [categories, setcategories] = useState([]);

  useEffect(() => {
    fetch(Url.foodcategory)
    .then((response) => response.json())
    .then((data) => setcategories(data))
    .catch((error) => console.error(error))
  })

  return(
    <View style={{width: '100%', paddingBottom: 5, paddingRight: 5, paddingLeft: 5, backgroundColor: '#fff'}}>
        <FlatList
            horizontal
            itemDimension={80}
            data={categories}
            spacing={3}
            renderItem={({ item }) => (
                <TouchableOpacity style={{padding: 10, backgroundColor: Colors.lightred, borderRadius: 15, marginRight: 5}} >
                    <Text>{item.category_name}</Text>
                    {selected_id == item.cat_order ?
                    <View style={{width: '120%', height: 3, backgroundColor: '#000', alignSelf: 'center'}}></View>:null}
                </TouchableOpacity>
            )}
        />
    </View>
  );
}
export default TabBar;