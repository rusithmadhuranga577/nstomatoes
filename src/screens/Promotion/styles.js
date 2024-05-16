import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    card : {
        height : 130,
        width : '95%',
        alignSelf : 'center',
        backgroundColor : Colors.white,
        elevation : 8,
        borderRadius : 15,
        marginTop : 15,
        marginBottom : 10,
        zIndex : 98,
        flexDirection : 'row'
    },
    applybutton : {
        width : 80,
        height : 30,
        borderRadius : 100,
        elevation : 8,
        backgroundColor : Colors.black,
        position : 'absolute',
        bottom : -5,
        right : 25,
        alignItems : 'center',
        justifyContent : 'center',
        zIndex : 99
    },
    applytext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15,
    },
    titlerow : {
        flexDirection : 'row',
        width : '40%',
        alignItems : 'center',
        padding : 5
    },
    title : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 15,
        marginLeft : 15,
        color : Colors.primary,
        width : '40%'
    },
    description : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 15,
        marginLeft : 5,
        color : Colors.black,
        marginTop : 10
    },
    promocodeholder : {
        padding : 3,
        backgroundColor : Colors.primary,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,
        marginTop : 10
    },
    promocode : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
    },
    validto : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.primary
    },
})

export default styles;