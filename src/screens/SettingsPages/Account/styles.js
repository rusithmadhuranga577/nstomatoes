import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    topcard : {
        width: '250%', 
        height: '75%',
        backgroundColor: Colors.primary,
        alignSelf : 'center',
        borderBottomLeftRadius : 650,
        borderBottomRightRadius : 650,
        top : screenHeight <= 640 ? -200 : -250
    },
    pagetitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 25,
        color : Colors.white,
        position : 'absolute',
        zIndex : 99,
        top : 20,
        left : 20
    },
    floatingcard : {
        width : '90%',
        backgroundColor : Colors.white,
        elevation : 5,
        height : screenHeight <= 640 ? '68%' : '70%',
        zIndex : 98,
        position : 'absolute',
        alignSelf : 'center',
        borderRadius : 10,
        top : 110,
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    buttoncontainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : 50,
        padding : 10,
    },
    buttontitle : {
        marginLeft : 15,
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal
    },
    name : {
        fontSize : 20,
        fontFamily : Constants.fontFamilybold,
        alignSelf : 'center',
        top : -35
    },
    email : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        alignSelf : 'center',
        color : Colors.darkgray,
        top : -35
    },
    imageholder : {
        width : 130, 
        height : 130, 
        borderRadius : 150, 
        alignSelf : 'center', 
        elevation : 8, 
        backgroundColor : 
        Colors.gray, 
        top : -60
    },
    image : {
        width : 150, 
        height : 150, 
        borderRadius : 100, 
        alignSelf : 'center'
    },
    loginbutton : {
        width : 100,
        padding : 10,
        borderRadius : 10,
        backgroundColor : Colors.secondary,
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        top : -25
    },
    loginbuttontitle : {
        fontSize : 18,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
    }
})

export default styles;