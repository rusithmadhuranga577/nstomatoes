import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image , Dimensions, LogBox  } from 'react-native';
import Carousel from 'react-native-banner-carousel-updated';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Url, Images, Colors } from '@common';
import styles from './styles';

const BannerWidth = (Dimensions.get('window').width)-20;
const BannerHeight = 140;

export default function RestaurantListBanner({url, height}) {

  const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const [isLoading, setLoading] = useState(true);

    const fetchData=()=>{
      fetch(url)
        .then((response) => response.json())
        .then((data) => setItems(data.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

        var data = []
        if(items.length > 0){
          for( i=0; i < items.length; i++){
            data.push(items[i].banner_image);
          }
        }
  }


  var images = []
  if(items.length > 0){
    for( i=0; i < items.length; i++){
      images.push(items[i].banner_image);
    }
  }

    return (
        <View style={{width : '95%', alignSelf : 'center', elevation : 5, backgroundColor : Colors.white, borderRadius : 15}}>
          {isLoading ? 
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  alignSelf={'center'}
                  width={BannerWidth}
                  height={height}
                  borderRadius={5}
                />
            </SkeletonPlaceholder>
             : 
            <Carousel
              autoplay
              autoplayTimeout={6000}
              loop
              index={0}
              pageSize={BannerWidth}
              useNativeDriver={false}
            >
                {images.map((image, index) => renderPage(image, index, height))}
            </Carousel>
             }
        </View>
      );

}

const renderPage = (image, index, height)=> {
    return (
        <View style={{ width: BannerWidth, height: height, borderRadius : 15 }}  key={index}>
          <Image style={{ height: height, borderRadius : 15 }} source={{ uri: image }} />
        </View>
)}