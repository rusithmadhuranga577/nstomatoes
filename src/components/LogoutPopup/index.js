/** @format */

import React from 'react';
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Languages } from '@common';
import { Colors } from '@common';

class LogoutPopup extends React.Component {

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
          toValue: 270,
          duration: 200
        }),
        Animated.timing(this.state.height, {
          toValue: 250,
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
      <View style={[styles.overlay]}>
          <Animated.View style={[styles.bottomcontainer, {height : this.state.height}]}>
            <Text style={[styles.title]}>{Languages.AreYouSure}</Text>
            <Text style={[styles.subtitle]}>{Languages.YouWantToLogout}</Text>
            <View style={[styles.buttonrow]}>
              <TouchableOpacity onPress={this.props.Logout} style={[styles.button, {backgroundColor : Colors.successgreen}]}>
                <Text style={[styles.buttontitle]}>{Languages.Yes}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.props.CancelLogout} style={[styles.button, {backgroundColor : Colors.alertyellow}]}>
                <Text style={[styles.buttontitle]}>{Languages.No}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View >
      </View>
      </>
    );
  }
}

export default LogoutPopup;