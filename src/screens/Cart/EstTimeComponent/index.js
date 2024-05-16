import React from 'react';
import { View, Text } from 'react-native';
import { Colors, Languages } from '@common';
import Icon from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

class EstTimeComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            u_lat : 0,
            u_lan : 0,
            est_time : 0,
            est_delivery_time : '',
            est_arrival_time : ''
        };
    }

    render(){ 
        const { navigation } = this.props;
        return(
            <View style={[styles.buttoncontainer]}>
                <View style={{flexDirection : 'row', alignItems : 'center', width : '85%'}}>
                    <View style={{width : 40, height : 40, alignItems : 'center', justifyContent : 'center'}}>
                        <Icon name={'clock'} color={Colors.primary} size={25}/>
                    </View>
                    <View style={{marginLeft : 15}}>
                        <Text style={[styles.buttontitle]}>{Languages.ArrivalTime}</Text>
                        <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{this.props.text}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <EstTimeComponent {...props} navigation={navigation} />;
} 
