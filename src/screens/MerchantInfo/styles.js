import { StyleSheet } from "react-native";
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor : Colors.white,
    },
    coverimagecontainer : {
        width: '98%',
        height : 180,
        alignSelf : 'center',
        resizeMode : 'cover',
        borderRadius : 15
    },
    itemcontainer : {
        width : '98%',
        padding : 8,
        borderTopRightRadius : 15,
        borderBottomLeftRadius : 15,
        backgroundColor : Colors.gray,
        alignSelf : 'center',
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 8,
        elevation : 5
    },
    containertitle : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 13,
        width : '90%',
        color : Colors.black
    },
    iconcontainer : {
        width : 30,
        height : 30,
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : 15
    },
    separator : {
        width : '95%',
        alignSelf : 'center',
        height : 0.8,
        backgroundColor : Colors.darkgray,
        marginTop : 15,
        marginBottom : 10,
        opacity: 0.5,
    },
    ratingsandreviews : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 18,
        alignSelf : 'center',
        color : Colors.black,
        marginBottom : 10
    },
    ratingcontainer : {
        width : '95%',
        padding : 8,
        borderRadius : 35,
        backgroundColor : Colors.gray,
        alignSelf : 'center',
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 10,
        elevation : 5,
        marginBottom : 10
    },
    dpcontainer : {
        width : 45,
        height : 45,
        borderRadius : 100,
        marginRight : 10,
        backgroundColor : Colors.darkgray
    },
    review : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 12,
        color : Colors.black,
        width: '100%',
    },
    username : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 13,
        color : Colors.black,
        marginBottom : 8
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : '95%'
    }
})

export default styles;