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
        zIndex: 150,
    },
    title : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 20,
        marginTop : 10
    },
    subtitle : {
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
        fontSize : 15,
        marginTop : 8,
    },
    bottomcontainer : {
        width : '100%',
        height : 250,
        backgroundColor : Colors.white,
        position : 'absolute',
        bottom : 0,
        paddingTop : 0,
        padding : 15,
        borderTopLeftRadius : 15,
        borderTopRightRadius : 15
    },
    buttonrow : {
        width : '100%', 
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignSelf : 'center',
        marginTop : 20
    },
    button : {
        width : '48%',
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,
        elevation : 5
    },
    buttontitle : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 18,
    }
})

export default styles;