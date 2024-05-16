import React from 'react';
import {View, Image} from 'react-native';
import { Languages, Images } from '@common';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import RenderMapView from './RenderMapView';

class OrderStatusImage extends React.Component{
    
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.state = {
            currentPosition : 0,
            driverid : 0,
            d_lat : 0,
            d_lon : 0,
            driverid : 0,
        };
    }

    render(){
        let status = this.props.status;
        return(
            <View>
                {status == 4 ? <RenderMapView driverid={this.props.driverid}/>:
                <View style={[styles.orderstatusimagecontainer]}>
                    <Image style={[styles.orderstatusimage]} 
                        source = { 
                            status == 0 ? Images.orderpending : null ||   
                            status == 1 ? Images.orderpreparing : null || 
                            status == 3 ? Images.orderprepared : null ||
                            status == 5 ? Images.orderprepared : null || 
                            status == 6 ? Images.orderdelivered : Languages.UndefinedOrderStatus
                        }>
                    </Image>
                </View>}
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <OrderStatusImage {...props} navigation={navigation} />; 
} 