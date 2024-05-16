import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    est_timerowstyle : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    time : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 30
    },
    est_arrivaltext : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 15,
        color : Colors.darkgray,
        alignSelf : 'center'
    },
    est_arrivaltext2 : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 12,
        color : Colors.darkgray,
    },
    buttoncontainer: {
        width : '100%',
        backgroundColor : Colors.white,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 10
    },
        buttontitle : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 13,
        color : Colors.black
    },
        buttonsubtitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 15,
        color : Colors.black,
    }
})

export default styles;