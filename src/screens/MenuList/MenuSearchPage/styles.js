import { StyleSheet, Dimensions } from "react-native";
import { Colors, Constants } from "@common";

const styles = StyleSheet.create({
    container: {
        height : '100%',
        width : '100%',
        backgroundColor : Colors.white,
        padding : 10
    },
    input : {
        width : '78%',
        padding : 10,
        height : 50,
        backgroundColor : Colors.gray,
        borderTopLeftRadius : 15,
        borderBottomLeftRadius : 15,
        color : Colors.black,
        fontFamily : Constants.fontFamilybold,
        marginTop : 40
    },
    searchiconholder : {
        width : 50,
        height : 50,
        backgroundColor : Colors.gray,
        borderTopRightRadius : 15,
        borderBottomRightRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 40
    },
    backiconholder : {
        width : 30,
        height : 30,
        borderRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 40
    },
    itemcontainer : {
        backgroundColor: Colors.white,
        marginBottom : 10,
        width : '98%',
        alignSelf : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
        borderRadius : 5,
        padding : 10,
        elevation : 5,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
    },
    foodname : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal
    },
    foodsecondline : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        width : '100%'
    },
    price : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal
    },
    image : {
        width : 90,
        height : 90,
        borderRadius : 5
    },
    populerbadge : {
      width : 70,
      padding : 3,
      paddingLeft : 10,
      paddingRight : 10,
      borderRadius : 20,
      backgroundColor : Colors.successgreen,
      alignItems : 'center',
      justifyContent : 'center',
      marginRight : 5
    },
    populerbadgetext : {
      fontSize : 10,
      fontFamily : Constants.fontFamilybold,
      color : Colors.white
    },
    itemoverlay : {
      width : '100%',
      height : '100%',
      backgroundColor : 'rgba(0,0,0,0.25)',
      position : 'absolute',
      zIndex: 99,
      alignItems : 'center',
      justifyContent : 'center'
    },
    notavailabletext : {
      fontSize : 20,
      fontFamily : Constants.fontFamilybold,
      color : Colors.white
    },
    restaurantname : {
      fontSize : 20,
      fontFamily : Constants.fontFamilybold,
      color : Colors.black,
    },
    res_banner_overlay : {
      width : '100%',
      height : '100%',
      backgroundColor : Colors.white,
      flexDirection : 'column',
      justifyContent : 'flex-end',
      padding : 10
    },
    restaurandeliverytime : {
      fontSize : 12,
      fontFamily : Constants.fontFamilynormal,
      color : Colors.black,
    },
    itemunavailabletext : {
      position : 'absolute',
      fontFamily : Constants.fontFamilybold,
      fontSize : 30,
      color : Colors.black
    },
    merchantinfobutton : {
      width : 50,
      height : 50,
      borderRadius : 10,
      backgroundColor : Colors.white,
      elevation : 8,
      position : 'absolute',
      right : 10,
      top : -110,
      alignItems : 'center',
      justifyContent : 'center'
    },
    restaurantdescription : {
      fontSize : 15,
      fontFamily : Constants.fontFamilynormal,
      color : Colors.darkgray,
    },    
});

export default styles;
  