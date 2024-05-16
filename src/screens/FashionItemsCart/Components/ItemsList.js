import React from 'react';
import {View, Text, FlatList, ScrollView, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Languages } from '@common';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomAlertButton, CustomAlert } from '@components';
import styles from '../styles';
import { showMessage } from "react-native-flash-message";
import SectionTitleStrip from './SectionTitleStrip';

class ItemsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cartitems : [],
            removeitemalert : false,
            clickeditemid : 0,
            clearcartalert : false
        };
    }

    componentDidMount(){
        AsyncStorage.getItem('cartitems', (err, cartitems)=>{
            this.setState({cartitems : JSON.parse(cartitems)});
            this.props.getItemList(cartitems);
        })
    }
    
    RenderAddonItem = (item) => {
        return(
            <Text numberOfLines={1} style={[styles.cartitemaddon]}>{item.name} {item.price == 0 ? null : `(${Languages.Rs} ${item.price})`}</Text>
        );
    }

    RenderAddonItem2 = (item) => {
        return(
            <Text numberOfLines={1} style={[styles.cartitemaddon, {color : '#aaa'}]}>{item.name} {item.price == 0 ? null : `(${Languages.Rs} ${item.price})`}</Text>
        );
    }

    onRemoveButtonClick = () => {
        const cartitems = this.state.cartitems;
        if(cartitems.length > 1){
            this.setState({removeitemalert : true});
        }else{
            this.setState({clearcartalert : true});
        }
    }

    removeItemFromArray = (food_items_id) => {
        const {navigation} = this.props;
        const type = this.props.type;
        const cartitems = this.state.cartitems;
        if(cartitems.length > 1){
            var newcartitems = [];
            console.log(cartitems);
            var newArray = cartitems.filter((item) => item.food_items_id !== food_items_id);
            console.log(newArray);
            this.setState({cartitems : newArray});
            newcartitems = newArray;
    
            var total = 0;
            for(let i=0; i < newcartitems.length; i++){
                total = newcartitems[i].item_type_price + total;
            }
            console.log(total);
            AsyncStorage.setItem('cartprice', total + '');
            AsyncStorage.setItem('cartitems', JSON.stringify(newcartitems));
            this.setState({removeitemalert : false});
            navigation.replace('EmptyScreen', {type : type});
        }else{
            this.setState({clearcartalert : true});
        }
        
    }

    ClearCartAndBack = () => {
        AsyncStorage.removeItem('cartitems');
        AsyncStorage.removeItem('cartprice');
        AsyncStorage.removeItem('cartqty');
        AsyncStorage.removeItem('cartrestaurantid');
        AsyncStorage.removeItem('appliedpromo');
        showMessage({
            message: "Cart cleared",
            type: "success",
            icon : 'success',
            duration : 2000
        });
        this.props.navigation.goBack();
        this.setState({clearcartalert : false});
    }

    RenderCartItem = (item, index) => {
        return(
            <View style={[styles.cartitemcontainer]}>
                <View style={[styles.cartitemimageholder]}>
                    <Image source={{uri : item.item_image}} style={[styles.cartitemimage]}/>
                </View>
                <View style={{width : '60%'}}>
                    <Text numberOfLines={1} style={[styles.cartitemtitle]}>{item.item_name}</Text>
                    <Text numberOfLines={1} style={[styles.cartitemportion]}>{item.item_type_name}({Languages.Rs}{item.item_type_price} × {item.item_qty})</Text>
                    {item.addons.length ?
                        <ScrollView style={{marginTop : 5, width : '80%'}}>
                            <FlatList
                                itemDimension={80}
                                staticDimension={300}
                                fixed
                                spacing={5}
                                data={item.addons}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => this.RenderAddonItem(item)}
                            />
                        </ScrollView> : null}
                    {item.item_Preparation_note ? <Text numberOfLines={1} style={[styles.cartitempreparationnote]}>Notes : {item.item_Preparation_note}</Text> : null}
                </View>
                <Text numberOfLines={1} style={[styles.cartitemtotal]}>{Languages.Rs}{Number(item.item_total).toFixed(2)}</Text>
                <TouchableOpacity onPress={()=>{this.setState({clickeditemid : item.food_items_id}), this.onRemoveButtonClick()}} style={{position: 'absolute', top : 10, right : 10}}>
                    <Icon name={'close-circle-outline'} size={20} color={'red'}/>
                </TouchableOpacity>
            </View>
        );
    }

    RenderCartItem2 = (item, index) => {
        return(
            <View style={[styles.cartitemcontainer2]}>
                <View style={[styles.cartitemimageholder]}>
                    <Image source={{uri : item.item_image}} style={[styles.cartitemimage, {opacity : 0.5}]}/>
                </View>
                <View style={{width : '60%'}}>
                    <Text numberOfLines={1} style={[styles.cartitemtitle, {color : '#aaa'}]}>{item.item_name}</Text>
                    <Text numberOfLines={1} style={[styles.cartitemportion, {color : '#aaa'}]}>{item.item_type_name}({Languages.Rs}{item.item_type_price} × {item.item_qty})</Text>
                    <Text numberOfLines={1} style={[styles.cartitemportion, {color : 'red', fontSize : 15}]}>Not Available Right Now</Text>
                    
                    {item.item_Preparation_note ? <Text numberOfLines={1} style={[styles.cartitempreparationnote]}>Notes : {item.item_Preparation_note}</Text> : null}
                </View>
                <Text numberOfLines={1} style={[styles.cartitemtotal]}>{Languages.Rs}{Number(item.item_total).toFixed(2)}</Text>
                <TouchableOpacity onPress={()=>{this.setState({clickeditemid : item.food_items_id}), this.onRemoveButtonClick()}} style={{position: 'absolute', top : 10, right : 10}}>
                    <Icon name={'trash-outline'} size={20} color={'red'}/>
                </TouchableOpacity>
            </View>
        );
    }

    render(){
        const availableitems = this.props.cartItems;
        const unavailableitems = this.props.unavailableitems;
        return(
            <View style={{width : '100%', backgroundColor : '#aaa'}}>
                {availableitems.length > 0 ?
                <>
                <SectionTitleStrip action={()=>this.props.setClearCartAlert(true)} setClearCartAlert={()=>this.props.setClearCartAlert(true)}/>
                <FlatList
                    itemDimension={80}
                    staticDimension={300}
                    fixed
                    spacing={5}
                    data={this.props.cartItems}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => this.RenderCartItem(item, index)}
                />
                </>:null}
            
            {unavailableitems.length > 0 ?
            <>
            <View style={[styles.sectiontitlestrip]}>
                <Text style={[styles.sectiontitlestriptext]}>Unavailable Items</Text>
            </View>
            <FlatList
                itemDimension={80}
                staticDimension={300}
                fixed
                spacing={5}
                data={this.props.unavailableitems}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => this.RenderCartItem2(item, index)}
            />
            </>:null}
    
            <CustomAlert
                displayMode={'alert'}
                displayMsg={Languages.DoYouWantToRemoveThisItem}
                visibility={this.state.removeitemalert}
                cancellable={false}
                buttons={(
                <>
                    <CustomAlertButton buttontitle={Languages.Ok} theme={'alert'} buttonaction={()=>{this.removeItemFromArray(this.state.clickeditemid)}}/>
                    <CustomAlertButton buttontitle={Languages.Cancel} theme={'inverse'} buttonaction={()=>{this.setState({removeitemalert : false})}}/>
                </>
                )}>
            </CustomAlert>
    
            <CustomAlert
                displayMode={'alert'}
                displayMsg={Languages.ClearCart}
                displaymsgtitle={Languages.AreYouSure}
                visibility={this.state.clearcartalert}
                cancellable={false}
                buttons={(
                <>
                    <CustomAlertButton buttontitle={Languages.Yes} theme={'alert'} buttonaction={this.ClearCartAndBack}/>
                    <CustomAlertButton buttontitle={Languages.Cancel} theme={'inverse'} buttonaction={()=>this.setState({clearcartalert : false})}/>
                </>
                )}>
            </CustomAlert>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <ItemsList {...props} navigation={navigation} />;
} 