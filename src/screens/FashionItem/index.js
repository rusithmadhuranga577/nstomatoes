import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Counter from "react-native-counters";
import { Colors, Languages } from '@common';
import { useNavigation } from '@react-navigation/native';
import { RadioButtonFashionItem, CartButton } from '@components';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import SetCartPrice from './Addtocart/setcartprice';
import SetCartQty from './Addtocart/setcartqty';
import AddItemsToCart from './Addtocart/additemstocart';
import Carousel from 'react-native-snap-carousel';
import ImageView from "react-native-image-viewing";
import { showMessage } from "react-native-flash-message";

const { width , height } = Dimensions.get('screen');

const FashionItem = ({route}) => {

    const navigation = useNavigation();
    var carousel_ref = useRef(null); 
    const [imageviewvisible, setimageviewvisible] = useState(false);

    const { restaurant_id } = route.params;
    const { restaurantdata } = route.params;
    const { image } = route.params;
    const { name } = route.params;
    const { description } = route.params;
    const { price } = route.params;
    const { original_price } = route.params;
    const { id } = route.params;
    const { foodtypes } = route.params;
    const { addons } = route.params;
    const { secondline } = route.params;
    const { gallery } = route.params;

    const [addonslist, setaddonslist] = useState([]);

    const [addonsarray, setaddonsarray] = useState([]);
    const [addsontotal, setaddsontotal] = useState(0);
    const [cartItems, setItemVal] = useState(Number(0));
    const [qty, setQty] = useState(Number(1));
    const [selctedype, setType] = useState(0);
    const [selctedypeName, setTypeName] = useState(0);
    const [selctedypePrice, setTypePrice] = useState(0);
    const [preparationNote, setpreparationNote]= useState('');
    const [total, settotal] = useState(0);
    const [offerpercentage, setofferpercentage] = useState(0);
    const [galleryimages, setgalleryimages] = useState([]);

    const types = [];

    for( i=0; i < foodtypes.length; i++){
        types.push({typeid: foodtypes[i].id, lableName: foodtypes[i].type_name, label:  foodtypes[i].type_name, price: foodtypes[i].type_price} );
    }

    useEffect(()=>{
      if(addons != null){
        setaddonslist(addons);
      }
      if(foodtypes.length > 0){
        setType(types[0].food_item_type_id);
        setPercentage();
      }else{
        showMessage({
          message: "Item is not available",
          type: "warning",
          icon : 'warning',
          duration : 2500
        });
      }
      setImageGallery();
    },[])

    const setImageGallery = () => {
      var array = [];
      for (let i = 0; i < gallery.length; i++){
        if(gallery[i].image){
          console.log(gallery[i].image);
          array.push({id : gallery[i].id, url : gallery[i].image});
        }
      }
      setgalleryimages(array);
      console.log(array.length)
    }

    const gettotal = ({typeprice, addontotal, qty}) => {
        const tp = Number(typeprice);
        const ap = Number(addontotal);
        var total = 0;
        total = (tp + ap)*qty
        const finaltotal = Number(total)
        settotal(finaltotal)
        return finaltotal;
    }

    const addonlist = (index) => {
      const foods = addonslist;
      foods[index].checked = !foods[index].checked;
      var items = addonslist;
      var itemcount = addonslist.length;
      var selectedlist = [];
      var pricelist = [];
      var arraytotal = 0;
  
      for (let i = 0; i < itemcount; i++){
        if(addonslist[i].checked == true){
          selectedlist.push({id :  (Number(addonslist[i].food_item_addon_id)), name: addonslist[i].addon_name, price: addonslist[i].addon_price, qty: qty });
          pricelist.push(Number(addonslist[i].addon_price));
        }
      }
      var newlist = [];
      newlist.push(id,selectedlist)
      setaddonsarray(selectedlist);
      for (let i = 0; i < pricelist.length; i++){ arraytotal += pricelist[i] }
      setaddsontotal(Number(arraytotal));
      gettotal({typeprice : selctedypePrice, addontotal : arraytotal, qty : qty})
    }

    const SetSelectedType = (type_data) => {
      if(foodtypes.length > 0){
        setType(type_data.typeid)
        setTypePrice(type_data.price)
        setTypeName(type_data.lableName)
        gettotal({typeprice : type_data.price, addontotal : addsontotal, qty : qty})
      }
    }

    const OnQtyChange = ({number}) => {
        const q = number;
        setQty(q);
        setItemVal(q);
        gettotal({typeprice : selctedypePrice, addontotal : addsontotal, qty : q})
    }

    const AddToCart = () => {
      const itemsArray = [
        {
            food_item_type_id : selctedype,
            restaurant_id : restaurant_id,
            restaurant_name : restaurantdata.name,
            item_name : name,
            item_image : image,
            food_items_id : id,
            item_type_id : selctedype,
            item_type_name : selctedypeName,
            item_type_price: Number(selctedypePrice) ,
            item_total: (Number(total)),
            item_addon_price: Number(addsontotal),
            item_qty : qty,
            item_prepare_note: preparationNote,
            addons : addonsarray,
            offerpercentage : offerpercentage
        }
      ]
      AsyncStorage.setItem('cart_merchant_type', restaurantdata.restaurant_type);
      AddItemsToCart(itemsArray);
      SetCartPrice(total);
      SetCartQty(qty);
      showMessage({
        message: "Item added to cart !",
        type: "success",
        icon : 'success',
        duration : 2500
      });
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    }

    const TitleHolder = ({title}) => {
      return (
          <View style={[styles.titleholder]}>
              <Text style={[styles.titleholdertext]}>{title}</Text>
          </View>
      );
    };

    const _renderItem = ({item, index}) => {
      return (
          <TouchableOpacity onPress={()=>setimageviewvisible(true)} style={[styles.imageholder]}>
              <Image source={{uri : item.url}} style={{width : '100%', height : '100%', resizeMode: 'contain', borderRadius : 10}} />
          </TouchableOpacity>
      );
    }

    const BackButton = () => {
      return(
        <TouchableOpacity onPress={()=>navigation.goBack()} style={[styles.backbuttonholder]}>
          <Icon name={'chevron-back'} size={25} color={Colors.black}/>
        </TouchableOpacity>
      );
    }

    const setPercentage = () => {
      const price1 = price;
      const price2 = original_price;
      var percentage = 0;

      percentage = ((price2 - price1) / price2 *100).toFixed(0);
      console.log('percentage - ', percentage, percentage > 0 )
      if(percentage > 0){
        setofferpercentage(percentage);
      }else{
        setofferpercentage(0);
      }
    }

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

  return (
    <View>
    <View style={styles.container}>
      <ScrollView>
        <View style={{width : '100%', height : width-10, alignItems : 'center', justifyContent : 'center', borderRadius : 10, padding : 25}}>
        <Carousel
          ref={(c) => { carousel_ref = c; }}
          data={galleryimages}
          renderItem={_renderItem}
          loop={true}
          autoplay={true}
          autoplayDelay={600}
          autoplayInterval={5000}
          sliderWidth={width-15}
          itemWidth={width-15}
        />
        </View>
          <Text style={[styles.secondlinestyle, {marginTop : 0}]} numberOfLines={3}>{name}</Text>
          
          <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '100%', alignItems : 'center'}}>
            <View style={{width : '45%'}}>
              <Text style={[styles.about]}>{Languages.About}</Text>
              <Text numberOfLines={3} style={[styles.secondlinestyle]}>{description}</Text>
            </View>
            {price > original_price ? 
            <View>
              <Text style={[styles.originalprice, {fontSize : 18, marginRight : 10}]}>{Languages.currency}{Number(price).toFixed(2)}</Text>
            </View>:null}

            {price < original_price ? 
            <View style={{alignSelf : 'flex-end', marginRight : 10}}>
              <View style={{width : '100%', marginTop : 10}}>
              {getPercentage(price, original_price)} 
              </View>
              {price < original_price ? 
              <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <Text style={[styles.originalprice, {textDecorationLine: 'line-through', color : 'red', fontSize : 15}]}>{Languages.currency}{Number(original_price).toFixed(2)}</Text>
                <Text style={[styles.originalprice, {fontSize : 18}]}>{Languages.currency}{Number(price).toFixed(2)}</Text>
              </View>:null}
            </View>:null}
          </View>

          {/* <View style={{alignSelf : 'flex-end', marginRight : 10}}>
            <View style={{width : '30%', marginTop : 10}}>
            {getPercentage(price, original_price)} 
            </View>
            {price < original_price ? 
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
              <Text style={[styles.originalprice, {textDecorationLine: 'line-through', color : 'red', fontSize : 15}]}>{Languages.currency}{Number(original_price).toFixed(2)}</Text>
              <Text style={[styles.originalprice]}>{Languages.currency}{Number(price).toFixed(2)}</Text>
            </View>:null}
          </View> */}
          
          <TitleHolder title={Languages.Variants}></TitleHolder>
          <View style={{width : '100%', padding : 0, flexDirection : 'row', justifyContent : 'space-between'}}>
            <RadioButtonFashionItem
              data={types}
              initial={1}
              box = {false}
              selectedBtn={(e) => {SetSelectedType(e)}}            
              animationTypes= {['pulse', 'shake', 'rotate']}
            />
          </View>
          {addonslist.length == 0 ? null :
          <>
          <TitleHolder title={Languages.Suggetions}></TitleHolder>
          {addonslist.map((addon, index ) => {
            return (
                <View style={[styles.addonitemrow]}>
                  <View style={[styles.addonrowleftitem]}>
                  <CheckBox
                      center
                      boxType = {'circle'}
                      title={addon.addon_name}
                      tintColors = {Colors.primary}
                      iconRight
                      onValueChange={() => addonlist(index)}
                      value={addon?.checked}
                      size={30}
                  />
                  <Text>{addon.addon_name}</Text>
                  </View>
                  <Text>{addon.addon_price == 0 ? null : '+ '+Languages.currency+Number(addon.addon_price).toFixed(2)}</Text>
              </View>
            )
          })}
          </>}

          <TextInput 
            value={preparationNote}
            placeholder={Languages.SpecialNotes}
            onChangeText={text => setpreparationNote(text)}
            style={[styles.textinput]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
          />
          
          <ImageView
            images={galleryimages}
            imageIndex={0}
            visible={imageviewvisible}
            onRequestClose={() => setimageviewvisible(false)}
          />
          
          <View style={{height : 200}}></View>
      </ScrollView>
      {foodtypes.length > 0 ? 
        <View style={{position : 'absolute', bottom : 10, alignItems : 'center', width : '100%', backgroundColor : Colors.white, borderTopRightRadius : 15, borderTopLeftRadius : 15}}>
          <View style={{marginTop: 20, marginBottom: 30, alignItems: 'center', alignSelf : 'center'}}>
              <Counter 
                  start={1}
                  max={1000}
                  min	={1}
                  buttonStyle ={styles.counterbtn}
                  buttonTextStyle = {styles.counterbuttontextstyle}
                  countTextStyle = {styles.countertext}
                  onChange={(count)=> OnQtyChange({number : count})} />
          </View>
          <View style={{width : '95%', alignSelf : 'center'}}>
              <CartButton total={total} action={AddToCart}/>
          </View>
      </View>:null}
      <BackButton/>
    </View>
    </View>
  );
};

export default FashionItem;