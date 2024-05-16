import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Languages, Colors, Url } from '@common';
import { LoadingComponent, Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import styles from './styles';
import OrderRate from './orderrate';
import DriverRate from './driverrate';
import ItemsList from './ItemsList';
import axios from 'axios';
import HeaderBar from './headerbar';
import Comment from './comment';

const QueryString = require('query-string');

class RateOrder extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            itemsratingarray : [],
            orderrate : 5,
            driverrate : 5,
            orderitems : [],
            restaurant : [],
            driver : null,
            comment : '',

            showitems : false,
            loading : false
        };
    }

    componentDidMount(){
        this.setState({loading : true});
        const route = this.props.route.params;
        const orderid = route.orderid;
        axios.post(Url.orderdetailsforreviewurl, 
        QueryString.stringify({
            orderid : orderid
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            const orderitems = response.data.order.orderitems;
            if(orderitems.length > 0){
                this.createArray(orderitems);
                this.setState({showitems : true});
            }else{
                this.setState({showitems : false});
            }
            this.setState({restaurant : response.data.resturant});
            this.setState({driver : response.data.driver});
            this.setState({loading : false});
        }).catch(error => {
            console.log(error);
            this.setState({loading : false});
        })
    }

    createArray=(data)=>{
        const orderitems = data;
        var array = [];
        for(i=0; i< orderitems.length; i++){
            array.push({'food_name' : orderitems[i].food_name, 'id' : orderitems[i].id, 'liked' : 1, 'image_large' : orderitems[i].image_large});
        }
        this.setState({orderitems : array});
        this.setState({itemsratingarray : array});
    }

    cancelFunction=()=>{
        this.setState({loading : true});
        const { navigation } = this.props;
        const route = this.props.route.params;
        const orderid = route.orderid;

        axios.post(Url.revieworder, 
        QueryString.stringify({
            orderid : orderid,
            order_rate : 9,
            driver_rate : 9,
            comment : ''
        }),
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
        .then(response => {
            console.log(response.data);
            if(response.data.status == 1){
                setTimeout(() => {
                    navigation.replace('HomeTabNavigator');
                    this.setState({loading : false});
                }, 600);
            }else{
                alert('Something went wrong, please try again')
                this.setState({loading : false});
            }
        }).catch(error => {
            alert(error);
            this.setState({loading : false});
        })
    }

    RateFunction=()=>{
        this.setState({loading : true});

        const { navigation } = this.props;
        const route = this.props.route.params;
        const orderid = route.orderid;
        const driver_rate = this.state.driverrate;
        const order_rate = this.state.orderrate;
        const items_rate = this.state.itemsratingarray;

        var ratearray = [];
        ratearray.push({'order_id' : orderid,'order_rate' : order_rate, 'driver_rate' : driver_rate, 'items_rate' : items_rate})
        console.log(ratearray[0]);

        axios.post(Url.revieworder, 
        QueryString.stringify({
            orderid : orderid,
            order_rate : order_rate,
            driver_rate : driver_rate,
            comment : this.state.comment
        }),
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
        .then(response => {
            console.log(response.data);
            if(response.data.status == 1){
                showMessage({
                    message: "Review successfully submitted.",
                    type: "success",
                    icon : 'success',
                    duration : 2500
                });
                setTimeout(() => {
                    navigation.replace('HomeTabNavigator');
                    this.setState({loading : false});
                }, 600);
            }else{
                alert('Something went wrong, please try again');
                this.setState({loading : false});
            }
        }).catch(error => {
            alert(error);
            this.setState({loading : false});
        })
    }

    render(){
        const route = this.props.route.params;
        const orderid = route.orderid;
        return(
            <View style={[styles.container]}>
                <LoadingComponent visibility={this.state.loading}/>
                <HeaderBar orderid={orderid} action={this.cancelFunction}/>
                <ScrollView>
                    <Text style={[styles.pagetitle, {color : Colors.white}]}>{Languages.HowWasYourOrder}</Text>
                    <Text style={[styles.pagesubtitle, {color : Colors.black}]}>{Languages.YourSuggections}</Text>
                    <OrderRate data={this.state.orderrate} res_data={this.state.restaurant} GetStates={(state)=>this.setState({orderrate : state})}/>
                    {this.state.driver != null ?
                    <>
                        <Text style={[styles.orderratetitle]}>{Languages.HowWasYourDriver}</Text>
                        <DriverRate data={this.state.driverrate} driver_info={this.state.driver} GetStates={(state)=>this.setState({driverrate : state})}/>
                    </>:null}
                    {this.state.showitems ?
                    <>
                        <Text style={[styles.orderratetitle]}>{Languages.HowWasEachItem}</Text>
                        <ItemsList data={this.state.orderitems} GetArray={(array)=>this.setState({itemsratingarray : array})}/>
                    </>:null}
                    <Comment getText={(text)=>this.setState({comment : text})} value={this.state.comment}/>
                </ScrollView>
                <View style={[styles.buttonholder]}>
                    <Button title={Languages.RateNow} action={()=>this.RateFunction()}/>
                </View>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <RateOrder {...props} navigation={navigation} />;
} 