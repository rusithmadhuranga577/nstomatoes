import { StyleSheet, Dimensions } from "react-native";
import { Colors, Constants } from "@common";

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
    container: {
      flex : 1
    },
    tabBar: {
      backgroundColor: '#fff',
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1
    },
    tabContainer: {
      borderBottomColor: '#090909',
    },
    tabText: {
      padding: 15,
      color: '#9e9e9e',
      fontSize: 18,
      fontWeight: '500'
    },
    separator: {
      height: 0.5,
      width: '96%',
      alignSelf: 'flex-end',
      backgroundColor: '#eaeaea'
    },
    sectionHeaderContainer: {
      height: 10,
      backgroundColor: '#f6f6f6',
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1,
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1
    },
    sectionHeaderText: {
      color: '#010101',
      backgroundColor: '#fff',
      fontSize: 23,
      fontWeight: 'bold',
      paddingTop: 25,
      paddingBottom: 5,
      paddingHorizontal: 15
    },
    itemTitle: {
      flex: 1,
      fontSize: 20,
      color: '#131313'
    },
    itemPrice: {
      fontSize: 18,
      color: '#131313'
    },
    itemDescription: {
      marginTop: 10,
      color: '#b6b6b6',
      fontSize: 16
    },
    itemRow: {
      flexDirection: 'row'
    },
    tabbarcontainer : {
      height: 30, 
      marginRight: 5, 
      marginTop: 10 , 
      marginLeft: 5, 
      marginBottom: 10,
      borderRadius : 20,
    },
    tabcontainer : {
      height : 30,
      borderRadius : 10,
      alignItems : 'center',
      justifyContent : 'center',
      paddingLeft : 10,
      paddingRight : 10
    },
    selectedtabcontainer : {
      height : 30,
      borderRadius : 10,
      alignItems : 'center',
      justifyContent : 'center',
      paddingLeft : 10,
      paddingRight : 10,
      backgroundColor : Colors.primary,
      borderRadius : 15
    },
    tabbartitle : {
      fontFamily : Constants.fontFamilybold,
    },
    headertitle : {
      height: 20, 
      width: '100%', 
      color: Colors.black,
      fontFamily : Constants.fontFamilybold,
      fontSize : 20
    },
    headercontainer : {
      height : 40,
      justifyContent : 'center',
      paddingLeft : 10
    },
    itemcontainer : {
      borderRadius : 10,
      backgroundColor : '#fff',
      elevation : 8,
      paddingTop : 5,
      margin : 3,
      padding : 3
    },
    foodname : {
      fontSize : 15,
      fontFamily : Constants.fontFamilynormal
    },
    percentage : {
      fontSize : 14,
      fontFamily : Constants.fontFamilybold,
      width : '100%',
      color : Colors.white
    },
    foodsecondline : {
      fontSize : 10,
      fontFamily : Constants.fontFamilynormal,
      width : '100%'
    },
    price : {
      fontSize : 15,
      fontFamily : Constants.fontFamilynormal
    },
    image : {
      width : '100%',
      height : 100,
      borderRadius : 5,
      borderWidth : 1,
      borderColor : Colors.black,
    },
    imageholder : {
      width : '90%',
      height : 100,
      borderRadius : 5,
      alignSelf : 'center',
    },
    cartpopupcontainer : {
      width : '100%',
      height : 70,
      backgroundColor : Colors.primary,
      borderTopLeftRadius : 8,
      borderTopRightRadius : 8,
      flexDirection : 'row',
      justifyContent : 'space-between',
      position : 'absolute',
      bottom : 0
    },
    cartpricetext : {
      fontSize : 18,
      fontFamily : Constants.fontFamilybold,
      color : Colors.white
    },
    cartqtytext : {
      fontSize : 15,
      fontFamily : Constants.fontFamilynormal,
      color : Colors.white
    },
    cartpopupicon : {
      alignSelf : 'center',
      marginRight : 25
    },
    titlestyle: {
      color: Colors.black, 
      fontSize: 19, 
      alignSelf : 'flex-start', 
      fontFamily : Constants.fontFamilybold
    },
    restaurentdatasubline: {
      color: Colors.darkgray, 
      fontSize: 13, 
      fontFamily : Constants.fontFamilynormal,
    },
    imageoverlay : {
      backgroundColor : 'rgba(0,0,0,0.3)', 
      width : '100%', 
      height : '100%'
    },
    contentContainer: {
      flexGrow: 1,
    },
    iconRight : {
      justifyContent : 'center',
      marginRight : 10
    },
    navContainer: {
      height: HEADER_HEIGHT,
      marginTop : HEADER_HEIGHT-50,
      width : '100%',
      alignSelf : 'center'
    },
    statusBar: {
      height: STATUS_BAR_HEIGHT,
      backgroundColor: 'transparent',
    },
    navBar: {
      height: NAV_BAR_HEIGHT,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
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
    itemoverlay : {
      width : '100%',
      height : '100%',
      backgroundColor : 'rgba(F,F,F,1)',
      position : 'absolute',
      zIndex: 99,
      alignItems : 'center',
      justifyContent : 'center'
    },
    notavailabletext : {
      fontSize : 20,
      fontFamily : Constants.fontFamilybold,
      color : Colors.black
    },
    restaurantname : {
      fontSize : 25,
      fontFamily : Constants.fontFamilybold,
      color : Colors.black,
    },
    res_banner_overlay : {
      flexDirection : 'column',
      justifyContent : 'flex-end',
      padding : 10,
      backgroundColor : Colors.white
    },
    restaurandeliverytime : {
      fontSize : 12,
      fontFamily : Constants.fontFamilynormal,
      color : Colors.black,
    },
    restaurantdescription : {
      fontSize : 15,
      fontFamily : Constants.fontFamilynormal,
      color : Colors.darkgray,
      marginBottom : 10
    },
    merchantinfobutton : {
      width : 50,
      height : 50,
      borderRadius : 10,
      backgroundColor : Colors.white,
      elevation : 8,
      position : 'absolute',
      right : 10,
      top : -20,
      alignItems : 'center',
      justifyContent : 'center'
    },
    allproducts : {
      fontSize : 20,
      fontFamily : Constants.fontFamilybold,
      color : Colors.black,
      marginLeft : 10
    }
  });

export default styles;
  