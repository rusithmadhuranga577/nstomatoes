import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { Colors, Languages, Url, Images } from '@common';
import Icon from 'react-native-vector-icons/Ionicons';
import { Clearcartpopup, RestaurantListBanner } from '@components';
import { showMessage } from "react-native-flash-message";
import styles from './styles';
import axios from 'axios';
import HorizontalList from '../HorizontalList';

const screenheight = Dimensions.get('screen').height;
const QueryString = require('query-string');

class VerticleList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        cartrestaurantid : null,
        loading : false,
        stores : null,
        clearcartpopup : false,
        oldcartdata : [],
        oldcartprice : 0,
        oldcartqty : 0,

        clickedrestaurantid : null,
        clickedrestaurantfoodlist : [],
        clickedrestauranttabs : [],
        clickedrestaurantimage : '',
        clickedrestaurantdata : [],

        allList : null,
        titletext : this.props.type == 'restaurant' ? 'All Restaurants' : null || this.props.type == 'grocery' ? 'All Groceries' : null || this.props.type == 'fashion' ? 'All Fashion Outlets' : null,
    };
  }

  getinitialdata(){
    const paramdata = this.props.params;
    console.log(paramdata);
    axios.post(Url.restaurantlisturl, 
    QueryString.stringify({
        filter : paramdata.filter,
        type : paramdata.type,
        count : 100,
        lat : paramdata.lat,
        lon : paramdata.lon,
        savedcartdata : []
    }), 
    {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
    }).then(response => {
        if(response.data.data.length == 0){
          this.setState({stores : 'empty'});
        }else{
          this.setState({stores : response.data.data});
          this.setState({allList : response.data.data});
        }
    })
    AsyncStorage.getItem('cartrestaurantid', (err, id)=>{
      if(id != null){
        this.setState({cartrestaurantid : id})
        AsyncStorage.getItem('cartitems', (err, cartitems)=>{
          const cartitemsdata = JSON.parse(cartitems);
          if(cartitemsdata != null){
            this.setState({oldcartdata : cartitemsdata});
          }            
        });
        AsyncStorage.getItem('cartprice', (err, oldcartprice) => {
          this.setState({oldcartprice : oldcartprice});
        });
        AsyncStorage.getItem('cartqty', (err, oldcartqty) => {
          this.setState({oldcartqty : oldcartqty});
        });
      }else{
        this.setState({cartrestaurantid : 'no_cart_restaurant'})
      }
    });
  }

  componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getinitialdata();
    });
    this.getinitialdata();
  }

  NavigateFunction = (type, item, res_id) => {
    if(type == 'restaurant'){
      this.props.navigation.push('MenuList', {resid : res_id, restaurantdata : item});
    }else if(type == 'grocery'){
      this.props.navigation.push('MenuListGrocery', {resid : res_id, restaurantdata : item});
    }else if(type == 'fashion'){
      this.props.navigation.push('MenuListGrocery', {resid : res_id, restaurantdata : item});
    }
  }

  OnPressFunction(item){
    const clicked_res_type = item.restaurant_type;
    const res_id = item.id;
    const res_id_state = this.state.cartrestaurantid;
    if(res_id_state != 'no_cart_restaurant'){
      if(res_id != res_id_state){
        this.setState({clickedrestaurantid : res_id});
        this.OpenClearCartPopup();
      }else{
        this.NavigateFunction(clicked_res_type, item, res_id);
      }
    }else{
      this.NavigateFunction(clicked_res_type, item, res_id);
    }
  }

  ClearCartAndNavigate=()=>{
    this.props.navigation.push('MenuList', {resid : this.state.clickedrestaurantid, restaurantdata : this.state.clickedrestaurantdata});
  }

  SaveCartFunction=()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
    var randomid = hours+min+sec+RandomNumber;
    var created_time = `${year}-${month}-${date} ${hours}:${min}`;

    var cartarray = [];
    const savedcartdata = this.state.oldcartdata;
    const oldcartprice = this.state.oldcartprice;
    cartarray.push({'id' : randomid,'cartprice' : oldcartprice, 'cartitems' : savedcartdata, 'saved' : created_time, 'cartqty' : this.state.oldcartqty});
    
    AsyncStorage.getItem('savedcartitems', (err, oldsavedcartitems) => {
      if (oldsavedcartitems == null) {
        AsyncStorage.setItem('savedcartitems', JSON.stringify(cartarray));
        console.log('cart array',cartarray);
        this.ClearCartFunction();
      } else {
        const concactedObject = JSON.parse(oldsavedcartitems).concat(cartarray);
        AsyncStorage.setItem('savedcartitems', JSON.stringify(concactedObject));
        console.log(concactedObject);
        this.ClearCartFunction();
      }
    })
  }

  TemporyClear=()=>{
    AsyncStorage.removeItem('savedcartitems');
    this.CloseClearCartPopup();
  }

  ClearCartFunction=()=>{
    AsyncStorage.removeItem('cartitems');
    AsyncStorage.removeItem('cartprice');
    AsyncStorage.removeItem('cartqty');
    AsyncStorage.removeItem('cartrestaurantid');
    AsyncStorage.removeItem('appliedpromo');
    this.setState({clearcartpopup : false});
    this.setState({cartrestaurantid : 'no_cart_restaurant'});
    this.NavigateFunction();
  }

  OpenClearCartPopup=()=>{
    this.setState({clearcartpopup : true});
  }

  CloseClearCartPopup=()=>{
    this.setState({clearcartpopup : false});
  }

  OpenMapsFunction = (lat, lan) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lan}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  ShowShopCloasedAlert = (name) => {
    showMessage({
        message: `Sorry ${name} is closed now`,
        type: "warning",
        icon : 'warning',
        duration : 3000
    });
  }

  SearchFilterFunction = (text) => {
    const masterDataSource = this.state.allList;
    
    if(text == 'All'){
      this.setState({stores : masterDataSource});
    }else{
      if (text) {
        const newData = masterDataSource.filter(
          function (item) {
            const itemData = item.categories
                ? item.categories.toUpperCase()
                : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }
        );
        this.setState({stores : newData});
      } else {
        this.setState({stores : masterDataSource});
      }
    }
  };

  render(){
    const type = this.props.type;
    return(
      <View style={[styles.container, {backgroundColor : '#fff'}]}>
      {this.state.stores == 'empty' ? 
      <View style={[styles.emptycontainer]}>
        <Text numberOfLines={1} style={[styles.emptytext]}>{Languages.UnableToFindStoresNearYou}</Text>
        <Image source={Images.storelistempty} style={{width : '100%', height : '50%', opacity : 0.5}}/>
      </View>
      :
      <>
        <ScrollView style={[styles.container]}>
        <RestaurantListBanner height={150} url={type == 'restaurant' ? Url.foodsbannerurl : null || type == 'grocery' ? Url.grocerybannerurl : null || type == 'fashion' ? Url.fashionbannerurl : null}/>
        {/* <HorizontalList type={this.props.type} filterList={(category)=>this.SearchFilterFunction(category)} getSelectedCategory={(category)=>this.setState({titletext : category})}/> */}
        <Text style={[styles.all]}>{this.state.titletext} {this.state.titletext == 'All' ?  type == 'restaurant' ? 'Restaurants' : null || type == 'grocery' ? 'Groceries' : null ||type == 'fashion' ? 'Fashion Outlets' : null : null}</Text>
        <View>
          
        </View>
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.stores}
            itemDimension={80}
            spacing={3}
            style={{marginBottom : 150, backgroundColor : Colors.white}}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>item.open == 0 ? this.ShowShopCloasedAlert(item.name) : this.OnPressFunction(item)} style={[styles.itemcontainer]} >
                <Image source={{uri : item.logo}} style={[styles.image]}/>
                <View style={{alignSelf : 'flex-start', width: '70%',}}>
                  <Text style={[styles.name, {width: '70%'}]} numberOfLines={2}>{item.name}</Text>
                  <Text style={[styles.address]} numberOfLines={2}>{item.address_line_1}, {item.address_line_2}</Text>

                  <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    {item.def_rating == 5 || item.def_rating == 4 ? 
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                      <Text style={[styles.resdetailstext, {marginRight : 5}]}>{item.def_rating == 5 ? '😍' : null || item.def_rating == 4 ? '🥰' : null}</Text>
                      <Text style={[styles.resdetailstext]}>{item.def_rating == 5 ? 'Amazing' : null || item.def_rating == 4 ? 'Good' : null}  |  </Text>
                    </View> : null}

                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 5}}>
                      <Icon name={'time-outline'} color={Colors.darkgray} size={15} style={{marginRight : 5}}/>
                      <Text style={[styles.resdetailstext, {marginTop : 0}]}>{item.delivery_time}</Text>
                    </View>
                  </View>

                  <Text style={[styles.offertext]}>{item.promotxt}</Text>
                </View>
                <View style={[styles.openclosecontainer, {backgroundColor : item.open == 0 ? Colors.alertred : Colors.successgreen}]}>
                  <Text style={[styles.openclosetext]} numberOfLines={2}>{item.open == 0 ? Languages.Close : Languages.Open}</Text>
                </View>
                {item.app_deliveryfee == null ? null :
                <View style={{flexDirection : 'row', alignItems : 'center', position : 'absolute', right : 10, top : 10}}>
                  <Icon name={'bicycle'} color={Colors.darkgray} size={18} style={{marginRight : 5}}/>
                  <Text style={[styles.resdetailstext]}>{Languages.currency}{Number(item.app_deliveryfee).toFixed(2)}</Text>
                </View>}
              </TouchableOpacity>
            )}// (071)5389 486
        />
        </ScrollView>
      </>}
      {this.state.clearcartpopup ? 
        <View style={{width : '100%', height : screenheight, position : 'absolute', zIndex : 150, bottom : 0}}>
          <Clearcartpopup StartNew={()=>this.SaveCartFunction()} Cancel={()=>this.CloseClearCartPopup()} visibility={this.state.clearcartpopup} />
        </View>:null}
      </View>
    );
  }
}

VerticleList.propTypes = {
  getLoadingstate: PropTypes.func,
};

export default function(props){
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  return <VerticleList {...props} navigation={navigation} isFocused={isFocused}/>;
} 