import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Languages, Images } from '@common';
import styles from './styles';

class GuestUserContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guestuser : false
        };
    }

    componentDidMount(){
        AsyncStorage.getItem('userid', (err, userid)=>{
            if(userid == '0'){
                this.setState({guestuser : true});
            }else{
                this.setState({guestuser : false});
            }
        })
    }

    loginButtonFunction = () => {
        const {navigation} = this.props;
        AsyncStorage.clear();
        navigation.replace('LoginMethods');
    }

    render(){
        return(
            <>
            {this.state.guestuser ? 
            <View style={[styles.container]}>
                <View style={[styles.textcontainer]}>
                    <Text style={[styles.heythere]}>{Languages.HeyThere}</Text>
                    <Text style={[styles.loginor]}>{Languages.LoginOrCreateAnAccountForBetter}</Text>
                    <TouchableOpacity onPress={this.loginButtonFunction} style={[styles.loginbuttoncontainer]}>
                        <Text style={[styles.loginbuttontext]}>{Languages.Login}</Text>
                    </TouchableOpacity>
                </View>
                <Image source={Images.logincontainerimage} style={{width : 100, height : 100}}/>
            </View>
            : null}
            </>
        )
    }
}
export default function(props){
    const navigation = useNavigation();
    return <GuestUserContainer {...props} navigation={navigation} />;
} 