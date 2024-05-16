import React from 'react';
import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import { Url } from '@common';

const QueryString = require('query-string');

class HorizontalList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list : []
    };
  }

  componentDidMount(){
    const type = this.props.type;
    axios.post(Url.getcategorylisturl, 
      QueryString.stringify({
        merchant_type : type,
      }), 
      {
          headers: {"Content-Type": "application/x-www-form-urlencoded",}
      }).then(response => {
          this.setArray(response.data);
      })
  }

  setArray = (data) => {
    const type = this.props.type;
    const cat = data;
    var array = [{'id' : 9999, 'icon' : type == 'restaurant' ? 'https://app.nstomatoes.lk/public/assets/icons/categoryicons/alleatsicon.png' : null, 'category_name' : `All`}];
    for(i=0; i < cat.length; i++){
      array.push({'id' : cat[i].id, 'icon' : cat[i].icon, category_name : cat[i].category_name})
    }
    this.setState({list : array});
  }
  
  render(){
    const list = this.state.list;
    return(
      <View style={[styles.container]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          itemDimension={80}
          data={list}
          spacing={3}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{this.props.filterList(item.category_name), this.props.getSelectedCategory(item.category_name)}} style={[styles.itemcontainer]} >
              <View style={[styles.imagecontainer]}>
                <Image source={{uri : item.icon}} style={[styles.image]}/>
              </View>
              <Text style={[styles.itemtitlestyle, {textAlign : 'center'}]}>{item.category_name}</Text>
            </TouchableOpacity >
          )}
      />
      </View>
    );
  }
}

export default HorizontalList;