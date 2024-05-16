import React from 'react';
import {View, Image, Text} from 'react-native';
import { Languages, Images,  } from '@common';
import { useNavigation } from '@react-navigation/native';
import { CustomAlertButton, Button } from '@components';
import styles from './styles';

class OrderCanceledScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cartitems : [],
            removeitemalert : false,
            clickeditemid : 0,
            clearcartalert : false
        };
    }

    render(){
        const {navigation} = this.props;
        return(
            <View style={[styles.container]}>
                <Text style={[styles.title]}>{Languages.OrderCanceled}</Text>
                <Image source={Images.ordercanceled} style={[styles.image]}/>
                <Text style={[styles.destext]}>{Languages.YourOrderCanceledBy}</Text>
                <View style={[styles.buttonholder]}>
                    <Button action={()=>navigation.replace('HomeTabNavigator')} title={Languages.Understood}/>
                </View>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <OrderCanceledScreen {...props} navigation={navigation} />;
} 