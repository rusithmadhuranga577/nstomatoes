import React from 'react';
import {
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
      selected : this.props.initId
    };
  }

  filterFunction = (item) => {
    this.setState({selected : item.id});
    this.props.filterCategory(item);
  }

  render(){
    const items = this.props.items;
    const selectedid = this.state.selected;
    const type = this.props.type;
    return(
      <View style={[styles.container, {backgroundColor : type == 'main' ? Colors.gray: null}]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          itemDimension={80}
          data={items}
          style={styles.gridView}
          spacing={3}
          keyExtractor={(item)=>item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>this.filterFunction(item)} style={ type == 'main' ? [styles.itemcontainer, {backgroundColor : selectedid == item.id ? Colors.primary : null}] : [styles.itemcontainer, {backgroundColor : selectedid == item.id ? Colors.white : null}]} >
              <Text style={[styles.itemtitlestyle, {fontSize : type == 'main' ? 15 : 13, color : selectedid == item.id ? Colors.white : Colors.black}]}>{item.category_name}</Text>
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