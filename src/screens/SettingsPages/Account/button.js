/** @format */

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import { Colors, Languages } from '@common';
import { CustomAlert, CustomAlertButton } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';

class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logoutstate : false,
      logoutpopup : false
    };
    this.logoutstate = this.logoutstate.bind(this);
  }

  logoutstate(){
    this.props.logoutstate(this.state.logoutstate);
  }

  NavigateFunction = (page) => {
    if(page == 'LocationSettings'){
      this.navigateToLocationSettings();
    }else if(page == 'UpdateUserInfo'){
      this.props.navigation.navigate(page)
    }else if(page == 'Logout'){
      this.setState({logoutstate : true});
      setTimeout(() => {
        this.logoutstate();
      }, 100);
    }else if(page == 'RateUs'){
      Linking.openURL(this.props.url)
    }else if(page == 'PrivacyPolicy'){
      this.props.navigation.navigate('WebViewPage', {title : Languages.PrivacyPolicy, url : this.props.url})
    }else if(page == 'AboutUs'){
      this.props.navigation.navigate('WebViewPage', {title : Languages.AboutUs, url : this.props.url})
    }else if(page == 'OrdersPage'){
      this.props.navigation.navigate(page)
    }
  }

  navigateToLocationSettings = () => {
    AsyncStorage.getItem('userid', (err, userid) => {
      if(userid == '0'){
        this.openLoginPopup();
      }else{
        this.props.navigation.navigate('LocationSettings', {logged : 1});
      }
    });
  }

  closeLoginPopup = () => {
    this.setState({logoutpopup : false});
  }
  
  openLoginPopup = () => {
    this.setState({logoutpopup : true});
  }

  loginFunction = () => {
    AsyncStorage.clear();
    this.props.navigation.replace('LoginMethods')
  }

  renderAlerts = () => {
    return(
      <>
      <CustomAlert
        displayMode={'login'}
        displayMsg={Languages.LoginOrCreateAnAccountForContinue}
        displaymsgtitle={Languages.PleaseLogin}
        visibility={this.state.logoutpopup}
        dismissAlert={this.closeLoginPopup}
        cancellable={false}
        buttons={(
          <>
            <CustomAlertButton buttontitle={Languages.LoginSignIn} theme={'success'} buttonaction={this.loginFunction}/>
            <CustomAlertButton buttontitle={Languages.Cancel} theme={'alert'} buttonaction={this.closeLoginPopup}/>
          </>
        )}
      />   
      </>
    );
  }


  render(){
    return(
      <>
      <TouchableOpacity onPress={()=>this.NavigateFunction(this.props.screen)} style={[styles.buttoncontainer]}>
          <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
            <Icon name={this.props.icon} size={25} color={Colors.darkgray}/>
            <Text style={[styles.buttontitle]}>{this.props.title}</Text>
          </View>
          <Icon name={'chevron-forward-outline'} size={30} color={Colors.darkgray}/>
      </TouchableOpacity>
      {this.renderAlerts()}
      </>
    );
  }
}
export default Button;