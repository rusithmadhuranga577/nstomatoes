/** @format */

import React, { useEffect, useState, useRef  } from 'react';
import { connect } from "react-redux";
import {
  View,
  Animated,
  Text,
  ProgressBarAndroid,
} from 'react-native';
import styles from './styles';
import { Languages } from '@common';
import { Colors } from '@common';

class LoadingComponentCart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        loading : false,
    };
  }

  render(){
    return (
      <>
        {this.props.visibility ? 
            <View style={[styles.overlay]}>
                <Animated.View style={[styles.bottomcontainer]}>
                  <View>
                    <Text style={[styles.title]}>{Languages.PleaseWait}</Text>
                    <Text style={[styles.subtitle]}>{this.props.subtitle}</Text>
                  </View>
                  <View style={[styles.progressbar]}>
                    <ProgressBarAndroid styleAttr="Horizontal" color={Colors.primary} />
                  </View>
                </Animated.View >
            </View>:null
        }
      </>
    );
  }
}

export default LoadingComponentCart;