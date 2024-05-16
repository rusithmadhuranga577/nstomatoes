import { StyleSheet } from "react-native";
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemcontainer: {
    borderRadius: 2,
    padding: 8,
    height: 200,
    width: 210,
    alignItems: 'center',
    backgroundColor : Colors.white,
    marginRight : 5,
    borderRadius : 16,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
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
    width: '100%',
    height : 120,
    borderRadius : 16
  },
  latestoffertext : {
    fontFamily : Constants.fontFamilybold,
    color : Colors.black,
    fontSize : 18,
    marginLeft : 10,
    fontWeight: 'bold'
  },
  titlebartext : {
    fontFamily : Constants.fontFamilybold,
    color : Colors.black,
    fontSize : 18,
    marginLeft : 10,
  },
  title : {
    fontSize: 14,
    fontFamily : Constants.fontFamilylight,
    color: Colors.black,
    marginTop : 10,
    alignSelf: 'flex-start',
  },
  titlerow : {
    width : '100%', 
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  price : {
    fontSize: 12,
    fontFamily : Constants.fontFamilynormal,
    color: Colors.fontSecondary,
    marginTop : 5,
    alignSelf: 'flex-start',
    fontWeight: '300'
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