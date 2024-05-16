import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.black,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    halfround : {
        height: '70%',
        width: '150%',
        backgroundColor: Colors.white,
        elevation: 10,
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        borderColor: Colors.secondary,
        borderWidth: 12,
        alignSelf: 'center',
        position: 'absolute',
        top: -40,
        alignItems : 'center',
        justifyContent : 'center'
    },
    image : {
        alignSelf: 'center',
        height : '100%',
        width : '100%',
    },
    logo : {
        width : '60%',
        height : '100%',
        resizeMode: 'contain',
        alignSelf : 'center',
        top : 20,
        position : 'absolute'
    },
    imagecontainer : {
        width : '100%',
        height : '80%',
        resizeMode: 'contain',
    },
    topbgimage : {
        width : '100%',
        height : 500
    },
    retrybuttonholder : {
        width : '100%',
        height : 80,
        backgroundColor : Colors.primary,
        borderTopLeftRadius : 15,
        borderTopRightRadius : 15,
        elevation : 5,
        position : 'absolute',
        bottom : 10,
        alignSelf : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        padding : 10
    },
    retrytext : {
        fontSize : 17,
        fontFamily : Constants.fontFamilybold
    }
})

export default styles;