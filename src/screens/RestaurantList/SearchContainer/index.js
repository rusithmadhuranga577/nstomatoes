/** @format */

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Languages } from '@common';

class SearchBarContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address : '',
        };
      }

    componentDidMount(){
        AsyncStorage.getItem('address', (err, address)=>{
            this.setState({address : address});
        });
    }

    render(){
        const navigation = this.props.nav;
        return(
            <View style={[styles.container]}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.goBack()}>
                    <Icon name={'chevron-back'} size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.replace('LocationSettings', {logged : 1, cart : 0})} style={{alignItems : 'center'}}>
                    <Text numberOfLines={1} style={[styles.wedelivering]}>{Languages.DeliveringFood}</Text>
                    <Text numberOfLines={1} style={[styles.address]}>{this.state.address}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.openSearchPage()} style={[styles.input]}>
                    <Text style={[styles.text]}>{type == 'restaurant' ? Languages.Searchrestaurant : null || type == 'grocery' ? Languages.Searchgrocery : null || type == 'fashion' ? Languages.Searchfashion : null}</Text>
                </TouchableOpacity> */}
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.openSearchPage()}>
                    <Icon name={'search'} size={20}/>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SearchBarContainer;