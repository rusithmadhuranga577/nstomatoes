import { View, TextInput} from 'react-native';
import React from 'react';
import { Languages, Colors } from '@common';
import styles from './styles';

class Comment extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            comment : '',
        };
    }

    render(){
        return(
            <View>
                <TextInput
                    placeholder={Languages.YourReview}
                    placeholderTextColor={Colors.darkgray}
                    style={[styles.input]}
                    multiline={true}
                    onChangeText={(text)=>this.props.getText(text)}
                    value={this.props.value}
                />
            </View>
        );
    }
}

export default Comment;