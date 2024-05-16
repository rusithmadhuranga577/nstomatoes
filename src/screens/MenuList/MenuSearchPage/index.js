
import React from 'react';
import {
    Modal,
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Colors, Url, Languages } from '@common';

const QueryString = require('query-string');

class MenuSearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data : [],
            restaurantdata : [],
            filteredlist : [],
            alllist : []
        };
    }

    componentDidMount(){
        console.log(this.props.id)
        this.getMenuList();
        this.getRestaurantData();
    }

    getRestaurantData(){
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : this.props.id,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            console.log(response.data)
            this.setState({restaurantdata : response.data});
        })
    }

    getMenuList(){
        axios.post(Url.categorymenulisturl, 
        QueryString.stringify({
            restaurant_id : this.props.id,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            this.setState({data : response.data[2].data});
            this.setState({alllist : response.data[2].data});
        })
    }

    nav = (item) => {
        const restaurantdata = this.state.restaurantdata;
        console.log(restaurantdata)
        this.props.navigation.push('FoodItem' , {name: item.food_name, price: item.price, image: item.image_large, id: item.id , foodtypes : item.foodtype, secondline: item.second_line,  addons: item.addons.length == 0? null : item.addons[0].addonitems, restaurant_id : restaurantdata.id, restaurantdata : restaurantdata });
    }

    filterList = (e) => {
        let text = e.toUpperCase()
        let allList = this.state.alllist;
        let filteredItems = allList.filter((item) => {
            var food_name = item.food_name;
            return food_name.toUpperCase().match(text)
        })
        if (!text || text === '') {
            this.setState({data : allList});
        } else if (Array.isArray(filteredItems)) {
            if(filteredItems.length == 0){
                this.setState({data : filteredItems});
            }else{
                this.setState({data : filteredItems});
            }
        }
        
        
    }

    getPercentage = (price, original_price) => {
        const price1 = price;
        const price2 = original_price;
        var percentage = 0;
    
        percentage = ((price2 - price1) / price2 *100).toFixed(0);
        if(price2 == null){
          return <></>;
        }else if (price1 < price2){
          return (
            <View style={[styles.populerbadge, {backgroundColor : '#FF5617'}]}>
              <Text style={[styles.populerbadgetext]}>Save {percentage}%</Text>
            </View>  
          );
        }else{
          return <></>;
        }
    }
    
    onPressFunction = (item) => {
        this.props.closeModel();
        this.nav(item);
    }

    RenderItem = (item) => {
        return(
          <>
            <View style={{flexDirection : 'column'}}>
                <TouchableOpacity onPress={()=>item.available == 0 ? null : this.onPressFunction(item)} style={[styles.itemcontainer, {opacity : item.available == 0  || item.available == 2 ? 0.5 : 1}]}>
                    <View style={{width : '70%'}}>
                        <Text numberOfLines={2} style={[styles.foodname]}>{item.food_name}</Text>
                        {item.second_line == '' ? null : <Text numberOfLines={2} style={[styles.foodsecondline]}>{item.second_line}</Text>}
                        <Text style={[styles.price]}>{Languages.Rs}{Number(item.price).toFixed(2)}</Text>
                        <View style={{ flexDirection : 'row' ,alignItems : 'center', marginTop : 5}}>
                        {this.getPercentage(item.price, item.original_price)} 
                        {item.popularitem == 0 ? null : <View style={[styles.populerbadge]}><Text style={[styles.populerbadgetext]}>Populer</Text></View>}
                        </View>
                    </View>                    
                    <View>
                        {item.image_thumb == null ? null : <Image style={styles.image} source={{uri: item.image_thumb}} ></Image>}      
                    </View>
                </TouchableOpacity>
                {item.available == 0 ?
                    <View style={[styles.itemoverlay]}>
                        <Text style={[styles.notavailabletext]}>{Languages.ItemNotAvailable}</Text>
                    </View>
                :null}
                {item.available == 2 ?
                    <View style={[styles.itemoverlay]}>
                        <Text style={[styles.notavailabletext]}>{Languages.ItemNotAvailableUntilTomorrow}</Text>
                    </View>
                :null}
            </View>
          </>
        );
      }

    render(){
        return(
            <Modal
                visibility={this.props.visibility}
                transparent={true}
                animationType={'fade'}
            >
                <View style={[styles.container]}>
                    <View style={{width : '100%', flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', marginBottom : 15}}>
                        <TouchableOpacity onPress={()=>this.props.closeModel()} style={[styles.backiconholder]}>
                            <Icon name={'chevron-back-outline'} size={23} color={Colors.darkgray}/>
                        </TouchableOpacity>
                        <View style={{flexDirection : 'row', alignItems : 'center', width : '100%'}}>
                            <TextInput
                                placeholder={Languages.Search}
                                style={[styles.input]}
                                placeholderTextColor={Colors.darkgray}
                                onChangeText={(text)=>this.filterList(text)}
                            />
                            <View style={[styles.searchiconholder]}>
                                <Icon name={'search'} size={23} color={Colors.darkgray}/>
                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.data}
                        spacing={3}
                        renderItem={({item}) => this.RenderItem(item)}
                    />
                </View>
            </Modal>
        );
    }
}

export default MenuSearchPage;