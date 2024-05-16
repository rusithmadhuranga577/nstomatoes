import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image , Dimensions, LogBox, FlatList  } from 'react-native';
import Carousel from 'react-native-banner-carousel-updated';
import { Url, Constants, Colors, Languages } from '@common';
import axios from 'axios';
import styles from './styles';

const QueryString = require('query-string');

const BannerWidth = (Dimensions.get('window').width)-20;
const BannerHeight = 150;

export default function OffersBanner({url}) {

  const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const [isLoading, setLoading] = useState(true);

    const fetchData=()=>{
      axios.post(url, 
        QueryString.stringify({  
      }),
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
      })
      .then(response => {
        setItems(response.data.offers);
        console.log(response.data.offers[0]);
      }).catch(error => {
          console.log(error);
      })
      setLoading(false);
  }

    return (
        <View style={{backgroundColor: Colors.white, marginTop: 10}}>
          <Text style={[styles.latestoffertext, {marginTop : 20}]}>Today's Special</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator = {false}
            itemDimension={80}
            data={items}
            spacing={3}
            renderItem={({ item }) => (
                <View style={[styles.itemcontainer]} >
                  <Image source={{uri : item.image}} style={styles.image}/>
                  <Text numberOfLines={2} style={[styles.description]}>{item.description}</Text>
                  <View style={[styles.promonamecontainer]}>
                    <Text numberOfLines={1} style={[styles.name]}>{item.name}</Text>
                  </View>
                  {item.valid_to != '' ?
                  <View style={[styles.validcontainer]}>
                    <Text numberOfLines={1} style={[styles.description]}>{Languages.ValidFrom} <Text style={[styles.description, {color : Colors.primary, fontFamily : Constants.fontFamilybold}]}>{item.valid_from}</Text> {Languages.To} <Text style={[styles.description, {color : Colors.primary, fontFamily : Constants.fontFamilybold}]}>{item.valid_to}</Text></Text>
                  </View>:null}
                </View>
            )}
          />
        </View>
      );

}