import React from 'react';
import { View, Text, Image, Linking, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import BottomDrawer from 'react-native-bottom-drawer-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Constants, Languages, Images, Url } from '@common';
import styles from './styles';
import OrderItemView from './orderitemview';
import OrderChargesView from './orderchargesview';
import firestore from '@react-native-firebase/firestore';
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
            driver : []
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
            console.log('Item Data',response.data.order)
            this.setState({cartitems : response.data.order})
        }).catch(error => {
            console.log(error);
        });

        const status = this.props.status;
        if(status == 4){
            this.getdriverlocation();
        }
    }

    componentDidUpdate(){
        const oldstatus = this.state.status;
        const status = this.props.status;
        if(oldstatus != status){
            this.setState({status : status});
            if(status == 4){
                this.getdriverlocation();
            }
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
        return (
            <View style={[styles.container]}>
                <View  style={[styles.slidertopcontainer]}>
                <View style={[styles.slidertopcontainerhandle]}></View>
                    <View style={{ flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems:'center', paddingTop: 5}}>
                    </View>
                </View>
                <ScrollView>
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
                </ScrollView>
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
            </BottomDrawer>
        )
    }
}