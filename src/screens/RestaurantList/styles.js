import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: '#fff',
    },
    addressbar : {
        width: '100%', 
        height : 55,
        backgroundColor : Colors.white,
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 8,
        paddingTop : 3,
        marginBottom : 10
    },
    addressbartitle : {
        fontSize : 13,
        fontFamily : Constants.fontFamilybold,
        alignSelf : 'center',
        color : Colors.primary
    },
    addresstext : {
        fontSize : 12,
        fontFamily : Constants.fontFamilybold,
        marginTop : 5,
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
        bottom : 60
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
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
})

export default styles;