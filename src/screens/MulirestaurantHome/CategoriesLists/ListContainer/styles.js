import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';
import { Dimensions } from "react-native";//94373164997

const screenwidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height:  '100%',
        backgroundColor : Colors.white,
    },
    itemcontainer : {
        width: 300, 
        backgroundColor: Colors.white,
        elevation : 3,
        borderRadius : 15,
        alignSelf : 'center',
        margin : 8,
        padding : 10,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
    },
    image : {
        width : '100%',
        height : 120,
        borderRadius : 15,
        backgroundColor : Colors.gray
    },
    name : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 17,
        color : Colors.black,
    },
    address : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 14,
        color : Colors.black,
        marginTop : 3,
        width: '90%',
    },
    directionimage : {
        width : 25, 
        height : 25,
        position : 'absolute',
        right : 10,
        bottom : 10
    },
    startcontainer : {
        flexDirection : 'row',
        alignItems : 'center',
        width : '80%',
        marginTop : 5,
        bottom : 5,
        left : 5,
        position : 'absolute'
    },
    emptycontainer : {
        width : '95%',
        height : 150,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : Colors.gray,
        borderRadius : 10,
        alignSelf : 'center',
        marginTop : 20
    },
    emptytext : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 20,
        color : Colors.darkgray,
        marginTop : 3
    },
    phone : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 14,
        color : Colors.darkgray,
        marginLeft : 10
    },
    openclosecontainer : {
        padding : 5,
        alignItems : 'center',
        justifyContent : 'center',
        paddingRight : 15,
        paddingLeft : 15,
        position : 'absolute',
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
        elevation : 5,
        top : 15,
        right : 0
    },
    openclosetext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15
    },
    promo : {
        fontFamily : Constants.fontFamilybold,
        color : 'red',
        fontSize : 12,
        marginTop : 3,
        marginBottom : 8
    },
    resdetailstext : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 12,
        color : Colors.balck,
    },
})

export default styles;