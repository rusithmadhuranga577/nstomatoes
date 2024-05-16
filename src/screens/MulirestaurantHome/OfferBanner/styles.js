import { StyleSheet, Dimensions } from "react-native";
import { Colors, Constants } from '@common';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemcontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  itemName: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
    color: '#707070'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  image : {
    width: windowWidth,
    height: 'auto'
  },
  latestoffertext : {
    fontFamily : Constants.fontFamilybold,
    color : Colors.black,
    fontSize : 18,
    marginLeft : 10,
    fontWeight: 'bold'
  },
  description : {
    fontSize: 12,
    fontFamily : Constants.fontFamilynormal,
    color: Colors.black,
    marginTop : 5
  },
  promonamecontainer : {
    paddingLeft : 15,
    paddingRight : 15,
    padding : 5,
    position : 'absolute',
    top : 20,
    left : 0,
    backgroundColor : Colors.successgreen,
    borderTopRightRadius : 10,
    borderBottomRightRadius : 10,
    alignItems : 'center',
    justifyContent : 'center',
    elevation : 5
  },
  name : {
    fontSize: 12,
    fontFamily : Constants.fontFamilybold,
    color: Colors.white,
  },
  validcontainer : {
    position : 'absolute',
    bottom : 5
  },
  separator : {
    height: 1,
    width : '100%',
    backgroundColor : Colors.darkgray
  }
});

export default styles;