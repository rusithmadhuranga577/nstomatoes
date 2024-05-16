import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Image from 'react-native-image-auto-height';
import AsyncStorage from '@react-native-community/async-storage';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Counter from "react-native-counters";
import { Colors, Languages, Constants, Icons } from '@common';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, CartButton, CustomAlert, CustomAlertButton } from '@components';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import SetCartPrice from './Addtocart/setcartprice';
import SetCartQty from './Addtocart/setcartqty';
import AddItemsToCart from './Addtocart/additemstocart';
import { showMessage } from "react-native-flash-message";
import { Rating } from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = (Dimensions.get('window').width);

const App = ({route}) => {

    const navigation = useNavigation();

    const { restaurant_id } = route.params;
    const { restaurantdata } = route.params;
    const { image } = route.params;
    const { name } = route.params;
    const { price } = route.params;
    const { original_price } = route.params;
    const { id } = route.params;
    const { foodtypes } = route.params;
    const { addons } = route.params;
    const { secondline } = route.params;
    const { rating } = route.params;

    const [addonslist, setaddonslist] = useState([]);
    const [loginpopup, setloginpopup] = useState(false);

    const [addonsarray, setaddonsarray] = useState([]);
    const [addsontotal, setaddsontotal] = useState(0);
    const [qty, setQty] = useState(Number(1));
    const [selctedype, setType] = useState(0);
    const [selctedypeName, setTypeName] = useState(0);
    const [selctedypePrice, setTypePrice] = useState(0);
    const [preparationNote, setpreparationNote]= useState('');
    const [total, settotal] = useState(0);
    const [disablebutton, setdisablebutton] = useState(false);

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
      }else{
        showMessage({
          message: "Item is not available",
          type: "warning",
          icon : 'warning',
          duration : 2500
        });
      }
    },[])

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

    const OnQtyChange = (type) => {
        var q = qty;
        if(type == 'plus') {
          q = q+1;
        } else if(type == 'minus') {
          if(q != 1) {
            q = q-1;
          }
        }
        setQty(q);
        gettotal({typeprice : selctedypePrice, addontotal : addsontotal, qty : q})
    }

    const AddToCart = () => {
      AsyncStorage.getItem('userid', (err, userid)=>{
        if(userid == '0'){
          openLoginPopup();
        }else{
          // setdisablebutton(true);
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
            }
          ]
          // AsyncStorage.setItem('cart_merchant_type', restaurantdata.restaurant_type+'');


          // const parsedItems = itemsArray;

          // console.log(`new items :::: ${JSON.stringify(parsedItems)}`);

          // AsyncStorage.getItem('cartitems', (err, olditems) => {
          //   console.log(`old items :::: ${olditems}`);
          //   if(olditems == null || olditems == []) {
          //     AsyncStorage.setItem('cartitems', JSON.stringify(parsedItems));
          //   } else {
          //     let oldCartData = [];
          //     oldCartData = JSON.parse(olditems);

          //     const itemIndex = oldCartData.findIndex(item => item.id === parsedItems.item_type_id);

          //     if (itemIndex !== -1) {
          //       oldCartData.map((item, index) => {
          //         console.log('Item already exists'+item.item_qty);
          //         item.item_qty = item.item_qty + 1
          //       });
          //       console.log(oldCartData);
          //       // AsyncStorage.setItem('cartitems', JSON.stringify(oldCartData));
          //     }
          //   }
          // });



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
      })
    }

    const openLoginPopup = () => {
      setloginpopup(true);
    }

    const renderCounter = () => {
      return (
        <View style={[styles.countercontainer]}>
          <TouchableOpacity onPress={()=>OnQtyChange('minus')} style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 20, height: 20}}>
              <Icon name={'minus'} size={15}/>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.counterbuttontextstyle}>{qty}</Text>
          </View>
          <TouchableOpacity onPress={()=>OnQtyChange('plus')} style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 20, height: 20}}>
              <Icon name={'plus'} size={15}/>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
      
    const title = () => {
      return (
        <View style={[styles.title]}>
          <View style={[styles.titleRow]}>
          <View>
            <View style={{width: screenWidth/2}}>
              <Text numberOfLines={2} style={[styles.titlestyle]}>{name}</Text>
              <View style={{alignSelf: 'flex-start', marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Rating
                  type='star'
                  ratingCount={5}
                  startingValue={rating}
                  imageSize={15}
                />
                <Text numberOfLines={2} style={{marginLeft: 10, fontSize: 12, fontFamily : Constants.fontFamilybold}}>{rating}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.price]}>{Languages.currency}{Number(price).toFixed(2)}</Text>
          </View>
        </View>
          <View style={{width : '100%'}}>
            <Text numberOfLines={3} style={[styles.secondlinestyle]}>{secondline}</Text>
          </View>
          {renderCounter()}
        </View>
      );
    };   

    const addonsList = () => {
      return (
        <View style={[styles.addonListContainer]}>
            <Text style={[styles.sectionTitle]}>{Languages.Addons}</Text>
            <View>
              {addonslist.map((addon, index ) => {
                return (
                  <View style={[styles.addonitemrow]}>
                    <View>
                      <Text style={[styles.addonitemtext]}>{addon.addon_name}</Text>
                      <Text style={[styles.addonitemtext, {color: Colors.lightgray}]}>+ {Languages.currency +Number(addon.addon_price).toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>addonlist(index)} style={[styles.addonplusbutton, {backgroundColor: addonslist[index].checked ? Colors.successgreen : '#E6E6E6' }]}>
                      <Icon 
                        name={addonslist[index].checked ? 'check' : 'plus'} 
                        size={17} 
                        light
                        color={addonslist[index].checked ? Colors.white : Colors.black}
                      />
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
        </View>
      );
    };   

    const portionsList = () => {
      return (
        <View style={[styles.addonListContainer]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={[styles.sectionTitle]}>{Languages.PortionSize}</Text>
            <View style={styles.requiredBadge}>
              <Text style={[styles.requiiredText]}>{Languages.Required}</Text>
            </View>
          </View>
            <RadioButton
                data={types}
                initial={1}
                box = {false}
                selectedBtn={(e) => {SetSelectedType(e)}}            
                animationTypes= {['pulse', 'shake', 'rotate']}
            />
        </View>
      );
    };   

    const textInput = () => {
      return (
        <View style={[styles.addonListContainer]}>
          <Text style={[styles.sectionTitle]}>{Languages.SpecialInstructions}</Text>
          <TextInput 
            value={preparationNote}
            placeholder={Languages.SpecialInstructionsHint}
            onChangeText={text => setpreparationNote(text)}
            style={[styles.textinput]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
          />
        </View>
      );
    }

    const renderImage = () => {
      return (
        <View style={{backgroundColor: Colors.white}}>
          <Image source={{ uri: image }} style={[styles.foodimage]}></Image>
        </View>
      );
    }
    
    return (
      <View>
        <ScrollView style={{backgroundColor: Colors.gray}}>
          {renderImage()}
          {title()}
          {addonsList()}
          {portionsList()}
          {textInput()}
          <View style={{height: 80, backgroundColor: Colors.white}}/>
        </ScrollView>
        {disablebutton ? null : 
          <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
              <CartButton total={total} action={AddToCart}/>
          </View>
        }
        <TouchableOpacity style={[styles.backIconcontainer]} onPress={()=>navigation.goBack()}>
          <Image source={Icons.fooditembackbutton} style={[styles.backIcon]}></Image>
        </TouchableOpacity>
      </View>
    );
};

export default App;