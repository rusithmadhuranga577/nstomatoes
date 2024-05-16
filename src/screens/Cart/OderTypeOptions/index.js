import React from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useNavigation } from '@react-navigation/native';
import { Url, Languages } from '@common';
import styles from '../styles';
import DeliveryInfoButton from '../DeliveryInfoButton/button';
import UserLocationMapView from '../Components/map';
import { showMessage } from "react-native-flash-message";
import axios from 'axios';
import SelectedRestaurent from './selectrestaurant';
import SetShedule from './setshedule';
import EstTimeComponent from '../EstTimeComponent/index';

const QueryString = require('query-string');

class OrderTypeOptions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            outofrange : false,
            ordertype : 0,
            userlat : 7.610,
            userlan : 80.658,
            useraddress : '',
            phonenumber : '',
            locationtype : '',
            cartprice : 0,
            deliveryduration : 0,
            city : '',
            email : '',
            fname : '',
            lname : '',
            outofrangealert : false,
            shedulecontainervisibility : false,
            date : '',
            time : '',
            selected_res_id : '',
            selected_res_data : [],
            shedule_type : 0,
            distance : 0,
            deliveryavailable : true,
        };
        this.getType = this.getType.bind(this);
        this.getNewRestaurant = this.getNewRestaurant.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    componentDidMount() {
        this.setInitialDateTime();
        this.getsharedpreferencesdata();

        const deliveryavailable = this.props.deliveryavailable;

        if(deliveryavailable == this.state.deliveryavailable){
            null
        }else{
            if(deliveryavailable == true){
                this.setState({deliveryavailable : deliveryavailable});
                this.changedeliverytype(0);
            }else if(deliveryavailable == false){
                this.setState({deliveryavailable : deliveryavailable});
                this.changedeliverytype(1);
            }
        }

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getsharedpreferencesdata();
            this.setInitialDateTime();

            const deliveryavailable = this.props.deliveryavailable;

            if(deliveryavailable == this.state.deliveryavailable){
                null
            }else{
                if(deliveryavailable == true){
                    this.setState({deliveryavailable : deliveryavailable});
                    this.changedeliverytype(0);
                }else if(deliveryavailable == false){
                    this.setState({deliveryavailable : deliveryavailable});
                    this.changedeliverytype(1);
                }
            }

        });
    }

    setInitialDateTime = () => {
        var t = new Date(); 
        var date = t.getDate();
        var month = t.getMonth()+1;
        var year = t.getFullYear();
        
        var hours = t.getHours();
        var minutes = t.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        var fulldate = `${year}-${month}-${date}`;

        this.setState({date : fulldate});
        this.setState({time : strTime});
    }

    getsharedpreferencesdata(){
        AsyncStorage.multiGet(['latitude', 'longitude', 'address', 'phonenumber', 'userlocation', 'cartprice', 'city', 'email', 'fname', 'lname'], (err, userdata) => {
            this.setState({userlat: userdata[0][1]})
            this.setState({userlan: userdata[1][1]})
            this.setState({useraddress: userdata[2][1]})
            this.setState({phonenumber: userdata[3][1]})
            this.setState({cartprice: userdata[5][1]})
            this.setState({city: userdata[6][1]})
            this.setState({email: userdata[7][1]})
            this.setState({fname: userdata[8][1]})
            this.setState({lname: userdata[9][1]})
            if(userdata[4] == 'outofdeliveryrange'){
                this.setState({ordertype : 1});
                this.setState({outofrange : true});
                this.setState({outofrangealert : true})
            }else{
                this.setState({ordertype : 0});
                this.setState({outofrange : false});
            }
        });
    }

    changedeliverytype(index){
        console.log('changedeliverytype ', index);
        this.setState({ordertype : index});

        var distance = this.state.distance;
        if(index == 0){
            this.props.onChangeState('Delivery', distance);
        }else if(index == 1){
            this.props.onChangeState('SelfPickup', distance);
        }else if(index == 2){
            this.props.onChangeState('DineIn', distance);
        }
    }

    componentDidUpdate() {
        this.getType();
        const old_res_id = this.state.selected_res_id;
        const new_res_id = this.props.res_id;
        const deliveryavailable = this.props.deliveryavailable;

        if(deliveryavailable == this.state.deliveryavailable){
            null
        }else{
            if(deliveryavailable == true){
                this.setState({deliveryavailable : deliveryavailable});
                this.changedeliverytype(0);
            }else if(deliveryavailable == false){
                this.setState({deliveryavailable : deliveryavailable});
                this.changedeliverytype(1);
            }
        }

        if(old_res_id != new_res_id){
            this.setState({selected_res_id : this.props.res_id});
            this.getNewRestaurantData(new_res_id);
        }
    }

    getNewRestaurantData = (id) => {
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : id
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            this.setState({selected_res_data : response.data});
        }).catch(error => {
            console.log(error);
        })
    }

    getType(){
        this.props.getType(this.state);
    }

    setordertype(type){
        this.state.ordertype = type
    }

    getNewRestaurant(value){
        this.props.getNewRestaurant(value);
    }

    setTime(datetime){
        this.props.setTime(datetime);
    }

    setNewDateTime=(array)=>{
        this.setState({date : array[0].date});
        this.setState({time : array[0].time});
    }

    DeliveryView({lat, lan, address, phonenumber}){
        {
            return(
                <View>
                    <DeliveryInfoButton icon={'map-marker-alt'} title={Languages.DeliveryAddress} subtext={address} page={'LocationSettings'}/>
                    <UserLocationMapView latitude={lat} longitude={lan} getTime={(time)=>this.setState({deliveryduration: time})}/>
                    <DeliveryInfoButton icon={'phone'} title={Languages.DeliveryContact} subtext={phonenumber}/>
                </View>
            );
        }
    }

    onTabPress = (index) => {
        const carttype = this.props.carttype;
        const deliveryavailable = this.props.deliveryavailable;
        if(index == 0){
            deliveryavailable ? 
            this.changedeliverytype(index)
            : 
            showMessage({
                message: "Delivery not available for your location",
                type: "danger",
                icon : 'danger',
                duration : 3000
            });
        }else if(index == 1){
            this.changedeliverytype(index)
        }else if(index == 2){
            if(carttype == 'grocery'){
                showMessage({
                    message: "Dine in not available for grocery",
                    type: "danger",
                    icon : 'danger',
                    duration : 3000
                });
            }else{
                this.changedeliverytype(index)
            }
        }
    }

    render(){
        const {navigation} = this.props;
        const u_lat = this.state.userlat;
        const u_lan = this.state.userlan;
        const shedulevisibility = this.state.shedulecontainervisibility;
        const mode0 = [Languages.Delivery, Languages.SelfPickup, Languages.DineIn];
        const mode1 = [Languages.SelfPickup, Languages.DineIn];
        const deliveryavailable = this.props.deliveryavailable;
        return(
            <View>
                <SegmentedControlTab
                    values={mode0}
                    selectedIndex={this.state.ordertype}
                    onTabPress={(type)=>{this.onTabPress(type)}}
                    tabsContainerStyle={[styles.tabscontainerstyle]}
                    tabStyle={[styles.tabstyle]}
                    activeTabStyle={[styles.activetabstyle]}
                    tabTextStyle={[styles.tabtextstyle]}
                    activeTabTextStyle={[styles.activetabtextstyle]}
                />
                {deliveryavailable ? null:
                    <View style={[styles.alertbar]}>
                        <Text style={[styles.alerttitle]}>{Languages.TooFar}</Text>
                        <Text style={[styles.alertsubtitle]} onPress={()=>navigation.navigate('LocationSettings', {logged : 1, cart : 1})}>{Languages.ChangeLocation2}</Text>
                    </View>
                }
                {this.state.ordertype == 0 ?
                <View>
                    {/* <SelectedRestaurent restaurantname={this.props.restaurantname} date={''} time={''} getSelectedRestaurant={(value)=>this.getNewRestaurant(value)} ulat={u_lat} ulan={u_lan} type={this.props.restauranttype}/> */}
                    {/* <DeliveryInfoButton icon={'shopping-store'} date={''} time={''} title={Languages.SelectedRestaurent} subtext={this.props.restaurantname} page={''} arrow={false}/> */}
                    <DeliveryInfoButton icon={'map-marker-alt'} date={''} time={''} title={Languages.DeliveryAddress} subtext={this.state.useraddress} page={'LocationSettings'}/>
                    <UserLocationMapView latitude={this.state.userlat} date={''} time={''} longitude={this.state.userlan} getTime={(time)=>this.setState({deliveryduration: time})} getDistance={(distance)=>{this.props.getDistance(distance); this.setState({distance : distance})}}/>
                    <DeliveryInfoButton icon={'phone'} date={''} time={''} title={Languages.DeliveryContact} subtext={this.state.phonenumber} page={'PhoneNumberChange'}/>
                    <EstTimeComponent text={this.props.est_time} res_id={this.props.res_id} ulat={this.state.userlat} ulan={this.state.userlan}/>
                    <DeliveryInfoButton icon={'calendar'} title={Languages.SelectShedule} date={this.state.date} time={this.state.time} selected_shedule_type={this.state.shedule_type} page={'Schedule'} sheduleaction={()=>this.setState({shedulecontainervisibility : !shedulevisibility})}/>
                </View> : null}
                {this.state.ordertype == 1 ?
                <View>
                    <SelectedRestaurent restaurantname={this.props.restaurantname} date={''} time={''} getSelectedRestaurant={(value)=>this.getNewRestaurant(value)} ulat={u_lat} ulan={u_lan} type={this.props.restauranttype}/>
                    <DeliveryInfoButton icon={'phone'} date={''} time={''} title={Languages.DeliveryContact} subtext={this.state.phonenumber} page={'PhoneNumberChange'}/>
                    <DeliveryInfoButton icon={'calendar'} title={Languages.SelectShedule} date={this.state.date} time={this.state.time} selected_shedule_type={this.state.shedule_type}  page={'Schedule'} sheduleaction={()=>this.setState({shedulecontainervisibility : !shedulevisibility})}/>
                </View> : null}
                {this.state.ordertype == 2 ?
                <View>
                    <SelectedRestaurent restaurantname={this.props.restaurantname} date={''} time={''} getSelectedRestaurant={(value)=>this.getNewRestaurant(value)} ulat={u_lat} ulan={u_lan} type={this.props.restauranttype}/>
                    <DeliveryInfoButton icon={'phone'} date={''} time={''} title={Languages.DeliveryContact} subtext={this.state.phonenumber} page={'PhoneNumberChange'}/>
                    <DeliveryInfoButton icon={'calendar'} title={Languages.SelectShedule} date={this.state.date} time={this.state.time} selected_shedule_type={this.state.shedule_type}  page={'Schedule'} sheduleaction={()=>this.setState({shedulecontainervisibility : !shedulevisibility})}/>
                </View> : null}
                {shedulevisibility ? 
                <SetShedule res_data={this.state.selected_res_data} hideView={(state)=>this.setState({shedulecontainervisibility : state})} getData={(data)=>(this.setNewDateTime(data))} selectedSheduletype={this.state.shedule_type} changeSheduleType={(value)=>{this.setState({shedule_type : value})}}/>:null}
            </View>
        );
    };
}

OrderTypeOptions.propTypes = {
    getType: PropTypes.func,
};

export default function(props){
    const navigation = useNavigation();
    return <OrderTypeOptions {...props} navigation={navigation} />;
} 