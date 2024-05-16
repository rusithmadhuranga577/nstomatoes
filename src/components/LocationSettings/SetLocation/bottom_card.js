import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Colors, Store, Url, Languages} from '@common';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from '@components';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const screenWidth = Dimensions.get('screen').width;

class SetLocationBottomCard extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            house_no : "",
        };
    }

    render() {
        let { addressline1 } = this.props;
        let { addressline2 } = this.props;
        let { fetching } = this.props;
        let { onSubmit } = this.props;
        let { onChangeHouseNo } = this.props;

        return <ScrollView style={styles.container}>
            <Text style={styles.title}>Delivery Address</Text>
            <View style={{marginTop: 20}}/>
            <View style={styles.addressrow}>
                <View style={styles.iconcontainer}>
                    <Entypo
                        name={'location-pin'}
                        size={30}
                        color={Colors.white}
                    />
                </View>
                <View style={{width: 15}}/>
                {fetching ? <Text style={styles.addressrowsubtitletext}>Fetching...</Text>
                :
                <View style={{width: screenWidth/1.3}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.addressrowtitletext}>{addressline1}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail"  style={styles.addressrowsubtitletext}>{addressline2}</Text>
                </View>
                }
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="House No / Apartment No"
                    value={this.state.house_no}
                    onChangeText={(text) => {
                            this.setState({
                                house_no: text
                            });
                            onChangeHouseNo(text);
                        }
                    }
                    keyboardType="text"
                />
            </View>
            <View style={{marginTop: 20}}/>
            {fetching ? <></> : <Button title={'CONFIRM'} action={()=>{onSubmit(this.state.house_no)}}/> }
            <View style={{marginTop: 30}}/>
        </ScrollView>
    }

}

export default function(props){
    const navigation = useNavigation();
    return <SetLocationBottomCard {...props} navigation={navigation} />;
} 