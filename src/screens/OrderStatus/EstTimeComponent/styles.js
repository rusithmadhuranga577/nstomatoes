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
        fontSize : 25
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
})

export default styles;