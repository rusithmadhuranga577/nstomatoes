import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import Events from 'react-native-simple-events';
import PropTypes from 'prop-types';
import styles from './styles';

export default class AutoCompleteListView extends React.Component {
  static propTypes = {
    predictions: PropTypes.array.isRequired,
    onSelectPlace: PropTypes.func,
  };

  state = {
    inFocus: false,
  };

  componentDidMount() {
    Events.listen('InputBlur', 'ListViewID', this._onTextBlur);
    Events.listen('InputFocus', 'ListViewID', this._onTextFocus);
  }

  componentWillUnmount() {
    Events.rm('InputBlur', 'ListViewID');
    Events.rm('InputFocus', 'ListViewID');
  }

  _onTextFocus = () => {
    this.setState({ inFocus: true });
  };

  _onTextBlur = () => {
    this.setState({ inFocus: false });
  };

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  _renderItem({ item }) {
    const TouchableControl = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    const { structured_formatting } = item;
    return (
      <TouchableControl onPress={() => Events.trigger('PlaceSelected', item.place_id)}>
        <View style={styles.row}>
          <Text style={styles.primaryText} numberOfLines={1}>
            {structured_formatting.main_text}
          </Text>
          <Text style={styles.secondaryText} numberOfLines={1}>
            {structured_formatting.secondary_text}
          </Text>
        </View>
      </TouchableControl>
    );
  }

  _getFlatList = () => {
    const style = this.state.inFocus ? null : { height: 0 };
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        elevation={3}
        style={[styles.list, style]}
        data={this.props.predictions}
        renderItem={this._renderItem.bind(this)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={item => item.id}
      />
    );
  };

  render() {
    return Platform.OS === 'android' ? (
      this._getFlatList()
    ) : (
      <View style={styles.listContainer}>{this._getFlatList()}</View>
    );
  }
}

