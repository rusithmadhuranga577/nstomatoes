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
        fontFamily : Constants.fontFamilybold
    },
    searchiconholder : {
        width : 50,
        height : 50,
        backgroundColor : Colors.gray,
        borderTopRightRadius : 15,
        borderBottomRightRadius : 15,
        alignItems : 'center',
        justifyContent : 'center'
    },
    backiconholder : {
        width : 30,
        height : 30,
        borderRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
    },
    itemcontainer : {
      borderRadius : 10,
      backgroundColor : '#fff',
      elevation : 8,
      paddingTop : 20,
      margin : 3,
      alignItems : 'center',
      justifyContent : 'center'
    },
    foodname : {
        fontSize : 16,
        fontFamily : Constants.fontFamilybold
    },
    foodsecondline : {
        fontSize : 13,
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
      padding : 2,
      paddingLeft : 8,
      paddingRight : 8,
      backgroundColor : '#FF5617',
      alignItems : 'center',
      marginLeft : 10,
      position : 'absolute',
      alignSelf : 'center',
      top : 0,
      borderBottomRightRadius : 5,
      borderBottomLeftRadius : 5
    },
    populerbadgetext : {
      fontSize : 10,
      fontFamily : Constants.fontFamilybold,
      color : Colors.white
    },
});

export default styles;
  