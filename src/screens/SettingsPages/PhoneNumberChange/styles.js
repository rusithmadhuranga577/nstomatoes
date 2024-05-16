import { StyleSheet } from "react-native";
import { Colors, Constants } from "@common";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height : '100%',
    backgroundColor: Colors.white
  },
  pickeroptioncontainer : {
    width: '100%',
    height : 50,
    backgroundColor: Colors.white,
    justifyContent : 'space-between',
    padding : 10,
    flexDirection : 'row',
  },
  pickercontainer : {
    width: 70,
    height : 50,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent : 'center',
    borderRadius : 8
  },
  phonenumbertitle : {
    fontSize : 15,
    alignSelf : 'center',
    fontFamily : Constants.fontFamilybold,
    marginTop : 25,
    marginBottom : 10
  },
  countrycodeholder : {
    width: 50,
    height : 50,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent : 'center',
    borderTopLeftRadius : 8,
    borderBottomLeftRadius : 8,
    marginLeft : 10,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: Colors.gray,
    width : 210,
    borderTopRightRadius : 8,
    borderBottomRightRadius : 8,
    color : Colors.black
  },
  componentrow : {
    flexDirection: 'row',
    height : 60,
    alignItems : 'center',
    alignSelf : 'center' ,
  },
  usernameinput : {
    height: 50,
    padding: 10,
    backgroundColor: Colors.gray,
    width : 200,
    borderRadius : 8,
    color : Colors.black,
    width : '100%',
    alignSelf : 'center'
  },
  usernametitle : {
    fontSize : 15,
    fontFamily : Constants.fontFamilybold,
    marginBottom : 10,
    alignSelf : 'center'
  }
});

export default styles;
  