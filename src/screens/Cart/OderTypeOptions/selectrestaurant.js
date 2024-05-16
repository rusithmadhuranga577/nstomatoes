import React from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Colors, Languages, Url } from '@common';
import axios from 'axios';
import styles from './styles';
import Icon from 'react-native-vector-icons/Fontisto';
import { CustomPicker } from 'react-native-custom-picker';

const QueryString = require('query-string');

class SelectRestaurant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items : []
        };
        this.getSelectedRestaurant = this.getSelectedRestaurant.bind(this);
    }

    componentDidMount() {
        console.log('Getting Restaurant List')
        AsyncStorage.multiGet(['latitude', 'longitude'], (err, data)=>{
            axios.post(Url.restaurantalllisturl, 
            QueryString.stringify({
            }), 
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded",}
            }).then(response => {
                this.setState({items : response.data.data});
            })
        })
    }

    RenderMainContainer = () => {
        return(
            <View style={[styles.buttoncontainer]}>
                <View style={{flexDirection : 'row', alignItems : 'center', width : '85%'}}>
                    <View style={{width : 40, height : 40, alignItems : 'center', justifyContent : 'center'}}>
                        <Icon name={'shopping-store'} color={Colors.primary} size={25}/>
                    </View>
                    <View style={{marginLeft : 15}}>
                        <Text style={[styles.buttontitle]}>{Languages.SelectedRestaurent}</Text>
                        <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{this.props.restaurantname}</Text>
                    </View>
                </View>
                <Icon name={'arrow-right'} size={15}/>
            </View>
        );
    }

    renderOption = (settings) => {
        const { item, getLabel } = settings
        return(
            <View style={[styles.optioncontainer]}>
                <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{getLabel(item)}</Text>
                <Text numberOfLines={1} style={[styles.buttontitle]}>{item.address}</Text>
                <View style={styles.separator}/>
            </View>
        );
    }

    renderHeader = () => {
        return(
            <View style={[styles.optionstitlebar]}>
                <Text numberOfLines={1} style={[styles.optionstitle]}>{Languages.SelectRestaurent}</Text>
            </View>
        );
    }

    getSelectedRestaurant = (value) => {
        this.props.getSelectedRestaurant(value);
    }

    render(){
        const {navigation} = this.props;
        return(
            <>
            {/* {this.RenderMainContainer()} */}
            <CustomPicker
                options={this.state.items}
                getLabel={item => item.name}
                optionTemplate={this.renderOption}
                onValueChange={value => {
                    this.getSelectedRestaurant(value);
                }}
                fieldTemplate={this.RenderMainContainer}
                headerTemplate={this.renderHeader}
                modalStyle={{width: '100%', borderRadius : 10}}
            />
            </>
        );
    };
}

SelectRestaurant.propTypes = {
    getSelectedRestaurant : PropTypes.func
};

export default function(props){
    const navigation = useNavigation();
    return <SelectRestaurant {...props} navigation={navigation} />;
} 