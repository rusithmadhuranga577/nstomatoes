import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const Width = Dimensions.get('screen').width;
const imagelength = Width/1.3;

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
        padding : 10
    },
    orderfailedcontainer : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center'
    },
    orderfailedimagecontainer : {
        width: imagelength+40, 
        height: imagelength,
        opacity : 0.8
    },
    stepindicatorholder : {
        marginTop : 20,
        width : '120%',
        alignSelf : 'center'
    },
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
    orderstatustextcontainer : {
        width : '100%',
        justifyContent : 'center',
    },
    orderstatustext : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 18
    },
    orderstatusimagecontainer : {
        width : imagelength,
        height: imagelength,
        alignSelf : 'center',
        marginTop : 30
    },
    orderstatusimage : {
        width : '100%',
        height : '100%'
    },
    ordertype : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 15,
        color : Colors.white
    },
    ordertypecontainer : {
        padding : 5,
        borderTopRightRadius : 15,
        borderBottomRightRadius: 15,
        backgroundColor : Colors.successgreen,
        marginTop : 20,
        marginBottom : 8,
        left : -10,
        alignSelf : 'flex-start',
        paddingRight: 15,
    }
})

export default styles;