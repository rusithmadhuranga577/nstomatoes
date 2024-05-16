import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text , Dimensions, LogBox  } from 'react-native';
import Carousel from 'react-native-banner-carousel-updated';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Url, Images, Colors } from '@common';
import Image from 'react-native-image-auto-height';
import styles from './styles';

const BannerWidth = (Dimensions.get('window').width)-15;
const BannerHeight = 200;

export default function RestaurantListBanner({url, data}) {
  const [isLoading, setLoading] = useState(false);

  var images = []
  for( i=0; i < data.length; i++){
    images.push(data[i].banner_image);
  }

    return (
        <View style={{backgroundColor : Colors.white, alignContent: 'center', height: BannerHeight, alignItems: 'center', width: '100%'}}>
          {isLoading ? 
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  alignSelf={'center'}
                  width={BannerWidth}
                  borderRadius={15}
                />
            </SkeletonPlaceholder>
             : 
            <Carousel
              autoplay
              autoplayTimeout={3000}
              loop
              index={0}
              pageSize={BannerWidth}
              useNativeDriver={false}
              showsPageIndicator={false}
            >
                {images.map((image, index) => renderPage(image, index))}
            </Carousel>
          }
        </View>
      );

}

const renderPage = (image, index)=> {
  return (
    <View style={{ width: BannerWidth, borderRadius : 15 }}  key={index}>
        <Image style={{ width: BannerWidth, height: 'auto', borderRadius : 15 }} source={{ uri: image }} />
    </View>
  )
}