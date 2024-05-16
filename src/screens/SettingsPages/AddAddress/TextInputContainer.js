import React from 'react';
import {
  View,
  TextInput,
} from 'react-native';
import styles from './styles';
import { Colors } from "@common";

class TextInputContainer extends React.Component {

    render(){
        return(
            <View>
                <TextInput
                    placeholder={this.props.placeholder}
                    style={[styles.inputcontainer]}
                    value={this.props.value}
                    onChangeText={(text)=>this.props.onChangeValue(text)}
                    keyboardType={this.props.type}
                    placeholderTextColor={Colors.darkgray}
                    maxLength={this.props.maxLength}
                />
            </View>
        );
    }
    
}
export default TextInputContainer;