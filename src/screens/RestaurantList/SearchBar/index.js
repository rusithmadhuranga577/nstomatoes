/** @format */

import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Languages, Colors } from '@common';

class SearchBar extends React.Component {

    render(){
        const type = this.props.type;
        return(
            <View style={[styles.container]}>
                <TouchableOpacity onPress={()=>this.props.closeSearchPage()} style={[styles.iconholder]}>
                    <Icon name={'chevron-back'} size={20}/>
                </TouchableOpacity>
                <TextInput
                    placeholder={type == 'restaurant' ? Languages.Searchrestaurant : null || type == 'grocery' ? Languages.Searchgrocery : null || type == 'fashion' ? Languages.Searchfashion : null}
                    style={[styles.input]}
                    placeholderTextColor={Colors.darkgray}
                    onChangeText={(text)=>this.props.getText(text)}
                    value={this.props.value}
                />
            </View>
        );
    }
}

export default SearchBar;