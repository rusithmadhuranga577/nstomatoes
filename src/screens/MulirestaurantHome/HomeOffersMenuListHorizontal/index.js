import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image , Dimensions, FlatList, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-banner-carousel-updated';
import { Languages, Colors, Icons } from '@common';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const QueryString = require('query-string');

class HomeMenuListHorizontal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuList : [],
            loading: false,
            restaurantdata: []
        };
      }

    componentDidMount(){
        AsyncStorage.getItem('nearest_restaurant', (err, restaurant)=>{
            const restaurandDataArray = JSON.parse(restaurant);
            this.setState({restaurantdata: restaurandDataArray});
        });
    }

    nav = (item) => {
        // console.log(restaurantdata.id);
        this.props.navigation.push('FoodItem' , {
            name: item.food_name, 
            price: item.price, 
            image: item.image_large, 
            id: item.id , 
            foodtypes : item.foodtype, 
            secondline: item.second_line,  
            addons: item.addons.length == 0? null : item.addons[0].addonitems, 
            restaurant_id : this.state.restaurantdata.id, 
            restaurantdata : this.state.restaurantdata, 
            original_price : item.original_price,
            rating: item.rating
        });
    }

    renderItem = (item) => {
        return(
            <TouchableOpacity onPress={()=>this.nav(item)} style={[styles.itemcontainer]} >
                <Image source={{uri : item.image_large}} style={styles.image}/>
                <Text numberOfLines={1} style={[styles.title]}>{item.food_name}</Text>
                <Text numberOfLines={1} style={[styles.price]}>{Languages.currency +Number(item.price).toFixed(2)}</Text>
                {item.valid_to != '' ?
                <View style={[styles.validcontainer]}>
                </View>:null}
            </TouchableOpacity>
        );
    }

    navigateFunction=(category)=>{
        console.log(category);
        this.props.navigation.push('MenulistCategory', {resid : this.state.restaurantdata.id, restaurantdata : this.state.restaurantdata, cat_id : this.props.data.category_id});
    }

    titleBar = () => {
        return <View style={styles.titlerow}>
            <Text style={[styles.titlebartext]}>{this.props.data.title}</Text>
            <TouchableOpacity onPress={()=>this.navigateFunction()}>
                <Image source={Icons.forwardArrow} style={{width: 40, height: 13}}/>
            </TouchableOpacity>
        </View>
    }

    render() {
        return(
            <View style={{backgroundColor: Colors.white, marginTop: 10}}>
                {this.titleBar()}
                <ScrollView style={{}}>
                    <FlatList
                        horizontal={true}
                        initialNumToRender={this.props.data.data.length}
                        data={this.props.data.data}
                        style={styles.gridView}
                        renderItem={({ item}) => (this.renderItem(item))}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </View> 
        );
    }
}

export default function(props){
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    return <HomeMenuListHorizontal {...props} navigation={navigation} isFocused={isFocused}/>;
  } 