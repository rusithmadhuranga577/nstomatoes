import { Dimensions, StyleSheet } from "react-native";
import { Colors, Constants } from "@common";

const styles = StyleSheet.create({
    container: {
       width : '100%',
       height : '100%',
       backgroundColor : Colors.white
    },
    tabscontainerstyle : {
        width : '85%',
        height : 40,
        backgroundColor : Colors.white,
        elevation : 8,
        borderRadius : 5,
        alignSelf : 'center',
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
        marginBottom : 10
    },
    tabstyle : {
        backgroundColor: Colors.white,
        borderColor: 'transparent',
        borderRadius: 5
    },
    activetabstyle : {
        backgroundColor: Colors.primary, 
        marginTop: 2
    },
    tabtextstyle : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 15
    },
    activetabtextstyle : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15
    },
    separator : {
        height : 1,
        width : '95%',
        backgroundColor : Colors.darkgray,
        alignSelf : 'center'
    },
    sectiontitlestrip : {
        height : 40,
        width : '100%',
        backgroundColor : Colors.gray,
        paddingLeft : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingRight : 10
    },
    sectiontitlestriptext : {
        fontSize : 18,
        fontFamily : Constants.fontFamilybold
    },
    clearcarttext : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        marginLeft : 10
    },
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
    promobuttoncontainer : {
        backgroundColor : Colors.white,
        flexDirection : 'row',
        justifyContent : 'space-between',
        padding : 10,
        height : 60,
        alignItems : 'center',
        marginTop : 0
    },
    promobuttontitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        width : '100%',
        marginLeft : 10
    },
    textinput : {
        height: 60,
        padding: 10,
        backgroundColor: Colors.gray,
        width : 200,
        borderRadius : 8,
        color : Colors.black,
        fontFamily: Constants.fontFamilynormal, 
        width: '100%',
        alignSelf : 'center',
        marginBottom : 10
    },
    orderchargestext : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
    },
    orderchargescontainer : {
        width : '100%',
        padding : 10,
    },
    paymentsummerytext : {
        fontSize : 17,
        fontFamily : Constants.fontFamilybold,
        marginBottom : 15
    },
    orderchargespromotiontext : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.alertred
    },
    paymentoptionscontainer : {
        width : '100%',
        backgroundColor : Colors.gray,
        padding : 10
    },
    buttonholder : {
        width : '95%', 
        alignSelf : 'center', 
        marginTop : 20, 
        marginBottom : 100
    },
    locationerrorbox : {
        width : '100%', 
        padding : 8, 
        backgroundColor : Colors.alertred,
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 5
    },
    locationerrorboxtext : {
        fontSize : 13,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
    },
    alertbar : {
       width : '100%', 
       backgroundColor : Colors.alertred, 
       justifyContent : 'center',
       padding : 10,
       marginTop : 10
    },
    alerttitle : {
       fontSize : 14,
       fontFamily : Constants.fontFamilynormal,
       color : Colors.white,
    },
    alertsubtitle : {
       fontSize : 14,
       fontFamily : Constants.fontFamilybold,
       color : Colors.white,
       marginTop : 10
    }
  });
  
  export default styles;
  