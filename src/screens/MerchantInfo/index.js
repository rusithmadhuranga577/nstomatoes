import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    ScrollView, 
    FlatList
} from 'react-native';
import { Languages, Colors, Url } from '@common';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios'; 

const QueryString = require('query-string');

class MerchantInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ratings : []
        };
    }

    componentDidMount(){
        const params = this.props.route.params;
        console.log(params.data)
        axios.post(Url.getrestaurantreviewurl, 
        QueryString.stringify({
            restaurant_id : params.data.id,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            this.setState({ratings : response.data.ratings});
        })
    }

    itemContainer({title, icon}){
        return(
            <View style={[styles.itemcontainer]}>
                <View style={[styles.iconcontainer]}>
                    <Icon name={icon} size={22} color={icon == 'star' ? 'orange' : Colors.black}/>
                </View>
                <Text numberOfLines={2} style={[styles.containertitle]}>{title}</Text>
            </View>
        );
    }

    reviewContainer(item){
        const params = this.props.route.params;
        const image = item.image;
        const review = item.review;
        const name = item.delivery_name;
        const date = item.date;
        const rating = item.rating;
        return(
            <View style={[styles.ratingcontainer]}>
                <Image source={{uri : image}} style={[styles.dpcontainer]}/>
                <View style={{width : '85%'}}>
                    <View style={[styles.row]}>
                        <View>
                            <Text numberOfLines={1} style={[styles.username, {marginBottom : 2}]}>{name}</Text>
                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                <Icon name={'star'} size={15} color={'orange'}/>
                                <Text numberOfLines={1} style={[styles.username, {fontSize : 14, marginBottom : 0, marginLeft : 5}]}>{rating}</Text>
                            </View>
                        </View>
                        <Text numberOfLines={1} style={[styles.username, {fontSize : 10}]}>{date}</Text>
                    </View>
                    <Text numberOfLines={20} style={[styles.review]}>{review}</Text>
                </View>
            </View>
        );
    }

    gettimestring(time){
        if(time < 12){
            return 'AM';
        }else{
            return 'PM';
        }
    }

    render(){
        const params = this.props.route.params;
        const res_data = params.data;
        return(
            <ScrollView>
                <Image source={{uri : res_data.cover_banner}} style={[styles.coverimagecontainer]}/>
                <Text numberOfLines={4} style={[styles.containertitle, {fontSize : 15, marginLeft : 10, marginTop : 10, marginBottom : 10}]}>{params.data.description}</Text>
                {this.itemContainer({icon : 'location', title : `${res_data.address_line_1}, ${res_data.address_line_2}`})}
                {this.itemContainer({icon : 'time', title : `${Languages.OpenUntil} ${Number(res_data.close_time).toFixed(2)} ${this.gettimestring(res_data.close_time)}`})}
                {this.itemContainer({icon : 'star', title : `${res_data.def_rating} (${res_data.def_rating_count} ${Languages.Ratings})`})}
                <View style={[styles.separator]}/>
                <Text style={[styles.ratingsandreviews]}>{Languages.RatingsReviews}</Text>
                <View>
                    <FlatList
                        data={this.state.ratings}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=>this.reviewContainer(item)}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <MerchantInfo {...props} navigation={navigation} />;
} 
