import React from 'react';
import {
  Image,
  FlatList,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Colors } from '@common';
import styles from './styles';

const QueryString = require('query-string');

class HorizontalList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items : null,
      selected : 9998
    };
  }

  filterFunction = (id, item) => {
    console.log(item)
    this.setState({selected : id});
    this.props.filterCategory(id, item.subcategories);
  }

  render(){
    const items = this.props.items;
    const selectedid = this.state.selected;
    const type = this.props.type;
    const res_type = this.props.res_type;
    return(
      <View style={[styles.container, {backgroundColor : type == 'main' ? Colors.white: null}]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          itemDimension={80}
          data={items}
          style={styles.gridView}
          spacing={3}
          keyExtractor={(item)=>item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>this.filterFunction(item.id, item)} style={ type == 'main' ? [styles.itemcontainer, {backgroundColor : selectedid == item.id ? Colors.primary : '#e5e6fe'}] : [styles.itemcontainer, {backgroundColor : selectedid == item.id ? Colors.white : null}]} >
              {res_type == 'fashion' ? 
              <>
              {type == 'main' ? 
              <View style={[styles.imagecontainer]}>
                <Image source={{uri : item.image}} style={[styles.image]}/>
              </View> : null}
              </>:
              <View style={[styles.imagecontainer]}>
                <Image source={{uri : item.image}} style={[styles.image]}/>
              </View>}
              <Text numberOfLines={1} style={[styles.itemtitlestyle, {fontSize : type == 'main' ? 14 : 12}]}>{item.category_name}</Text>
              { type == 'sub' ?
              <>
                {selectedid == item.id ? 
                <View style={[styles.separator]}/> : null}
              </>:null}
            </TouchableOpacity>
          )}
      />
      </View>
    );
  }
}
export default HorizontalList;