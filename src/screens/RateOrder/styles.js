import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const Width = Dimensions.get('screen').width;
const imagelength = Width/3.7;

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    buttonholder : {
        position : 'absolute',
        width : '95%',
        alignSelf : 'center',
        bottom : 10
    },
    pagetitle : {
        fontSize : 20,
        fontFamily : Constants.fontFamilybold,
        alignSelf : 'center',
        marginTop : 15,
        backgroundColor : '#183051',
        width : '100%',
        padding : 20,
        textAlign : 'center'
    },
    pagesubtitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        textAlign : 'center',
        color : '#183051',
        marginBottom : 15,
        marginTop : 10,
    },
    input : {
        width : '95%',
        padding : 10,
        backgroundColor : Colors.gray,
        alignSelf : 'center',
        elevation : 5,
        borderRadius : 10,
        minHeight : 60,
        marginBottom : 70,
        textAlignVertical : 'top',
        color : Colors.black,
    },

    // Restaurant Details
    restaurantdetailsbar : {
        width : '100%',
        padding : 10,
        flexDirection : 'row',
        alignItems : 'center',
    },
    imageholder : {
        width : 110,
        height : 110,
        borderRadius : 10,
        marginRight : 10,
        backgroundColor : Colors.gray,
        elevation : 8
    },
    image : {
        width : '100%',
        height : '100%',
        borderRadius : 10,
    },
    restaurantname : {
        fontSize : 16,
        fontFamily : Constants.fontFamilybold,
        width : '100%'
    },
    restaurantnamesubline : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        width : '100%',
    },
    separator : {
        width : '100%',
        height : 1.5,
        backgroundColor : Colors.gray
    },

    // Order rate
    orderideacontainer : {
        width : '40%',
        padding : 5,
    },
    orderratetitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 18,
        alignSelf : 'center',
        marginTop : 10,
        marginBottom : 10
    },
    orderrateiconbarcontainer : {
        flexDirection : 'row',
        justifyContent :'space-between',
        width : 120,
        alignSelf : 'center',
        alignItems : 'center',
        marginTop : 5
    },
    iconstyle : {
        padding : 10,
        borderRadius : 100,
    },
    containercard : {
        width : '95%',
        alignSelf : 'center',
        flexDirection : 'row',
        padding : 10,
        backgroundColor : Colors.white,
        elevation : 5,
        borderRadius : 10,
        marginBottom : 10
    },
    imagecontainer : {
        width : 100,
        height : 100,
        borderRadius : 100,
        backgroundColor : Colors.gray
    },
    image : {
        width : '100%',
        height : '100%',
        borderRadius : 100
    },

    // Item rate
    itemrateiconbarcontainer : {
        flexDirection : 'row',
        justifyContent :'space-between',
        width : 100,
    },
    itemrateiconstyle : {
        borderRadius : 100,
        padding : 5
    },

    // List
    cartitemcontainer : {
        flexDirection : 'row',
        width : '100%',
        padding : 10,
        backgroundColor : Colors.white,
        alignItems : 'center'
    },
    cartitemimageholder : {
        width : 90,
        height : 90,
        backgroundColor : Colors.gray,
        borderRadius : 10,
        marginRight : 10
    },
    cartitemtitle : {
        fontSize : 10,
        fontFamily : Constants.fontFamilybold,
        width : '100%',
        color : Colors.black
    },
    cartitemportion : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        width : '100%',
    },
    cartitemaddon : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        width : '100%',
    },
    cartitempreparationnote : {
        fontSize : 12,
        fontFamily : Constants.fontFamilybold,
        width : '80%',
        color : Colors.alertred,
        marginTop : 5
    },
    cartitemtotal : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        position : 'absolute',
        bottom : 5,
        right : 10,
    },
    cartitemimage : {
        width : '100%',
        height : '100%',
        borderRadius : 10
    },

    // Header Bar 
    headerbar : {
        height : 45,
        width : '100%',
        backgroundColor : Colors.white,
        flexDirection : 'row',
        justifyContent : 'space-between',
        justifyContent : 'center',
        alignItems : 'center',
        elevation : 5
    },
    headertitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 18,
        color : Colors.black,
        alignSelf : 'center'
    },
    canceltext : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 12,
        color : Colors.alertred,
    },
    canceltextholder : {
        position : 'absolute',
        right : 15
    }
})

export default styles;