import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import { Languages } from '@common';
import { useNavigation } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import { CustomAlert, CustomAlertButton } from '@components';
import {Images, Url, Store} from '@common';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import StepIndicatorStyle from './stepindicatorstyle';
import OrderStatusText from './orderstatustext';
import OrderStatusImage from './orderstatusimage';
import BottomDrawer from './BottomDrawer/bottomdrawer';
import EstTimeComponent from './EstTimeComponent';
import axios from 'axios';

const QueryString = require('query-string');

class OrderStatus extends React.Component{
    options = {
        taskName: Store.storename,
        taskTitle: 'Ongoing Order',
        taskDesc: `Your Order Is`,
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#fff',
        linkingURI: 'nstomatoes://', // See Deep Linking for more info
    }

    constructor(props) {
        super(props);
        this.state = {
            labels : ["Pending","Confirmed","Preparing","Prepared","Driver Picked","Delivered"],
            labels_2 : ["Pending","Confirmed","Preparing","Prepared","Driver Picked","Delivered"],
            currentPosition: 0,
            curruntOrderStatus : 'Pending',
            routeparams : [],
            driverid : 0,
            drivername : Store.storename,
            esttime : 0,
            ordernotplacedalert : false,
            orderavailable : true,
            customerservicenumber : '0719937570',
            ordertype : '',
            restaurant_data : []
        };
    }

    async componentDidMount(){
        this.setState({routeparams : this.props.route.params});
        this.getfirestoredata();
    }

    getfirestoredata=async()=>{
        const { navigation } = this.props;
        const orderid = this.props.route.params.orderid;
        const subscriber = firestore()
        .collection('orders')
            .doc(orderid.toString())
            .onSnapshot(documentSnapshot => {
                if(documentSnapshot.data()){
                    console.log('DRIVER ID',documentSnapshot.data().driver_id)
                    this.setState({orderavailable : true});
                    const state = documentSnapshot.data().status;
                    const driverid = documentSnapshot.data().driver_id;
                    this.setState({currentPosition : state});
                    this.setState({driverid : driverid});
                    this.setState({ordertype : documentSnapshot.data().ordertype});
                    this.setState({esttime : documentSnapshot.data().estimated_time});
                    this.getRestaurantDetails(documentSnapshot.data().restuarant_id)
                    if(this.state.currentPosition == 6){
                        this.endService()
                    }else if(state == 9){
                        navigation.replace('OrderCanceledScreen');
                    }
                }else{
                    this.setState({orderavailable : false});
                }
        }); 
        return () => subscriber();
    }

    endService=()=>{
        const orderid = this.props.route.params.orderid;
        const { navigation } = this.props;
        setTimeout(() => {
            navigation.replace('RateOrder', {title : `#${orderid} Order`, orderid : orderid})
        }, 3000);
    }

    onPageChange(position){
        this.setState({currentPosition: position});
    }

    getRestaurantDetails = (id) => {
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : id
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            this.setState({restaurant_data : response.data});
        }).catch(error => {
            console.log(error);
        });
    }

    openMapFunction = () => {
        const res_data = this.state.restaurant_data;
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${res_data.map_latitude},${res_data.map_longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

            
        Linking.openURL(url);
    }

    render(){ 
        let status = this.state.currentPosition;
        const alertstate = this.state.ordernotplacedalert;
        const phonenumber = this.state.customerservicenumber;
        const orderavailable = this.state.orderavailable;
        const orderid = this.props.route.params.orderid;
        return(
            <View>
                {orderavailable ? 
                <View style={[styles.container]}>
                    {this.state.ordertype == 'Delivery' ? <EstTimeComponent orderid={orderid} ordertype={this.state.ordertype}/> : 
                    <>
                        {status >= 3 ? null : <EstTimeComponent orderid={orderid} ordertype={this.state.ordertype}/>}
                    </>}
                    <View style={[styles.stepindicatorholder]}>
                        <StepIndicator
                            customStyles={StepIndicatorStyle}
                            currentPosition={this.state.currentPosition}
                            stepCount = {this.state.ordertype == 'Delivery' ? 6 : 4}
                        />
                    </View>
                    <View style={[styles.ordertypecontainer]}>
                        <Text style={[styles.ordertype]}>{this.state.ordertype}</Text>
                    </View>
                    <OrderStatusText status={status} type={this.state.ordertype}/>
                    <OrderStatusImage status={status} orderid={this.props.route.params.orderid} driverid={this.state.driverid}/>
                    <BottomDrawer ordertype={this.state.ordertype} res_data={this.state.restaurant_data} status={status} orderid={this.props.route.params.orderid} driverid={this.state.driverid}/>
                </View> : 
                <View style={[styles.orderfailedcontainer]}>
                    <View style={[styles.orderfailedimagecontainer]}>
                        <Image source={Images.orderplacefailed} style={{width : '100%', height : '100%'}}/>
                    </View>
                </View>}
                {/*Alert Message*/}
                <CustomAlert
                        displayMode={'alert'}
                        displayMsg={Languages.AppearsOrderNotPlaced}
                        displaymsgtitle={Languages.Alert}
                        visibility={alertstate}
                        dismissAlert={this.closeordernotplacedalert}
                        cancellable={true}
                        buttons={(
                            <>
                            <CustomAlertButton buttontitle={Languages.Retry} theme={'alert'} buttonaction={()=>this.retryFunction()}/>
                            <CustomAlertButton buttontitle={Languages.CallUs} theme={'inverse'} buttonaction={()=>Linking.openURL(`tel:${phonenumber}`)}/>
                            </>
                        )}
                    />
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <OrderStatus {...props} navigation={navigation} />;
} 
