import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';
import { Dimensions } from "react-native";//94373164997

const screenwidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    hometabtitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 13,
        color : Colors.white,
        marginBottom : 10,
        marginTop : 5
    },
    tabBarStyle : {
        height : 60,
        backgroundColor : Colors.primary,
        width : '80%',
        alignSelf : 'center',
        bottom : 20,
        borderRadius : 20,
        position : 'absolute',
        left : '10%',
        right : '10%',
        elevation : 10
    },
    tabbarimage : {
        width : 25,
        height : 25
    },
})

export default styles;