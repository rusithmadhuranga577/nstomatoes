import { Dimensions, StyleSheet } from "react-native";
import { Colors, Constants } from "@common";

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const screenWidth = (Dimensions.get('window').width);
const sectionPadding = 20;

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    foodimage: {
        width: screenWidth,
        height: 'auto',
        backgroundColor: Colors.white,
        alignSelf: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backIconcontainer: {
        position: 'absolute',
        top: 20,
        left: 20
    },
    backIcon: {
        width: 40,
        height: 'auto',
    },
    title: {
        padding: sectionPadding,
        backgroundColor: Colors.white,
        paddingTop: 30
    },
    titleRow: {
        width: screenWidth-(sectionPadding*2),
        justifyContent: 'space-between',
        // alignItems: 'center',
        flexDirection: 'row',
    },
    requiredBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    requiiredText: {
        color: Colors.black, 
        fontSize: 12, 
        fontFamily : Constants.fontFamilynormal,
    },
    addonListContainer: {
        backgroundColor: Colors.white,
        padding: sectionPadding,
        marginTop: 10
    },
    contentContainer: {
        flexGrow: 1,
    },
    navContainer: {
        height: HEADER_HEIGHT,
        marginHorizontal: 10,
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
    titlestyle: {
        color: Colors.black, 
        fontSize: 20, 
        fontFamily : Constants.fontFamilybold,
    },
    sectionTitle: {
        color: Colors.black, 
        fontSize: 16, 
        fontFamily : Constants.fontFamilybold,
    },
    imageoverlay : {
        width : '100%', 
        height : '100%',
        top : 0
    },
    secondlinestyle : {
        fontFamily : Constants.fontFamilylight,
        fontSize : 14,
        marginTop : 10,
    },
    body : {
        padding : 0
    },
    titleholder : {
        width : '96%',
        height : 40,
        backgroundColor : Colors.gray,
        marginTop : 15,
        marginBottom : 5,
        justifyContent : 'center',
        padding : 10,
        alignSelf : 'center'
    },
    titleholdertext : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
    },
    addonrowleftitem : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 5,
        marginBottom : 5
    },
    checkboxwrapper : {
        borderWidth: 2, 
        borderColor: '#000', 
        height: 25, 
        width: 25, 
        borderRadius: 100,
        marginRight : 10,
        alignItems: 'center', 
        justifyContent : 'center',
    },
    addonitemrow : {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent : 'space-between',
        marginTop: 25
    },
    addonitemtext: {
        fontSize : 14,
        fontFamily : Constants.fontFamilylight,
        color : Colors.black,
    },
    addonplusbutton: {
        width: 32,
        height: 32,
        backgroundColor: '#E6E6E6',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counterbtn: {
        width: 50, 
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: Colors.primary,
    },
    countercontainer: {
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth/3,
        borderRadius: 20,
        height: 50,
        marginTop: 20
    },
    counterbuttontextstyle: {
        color : Colors.black,
        fontFamily: Constants.fontFamilybold, 
        fontSize: 20
    },
    countertext : {
        color : Colors.black,
        fontSize: 35
    },
    textinput : {
        height: 94,
        backgroundColor: '#E6E6E6',
        width : screenWidth,
        borderRadius : 8,
        color : Colors.black,
        fontFamily: Constants.fontFamilynormal, 
        width: '100%',
        alignSelf : 'center',
        marginTop : 18,
        marginBottom : 10
    },
    iconLeftholder : {
        borderRadius : 100,
        backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent : 'center',
        width : 30,
        height : 30,
        marginTop : 10,
        marginLeft : 0
    },
    iconLeft : {
        width : 50,
        height : 50
    },
    price : {
        fontSize : 20,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
    },
    originalprice : {
        fontSize : 14,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        marginLeft : 10,
        marginTop : 10
    },
    populerbadge : {
        padding : 3,
        paddingLeft : 20,
        paddingRight : 20,
        backgroundColor : '#FF5617',
        alignItems : 'center',
        borderRadius : 30,
        marginTop : 10,
        marginLeft : 10
    },
    populerbadgetext : {
        fontSize : 14,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
    },
    about : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        marginLeft : 10,
        marginTop : 15
    },
  });
  
  export default styles;
  