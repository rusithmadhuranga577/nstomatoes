import { Dimensions, StyleSheet } from "react-native";
import { Colors, Constants } from "@common";

const styles = StyleSheet.create({
      buttoncontainer: {
         width : '100%',
         height : 70,
         backgroundColor : Colors.white,
         flexDirection : 'row',
         justifyContent : 'space-between',
         alignItems : 'center',
         padding : 5
      },
      buttontitle : {
         fontFamily : Constants.fontFamilynormal,
         fontSize : 13,
         color : Colors.black
      },
      buttonsubtitle : {
         fontFamily : Constants.fontFamilybold,
         fontSize : 15,
         color : Colors.black,
      },
      optioncontainer : {
         padding : 8
      },
      optionstitle : {
         fontFamily : Constants.fontFamilybold,
         fontSize : 17,
         color : Colors.white,
         alignSelf : 'center',
      },
      optionstitlebar : {
         padding : 10,
         backgroundColor : Colors.primary,
         borderTopLeftRadius : 10,
         borderTopRightRadius : 10
      },
      separator : {
         width : '100%',
         height : 1,
         backgroundColor: Colors.gray,
         marginTop : 10
      },

      /////////////////////// Set Schedule Styles /////////////////////////
      overlay : {
         flex : 1,
         position : 'absolute',
         top : 0,
         bottom : 0,
         left : 0,
         right : 0,
         backgroundColor : 'rgba(0,0,0,0.5)',
         alignItems : 'center',
         justifyContent : 'center'
      },
      container : {
         width : '90%',
         padding : 15,
         backgroundColor: Colors.white,
         zIndex: 99,
         borderRadius : 10,
         alignItems : 'center',
         justifyContent : 'center',
         borderTopWidth : 20,
         borderTopColor : Colors.primary
      },
      rowcontainer : {
         flexDirection : 'row',
         width : '90%',
         padding : 10,
         borderWidth : 1,
         borderColor : Colors.darkgray,
         alignSelf : 'center',
         borderRadius : 15,
         alignItems : 'center',
         justifyContent : 'center',
      },
      text : {
         fontFamily : Constants.fontFamilybold,
         fontSize : 18,
         color : Colors.black
      },
      title : {
         fontFamily : Constants.fontFamilybold,
         fontSize : 18,
         color : Colors.black,
         alignSelf : 'center',
         marginBottom : 20
      },
      buttonholder : {
         width : '90%',
         alignSelf : 'center',
         marginTop : 20
      },
      containertitle : {
         fontSize : 15,
         alignSelf : 'center',
         fontFamily : Constants.fontFamilynormal,
         marginBottom : 8,
      },
      thetimetext : {
         fontSize : 12,
         alignSelf : 'center',
         fontFamily : Constants.fontFamilybold,
         color : Colors.alertred,
         textAlign : 'center',
         marginTop : 10
      }
  });
  
  export default styles;
  