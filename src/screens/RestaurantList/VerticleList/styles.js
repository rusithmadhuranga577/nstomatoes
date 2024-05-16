import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';
import { Dimensions } from "react-native";//94373164997

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container : {
        width: screenwidth,
        height:  screenheight,
        backgroundColor : Colors.white,
    },
    itemcontainer : {
        width: '95%', 
        backgroundColor: Colors.white,
        elevation : 8,
        borderRadius : 5,
        alignSelf : 'center',
        margin : 5,
        padding : 5,
        flexDirection : 'row',
        alignItems : 'center',
        borderRadius : 15,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
    },
    image : {
        width : 90,
        height : 90,
        backgroundColor : Colors.gray,
        marginRight : 10,
        borderRadius : 15
    },
    name : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 16,
        color : Colors.black,
    },
    address : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 12,
        color : Colors.black,
        marginTop : 3,
        width: '100%',
    },
    resdetailstext : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 12,
        color : Colors.black,
        marginTop : 3,
    },
    offertext : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 12,
        color : 'red',
        marginTop : 3,
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
        width : screenwidth,
        height : screenheight,
        alignItems : 'center',
        backgroundColor : Colors.white,
        borderRadius : 10,
        alignSelf : 'center',
        marginTop : 20,
    },
    emptytext : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 25,
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
        bottom : 5,
        right : 0
    },
    openclosetext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15
    },
    all : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 20,
        marginLeft : 15,
        marginBottom : 15,
        marginTop : 10
    }
})

export default styles;