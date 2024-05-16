import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.backgroundgray,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
    },
    noordercontainer : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
        justifyContent : 'center',
        alignItems : 'center'
    },
    noorderstext : {
        fontSize : 25,
        fontFamily : Constants.fontFamilybold,
        alignSelf : 'center',
        color : Colors.darkgray,
        opacity : 0.5
    },
    restaurantname : {
        fontSize : 18,
        fontFamily : Constants.fontFamilybold,
        width : '75%'
    },
    itemcontainer : {
        width : '95%',
        padding : 15,
        backgroundColor : Colors.white,
        elevation : 8,
        marginTop : 8,
        marginBottom : 8,
        alignSelf : 'center',
        borderRadius : 10
    },
    datetime : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.darkgray,
    },
    toprow : {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between'
    },
    listitemtext : {
        fontSize : 13,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
    },
    fooditemcontainer : {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between',
        marginTop : 2
    },
    totalcontainer : {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between',
        marginTop : 15
    },
    total : {
        fontSize : 16,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
    },
    buttoncontainer : {
        width : 100,
        height : 30,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : Colors.primary,
        borderRadius : 15,
        elevation : 5,
        marginTop : 15,
    },
    buttontext : {
        fontSize : 14,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
    },
    iconbuttoncontainer : {
        width : 30,
        height : 30,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : Colors.primary,
        borderRadius : 20,
        elevation : 5,
        marginTop : 15
    },
    clearicon : {
        width : 20,
        height : 20,
    },
    cleariconrow : {
        padding : 5,
        height : 30,
        position : 'absolute',
        top : 15,
        right : 15,
        flexDirection : 'row'
    },
    cleartext : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 15,
        marginLeft : 8,
        color : Colors.primary
    }
})

export default styles;