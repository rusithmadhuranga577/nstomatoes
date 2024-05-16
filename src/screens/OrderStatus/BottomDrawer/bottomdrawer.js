import React from 'react';
import { View, Text, Image, Linking, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import BottomDrawer from 'react-native-bottom-drawer-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { Colors, Images, Url, Languages } from '@common';
import styles from './styles';
import OrderItemView from './orderitemview';
import OrderChargesView from './orderchargesview';
import firestore from '@react-native-firebase/firestore';
import { CustomAlert, CustomAlertButton } from '@components';
import axios from 'axios';

const QueryString = require('query-string');
const height = Dimensions.get('screen').height;

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cartitems : [],
            status : null,
            drivername : '',
            phone : '',
            profilepicture : '',
            driver : [],
            driverid : '',
            loading : false,
            cancelpopup : false,
            orderdata : [],
        };
    }

    componentDidMount(){
        axios.post(Url.getorderdetailsurl, 
        QueryString.stringify({
            orderid : this.props.orderid
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            console.log(response.data.order.delivery_address)
            this.setState({cartitems : response.data.order});
            this.setState({orderdata : response.data.order});
        }).catch(error => {
            console.log(error);
        });

        const status = this.props.status;
        this.getdriverlocation();
    }

    componentDidUpdate(){
        const oldstatus = this.state.status;
        const status = this.props.status;
        const driverid = this.props.driverid;
        const old_driverid = this.state.driverid;
        if(oldstatus != status){
            this.setState({status : status});
            if(status == 4){
                this.getdriverlocation();
            }
        }
        if(driverid != old_driverid){
            this.getdriverlocation();
            this.setState({driverid : driverid});
        }
    }

    getdriverlocation=()=>{
        const status = this.props.status;
        console.log(status)
        const driverid = this.props.driverid;
        if(status == 4){
            const subscriber = firestore()
            .collection('drivers')
            .doc(driverid.toString())
            .onSnapshot(documentSnapshot => {
                const data = documentSnapshot.data();
                if(documentSnapshot.data()){
                    this.setState({driver : data});
                }else{
                    console.log(' No Driver', documentSnapshot.data());
                }
            });
            return () => subscriber();
        }
    }

    openMapFunction = () => {
        const res_data = this.props.res_data;
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${res_data.map_latitude},${res_data.map_longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url);
    }

    closeLoginPopup = () => {
        this.setState({cancelpopup : false});
    }
      
    openLoginPopup = () => {
        this.setState({cancelpopup : true});
    }

    cancelFunction = () => {
        const orderid = this.props.orderid;
        const res_data = this.props.res_data;

        axios.post(Url.cancelorderurl, 
        QueryString.stringify({
            order_id : orderid,
            restaurant_id : res_data.id,
            status : 9,
            cancle_reason : 'Order canceled by the customer',
            cancled_by : 'Customer',
            cancle_notes : ''
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
            this.setState({loading : false});
        })
    }

    renderAlerts = () => {
        const cancelpopup = this.state.cancelpopup;
        return(
          <>
          <CustomAlert
            displayMode={'error'}
            displayMsg={Languages.CancelThisOrder}
            displaymsgtitle={Languages.AreYouSure}
            visibility={cancelpopup}
            dismissAlert={this.closeLoginPopup}
            cancellable={false}
            buttons={(
              <>
                <CustomAlertButton buttontitle={'Cancel Order'} theme={'error'} buttonaction={this.cancelFunction}/>
                <CustomAlertButton buttontitle={Languages.Cancel} theme={'inverse'} buttonaction={this.closeLoginPopup}/>
              </>
            )}
          />   
          </>
        );
    }

    RenderDriverinfoContainer = () => {
        const driver = this.state.driver;
        return (
            <View style={[styles.driverinfocontainer]}>
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Image source={{uri : driver.profile_picture}} style={[styles.imageholder]}/>
                    <View style={{width : '75%'}}>
                        <View style={{width : '100%', padding : 5}}>
                            <Text numberOfLines={1} style={[styles.drivernametext]}>{driver.driver_name}</Text>
                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                <View style={[styles.driverratebar]}>
                                    <Icon name={'star'} size={14} color={Colors.alertyellow} style={{marginBottom : 2}}/>
                                    <Text style={[styles.driverratetext]}>{driver.rating}</Text>
                                </View>
                                <Text style={[styles.driverratetext]}>|</Text>
                                <View style={[styles.driverratebar, {marginLeft : 10}]}>
                                    <Icon name={'car-sport'} size={15}/>
                                    <Text style={[styles.driverratetext]}>{driver.license_plate}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10}}>
                                <TouchableOpacity style={[styles.callbuttoncontainer]} onPress={()=>Linking.openURL(`tel:${driver.phone}`)}>
                                    <Icon name={'call'} size={14} color={Colors.black} style={{marginBottom : 2}}/>
                                </TouchableOpacity>
                                <Text style={[styles.driverratetext]}>{driver.phone}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.separator]}/>
            </View>
        )
    }

    renderContent = () => {
        let status = this.props.status;
        const cartitems = this.state.cartitems;
        const orderdata = this.state.orderdata;
        const res_data = this.props.res_data;
        return (
            <View style={[styles.container]}>
                <View  style={[styles.slidertopcontainer]}>
                <View style={[styles.slidertopcontainerhandle]}></View>
                    <View style={{ flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems:'center', paddingTop: 5}}>
                    </View>
                </View>
                <View style={{width : '100%', padding : 10, flexDirection : 'row', justifyContent : 'space-between', marginBottom : 5, alignItems : 'center'}}>
                    <View style={{width : '70%', flexDirection : 'row', alignItems : 'center'}}>
                        <Icon2 name={'shopping-store'} size={25} style={{marginRight : 15}}/>
                        <View>
                            <Text style={[styles.restaurantname]} numberOfLines={2}>{res_data.name}</Text>
                            <Text style={[styles.restaurantsecondline]} numberOfLines={2}>{res_data.address_line_1}, {res_data.address_line_2}, {res_data.city}</Text>
                        </View>
                    </View>
                    <View>
                        <Icon name={'call'} size={25} color={Colors.black} onPress={()=>Linking.openURL(`tel:${res_data.hotline}`)}/>
                        {this.props.ordertype != 'Delivery' ?
                        <TouchableOpacity onPress={this.openMapFunction} style={{width : 28, height : 28, alignSelf : 'flex-end', marginTop : 10}}>
                            <Image source={Images.Direction} style={{width: '100%', height : '100%'}}/>
                        </TouchableOpacity>:null}
                    </View>
                </View>

                <View style={{width : '100%', height : 5, backgroundColor : Colors.gray, marginBottom : 5}}/>
                <TouchableOpacity activeOpacity={1}>
                    <ScrollView>
                        <View style={{width : '100%', padding : 10, flexDirection : 'row', justifyContent : 'space-between', marginBottom : 5, alignItems : 'center'}}>
                            <View style={{width : '70%', flexDirection : 'row', alignItems : 'center'}}>
                                <Icon2 name={'home'} size={25} style={{marginRight : 15}}/>
                                <View>
                                    <Text style={[styles.restaurantname]} numberOfLines={2}>{orderdata.delivery_name}</Text>
                                    <Text style={[styles.restaurantsecondline]} numberOfLines={2}>{orderdata.delivery_address}</Text>
                                    <Text style={[styles.restaurantsecondline]} numberOfLines={2}>{orderdata.delivery_phone}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width : '100%', height : 5, backgroundColor : Colors.gray, marginBottom : 5}}/>
                        {status == 4 ? this.RenderDriverinfoContainer() : null}
                        <View style={{width : '100%', backgroundColor : Colors.white}}>
                            <TouchableOpacity activeOpacity={1} >
                                <FlatList
                                    itemDimension={80}
                                    staticDimension={300}
                                    fixed
                                    spacing={5}
                                    ItemSeparatorComponent={()=>(<View style={[styles.separator]}/>)}
                                    data={cartitems.orderitems}
                                    key={item => item.id}
                                    renderItem={({ item }) => OrderItemView(item)}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.separator]}/>
                        <OrderChargesView cartitemdata={cartitems}/>

                        {status == 0 ?
                        <TouchableOpacity onPress={this.openLoginPopup} style={[styles.cancelbutton]}>
                            <Text style={[styles.cancelbuttontext]}>{Languages.CancelOrder}</Text>
                        </TouchableOpacity> 
                        : 
                        <View>
                            <Text style={[styles.ifyouwant]}>{Languages.IfYouWantToCancelThisOrder}</Text>
                            <Text onPress={()=>Linking.openURL(`tel:${'+94751200200'}`)} style={[styles.ifyouwant, {color : Colors.black}]}>+94751200200</Text>
                        </View>
                        }

                        <View style={{height : 300}}/>
                    </ScrollView>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <BottomDrawer
                containerHeight={height-200}
                offset={60}
                startUp={false}
                shadow={true}
            >
                {this.renderContent()}
                {this.renderAlerts()}
            </BottomDrawer>
        )
    }
}