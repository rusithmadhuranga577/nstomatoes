import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Url, Languages, Constants } from '@common';
import { Button, LoadingComponent } from '@components';
import { showMessage } from "react-native-flash-message";
import styles from './styles';

const QueryString = require('query-string');

class ForgetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            loading : false
        };
    }

    sendEmailFunction = () => {
        const {navigation} = this.props;
        this.setState({loading : true});
        if(this.state.email == ''){
            showMessage({
                message: 'Invalid email address',
                type: "danger",
                icon : 'danger',
                duration : 2000
            });
            this.setState({loading : true});
        }else{
            axios.post(Url.resetpasswordurl, 
            QueryString.stringify({
                email : this.state.email,
            }), 
            {headers: {"Content-Type": "application/x-www-form-urlencoded",}})
            .then(response => {
                console.log(response.data);
                if(response.data.status == 1){
                    showMessage({
                        message: response.data.error,
                        type: "success",
                        icon : 'success',
                        duration : 2000
                    });
                    setTimeout(() => {
                        navigation.goBack();
                    }, 200);
                    this.setState({loading : false});
                }else if(response.data.status == 0){
                    this.setState({email : ''})
                    showMessage({
                        message: response.data.error,
                        type: "danger",
                        icon : 'danger',
                        duration : 2000
                    });
                    this.setState({loading : false});
                }             
            })
        }
    }

    render(){
        return(
            <View style={[styles.container]}>
                <LoadingComponent visibility={this.state.loading}/>
                <View style={{padding : 10}}>
                    <Text style={[styles.pagetitle]}>{Languages.ForgetPassword}</Text>
                    <Text style={[styles.pagesubtitle]}>{Languages.ForgetPasswordPageSubTitle}</Text>
                    <TextInput 
                    value={this.state.email}
                    placeholder={Languages.Emailplaceholder}
                    onChangeText={(text) => this.setState({email : text})}
                    style={[styles.input, {fontFamily: Constants.fontFamilynormal, width: '100%'}]}
                    placeholderTextColor={'rgba(0,0,0,0.4)'}
                    />

                    <Button action={this.sendEmailFunction} title={Languages.ResetPassword}/>
                </View>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <ForgetPassword {...props} navigation={navigation} />;
} 