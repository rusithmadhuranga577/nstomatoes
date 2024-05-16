import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Colors, Languages, Url } from '@common';
import axios from 'axios';
import styles from './styles';
import Icon from 'react-native-vector-icons/Fontisto';
import { CustomPicker } from 'react-native-custom-picker'

const QueryString = require('query-string');

class SelectRestaurant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items : []
        };
        this.getSelectedRestaurant = this.getSelectedRestaurant.bind(this);
    }

    initData = () => {
        const ulat = Number(this.props.u_lat);
        const ulan = Number(this.props.u_lan);
        const type = this.props.type;

        axios.post(Url.restaurantlisturl, 
        QueryString.stringify({
            filter : 'nearest',
            type : type,
            count : 100,
            lat : ulat,
            lon : ulan,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            var itemsarray = [];
            const data = response.data.data;
            for(i=0; i < data.length; i++){
                itemsarray.push({'id' : data[i].id, 'label' : data[i].name, 'address' : `${data[i].address_line_1}, ${data[i].address_line_2}`})
            }
            this.setState({items : itemsarray});
        })
    }

    componentDidMount() {
        this.initData();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.initData();
        });
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
            <CustomPicker
                options={this.state.items}
                getLabel={item => item.label}
                optionTemplate={this.renderOption}
                onValueChange={value => {
                    this.getSelectedRestaurant(value);
                }}
                fieldTemplate={this.RenderMainContainer}
                headerTemplate={this.renderHeader}
                modalStyle={{width: '100%', borderRadius : 10}}
            />
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