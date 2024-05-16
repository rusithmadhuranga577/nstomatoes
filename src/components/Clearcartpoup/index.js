/** @format */

import React from 'react';
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';
import styles from './styles';
import { Languages } from '@common';
import { Colors } from '@common';

class Clearcartpopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading : false,
      height : new Animated.Value(0)
    };
  }

  animateIn = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.height, {
          toValue: 170,
          duration: 200
        }),
        Animated.timing(this.state.height, {
          toValue: 150,
          duration: 200
        })
      ]),
  { iterations: 1 }
  ).start();
  };

  animateOut = () => {
    Animated.timing(this.state.height, {
      toValue: 0,
      duration: 200
    }).start();
  };

  componentDidMount(){
    this.animateIn();
  }

  componentWillUnmount(){
    this.animateOut();
  }

  render(){
    return (
      <>
      <Modal
        visible={this.props.visibility}
        animationType={'fade'}
        transparent={true}>
        <TouchableOpacity activeOpacity={1} onPress={this.props.Closepopup} style={[styles.overlay]}>
          <Animated.View style={[styles.bottomcontainer, {height : this.state.height}]}>
            <Text style={[styles.title]}>{Languages.ClearCart}</Text>
            <Text style={[styles.subtitle]}>{Languages.Doyouwantclearcart}</Text>
            <View style={[styles.buttonrow]}>
              <TouchableOpacity onPress={this.props.Cancel} style={[styles.button, {backgroundColor : Colors.alertyellow}]}>
                <Text style={[styles.buttontitle]}>{Languages.Cancel}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.props.StartNew} style={[styles.button, {backgroundColor : Colors.successgreen}]}>
                <Text style={[styles.buttontitle]}>{Languages.StartNewOrder}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View >
      </TouchableOpacity>
      </Modal>
      </>
    );
  }
}

export default Clearcartpopup;