import { Dimensions, StyleSheet } from "react-native";
import { Colors, Constants } from "@common";

const styles = StyleSheet.create({
   container: {
      width : '100%',
      height : '100%',
      backgroundColor : Colors.white
   },
      image : {
      height : 300,
      resizeMode : 'contain',
      alignSelf : 'center'
   },
   title : {
      fontFamily : Constants.fontFamilybold,
      fontSize : 25,
      color : Colors.secondary,
      alignSelf : 'center',
      marginTop : 20,
      marginBottom : 30
   }
  });
  
  export default styles;
  