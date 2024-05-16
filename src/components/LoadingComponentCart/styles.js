import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    overlay : {
        width: '100%',
        height : '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 99,
    },
    lottie: {
        width: 100,
        height: 100
    },
    indicatorholder : {
        width : '45%', 
        height : 110, 
        backgroundColor : 'rgba(52, 52, 52, 0.9)',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10
    },
    title : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 20,
    },
    subtitle : {
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
        fontSize : 15,
        marginTop : 8
    },
    bottomcontainer : {
        width : '100%',
        height : 90,
        backgroundColor : Colors.white,
        position : 'absolute',
        bottom : 0,
        paddingTop : 0,
        paddingLeft : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    progressbar : {
        width : '110%', 
        position : 'absolute', 
        top : -7
    }
})

export default styles;