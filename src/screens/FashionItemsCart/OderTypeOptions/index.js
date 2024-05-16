import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useNavigation } from '@react-navigation/native';
import { Url, Languages } from '@common';
import styles from '../styles';
import DeliveryInfoButton from '../DeliveryInfoButton/button';
import UserLocationMapView from '../Components/map';
import axios from 'axios';
import SetShedule from './setshedule';

const QueryString = require('query-string');

class OrderTypeOptions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            outofrange : false,
            ordertype : 0,
            user_addressline1 : 0,
            user_addressline2 : 0,
            useraddress : '',
            fulladdress : '',
            phonenumber : '',
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
            infohave : false
        };
        this.getType = this.getType.bind(this);
        this.getNewRestaurant = this.getNewRestaurant.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    componentDidMount() {
        this.getType();
        this.setInitialDateTime();
        this.getsharedpreferencesdata();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getsharedpreferencesdata();
            this.setInitialDateTime();
        });
    }

    setInitialDateTime = () => {
        var t = new Date(); 

        var date = t.getDate();
        var month = t.getMonth()+1;
        var year = t.getFullYear()
        
        var hours = t.getHours();
        var minutes = t.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        var fulldate = `${year}-${month}-${date}`;

        this.setState({date : fulldate});
        this.setState({time : strTime});
    }

    getsharedpreferencesdata(){
        const {navigation} = this.props;
        AsyncStorage.multiGet(['user_addressline1', 'user_addressline2', 'user_deliverycontact', 'user_city', 'cartprice', 'email', 'fname', 'lname'], (err, userdata) => {
            if(userdata[0][1] == null || userdata[1][1] == null || userdata[2][1] == null || userdata[3][1] == null){
                this.setState({user_addressline1: ''});
                this.setState({user_addressline2: ''});
                this.setState({phonenumber: ''});
                this.setState({city: ''});
                this.setState({fulladdress : Languages.ClickHereToAddDelivery});
                this.setState({infohave : false});
            }else{
                this.setState({user_addressline1: userdata[0][1]});
                this.setState({user_addressline2: userdata[1][1]});
                this.setState({phonenumber: userdata[2][1]});
                this.setState({city: userdata[3][1]});
                this.setState({fulladdress : `${userdata[6][1]} ${userdata[7][1]} \n${userdata[0][1]}, ${userdata[1][1]}, ${userdata[3][1]} \n${userdata[2][1]} `});
                this.setState({useraddress : `${userdata[0][1]}, ${userdata[1][1]}, ${userdata[3][1]}`});
                this.setState({infohave : true});
            }

            this.setState({cartprice: userdata[4][1]});
            this.setState({email: userdata[5][1]});
            this.setState({fname: userdata[6][1]});
            this.setState({lname: userdata[7][1]});
        });
    }

    changedeliverytype(index){
        if(index == 0){
            this.setState({ordertype : index});
        }else{
            this.setState({ordertype : index});
        }
        console.log(index);
        if(index == 0){
            this.props.onChangeState('Delivery');
        }else if(index == 1){
            this.props.onChangeState('SelfPickup');
        }else if(index == 2){
            this.props.onChangeState('DineIn');
        }
    }

    componentDidUpdate() {
        this.getType();
        const old_res_id = this.state.selected_res_id;
        const new_res_id = this.props.res_id;

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
            console.log('RSETAURANT DATA',response.data);
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
                    <DeliveryInfoButton icon={'map-marker-alt'} title={Languages.DeliveryInfo} subtext={address} page={'LocationSettings'}/>
                    <UserLocationMapView latitude={lat} longitude={lan} getTime={(time)=>this.setState({deliveryduration: time})}/>
                    <DeliveryInfoButton icon={'phone'} title={Languages.DeliveryContact} subtext={phonenumber}/>
                </View>
            );
        }
    }

    render(){
        const shedulevisibility = this.state.shedulecontainervisibility;
        return(
            <View>
                <SegmentedControlTab
                    values={[Languages.Delivery, Languages.SelfPickup]}
                    selectedIndex={this.state.ordertype}
                    onTabPress={(type)=>this.changedeliverytype(type)}
                    tabsContainerStyle={[styles.tabscontainerstyle]}
                    tabStyle={[styles.tabstyle]}
                    activeTabStyle={[styles.activetabstyle]}
                    tabTextStyle={[styles.tabtextstyle]}
                    activeTabTextStyle={[styles.activetabtextstyle]}
                />
                {this.state.ordertype == 0 ?
                <View>
                    <DeliveryInfoButton icon={'map-marker-alt'} date={''} time={''} title={Languages.DeliveryInfo} subtext={this.state.fulladdress} page={'SetAddress'}/>
                    <DeliveryInfoButton icon={'clock'} date={''} time={''} title={Languages.EstTime} subtext={this.state.selected_res_data.fashion_delivery_time} page={''} arrow={false}/>
                </View> : null}
                {this.state.ordertype == 1 ?
                <View style={{marginTop : 20}}>
                </View> : null}

                {shedulevisibility ? 
                <SetShedule res_data={this.state.selected_res_data} hideView={(state)=>this.setState({shedulecontainervisibility : state})} getData={(data)=>(this.setNewDateTime(data))}/>:null}
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