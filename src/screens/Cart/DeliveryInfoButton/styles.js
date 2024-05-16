import { Dimensions, StyleSheet } from "react-native";
import { Colors, Constants } from "@common";

const styles = StyleSheet.create({
    buttoncontainer: {
       width : '100%',
       backgroundColor : Colors.white,
       flexDirection : 'row',
       justifyContent : 'space-between',
       alignItems : 'center',
       padding : 10
    },
    buttontitle : {
       fontFamily : Constants.fontFamilynormal,
       fontSize : 12,
       color : Colors.black
    },
    buttonsubtitle : {
      fontFamily : Constants.fontFamilybold,
      fontSize : 14,
      color : Colors.black,
    }
  });
  
  export default styles;
  