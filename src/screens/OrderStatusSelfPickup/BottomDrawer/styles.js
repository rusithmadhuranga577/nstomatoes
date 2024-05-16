import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const Width = Dimensions.get('screen').width;
const imagelength = Width/1.3;

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    slidertopcontainer : {
        backgroundColor: Colors.primary, 
        height: 50, 
        alignItems:'center', 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10
    },
    slidertopcontainerhandle : {
        width: 50, 
        backgroundColor: Colors.gray, 
        height: 3, 
        marginTop: 5
    },
    driverinfocontainer : {
        justifyContent : 'space-between', 
        width : '100%', 
        height : 100, 
        padding : 5,
        marginBottom : 30
    },
    callbuttoncontainer : {
        width : 30,
        height : 30,
        borderRadius : 200,
        backgroundColor : Colors.gray,
        alignItems : 'center',
        justifyContent : 'center'
    },
    imageholder : {
        width: 60, 
        height: 60, 
        borderRadius: 400/2,
        alignSelf : 'center',
        elevation : 8,
        backgroundColor : Colors.gray
    },
    licenseplate : {
        fontSize : 25,
        fontFamily : Constants.fontFamilybold,
        alignSelf : 'flex-end'
    },
    deliverytime : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        marginTop : 10
    },
    separator : {
        width : '95%',
        height : 1,
        backgroundColor : Colors.gray,
        alignSelf : 'center',
        marginTop : 15
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
        width : 80,
        height : 80,
        backgroundColor : Colors.gray,
        borderRadius : 10,
        marginRight : 10
    },
    cartitemtitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        width : '100%',
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

    // Order Charges
    orderchargestext : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
    },
    orderchargescontainer : {
        width : '100%',
        padding : 10,
    },
    orderchargespromotiontext : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        color : Colors.alertred
    },
    drivernametext : {
        fontSize : 20,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black
    },
    paymentmodeinfocontainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 30,
        backgroundColor : Colors.gray,
        padding : 10
    },
    driverratebar : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 5,
    },
    driverratetext : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
        marginLeft : 8
    }
})

export default styles;