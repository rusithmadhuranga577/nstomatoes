import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import { Colors } from '@common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class ItemsList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            orderitems : this.props.data,
            ratingarray : false,
        };
        this.GetArray = this.GetArray.bind(this);
    }

    componentDidMount(){
        this.setState({orderitems : this.props.data});
    }

    GetArray(array){
        this.props.GetArray(array);
    }

    LikeFunction = (id) => {
        var myArray = this.props.data;
        var index = myArray.map(function(x) {return x.id; }).indexOf(id);
        const x = myArray[index].liked;

        if(x == 5){
            myArray[index].liked = 1;
            this.setState({orderitems : myArray});
        }else if(x == 0 || x == 1){
            myArray[index].liked = 5;
            this.setState({orderitems : myArray});
        }
        this.GetArray(myArray);
    }

    UnLikeFunction = (id) => {
        var myArray = this.props.data;
        var index = myArray.map(function(x) {return x.id; }).indexOf(id);
        const x = myArray[index].liked;

        if(x == 5){
            myArray[index].liked = 1;
            this.setState({orderitems : myArray});
        }else if(x == 0 || x == 1){
            myArray[index].liked = 5;
            this.setState({orderitems : myArray});
        }
        this.GetArray(myArray);
    }

    RenderOrderItemView(item){
        return(
            <View style={[styles.cartitemcontainer, {justifyContent : 'space-between', width: '95%', alignSelf : 'center'}]}>
                <Text numberOfLines={1} style={[styles.cartitemtitle, {width : '65%', fontSize : 15}]}>{item.food_name}</Text>
                <View style={[styles.orderideacontainer, {width : 80}]}>
                    <View style={[styles.itemrateiconbarcontainer, {width : 80}]}>
                        <TouchableOpacity onPress={()=>this.LikeFunction(item.id)} style={[styles.iconcontainer]}>
                            <Icon color={item.liked == 5 ? Colors.primary : Colors.primary} size={23} name={item.liked == 5 ? 'thumb-up' : 'thumb-up-outline'} style={[styles.itemrateiconstyle]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.UnLikeFunction(item.id)} style={[styles.iconcontainer]}>
                            <Icon color={item.liked == 0 || item.liked == 1 ? Colors.black : Colors.black} size={23} name={item.liked == 0 || item.liked == 1 ? 'thumb-down' : 'thumb-down-outline'} style={[styles.itemrateiconstyle]}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render(){
        const data = this.props.data;
        return(
            <View style={{width : '100%', marginBottom : 15}}>
            <FlatList
                itemDimension={80}
                staticDimension={300}
                fixed
                spacing={5}
                ItemSeparatorComponent={()=>(<View style={[styles.separator]}/>)}
                data={data}
                key={item => item.id}
                renderItem={({ item, index }) => this.RenderOrderItemView(item)}
            />
            </View>
        );
    }
}

export default ItemsList;