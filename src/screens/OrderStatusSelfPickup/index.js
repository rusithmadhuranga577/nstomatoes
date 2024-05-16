import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import { Languages, Store } from '@common';
import { useNavigation } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import { CustomAlert, CustomAlertButton } from '@components';
import {Images} from '@common';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import StepIndicatorStyle from './stepindicatorstyle';
import OrderStatusText from './orderstatustext';
import OrderStatusImage from './orderstatusimage';
import BottomDrawer from './BottomDrawer/bottomdrawer';
import EstTimeComponent from './EstTimeComponent';

class OrderStatusSelfPickup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            labels : ["Pending","Confirmed","Preparing","Prepared","Driver Picked","Delivered"],
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
        };
    }

    async componentDidMount(){
        this.setState({routeparams : this.props.route.params});
        this.playing = !this.playing;
        this.getfirestoredata();
    }

    getfirestoredata=async()=>{
        const orderid = this.props.route.params.orderid;
        const subscriber = firestore()
        .collection('orders')
            .doc(orderid.toString())
            .onSnapshot(documentSnapshot => {
                if(documentSnapshot.data()){
                    this.setState({orderavailable : true});
                    const state = documentSnapshot.data().status;
                    const driverid = documentSnapshot.data().driver_id;
                    console.log(driverid);
                    this.setState({currentPosition : state});
                    this.setState({driverid : driverid});
                    this.setState({ordertype : documentSnapshot.data().ordertype});
                    this.setState({esttime : documentSnapshot.data().estimated_time});
                    if(state == 6){
                        this.endService()
                    }
                }else{
                    this.setState({orderavailable : false});
                    console.log('no data')
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
                    <EstTimeComponent orderid={orderid}/>
                    <View style={[styles.stepindicatorholder]}>
                        <StepIndicator
                            customStyles={StepIndicatorStyle}
                            currentPosition={this.state.currentPosition}
                            stepCount = {4}
                        />
                    </View>
                    <View style={[styles.ordertypecontainer]}>
                        <Text style={[styles.ordertype]}>{this.state.ordertype} {Languages.Order}</Text>
                    </View>
                    <OrderStatusText status={status}/>
                    <OrderStatusImage status={status} orderid={this.props.route.params.orderid} driverid={this.state.driverid}/>
                    <BottomDrawer status={status} orderid={this.props.route.params.orderid} driverid={this.state.driverid}/>
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
    return <OrderStatusSelfPickup {...props} navigation={navigation} />;
} 
