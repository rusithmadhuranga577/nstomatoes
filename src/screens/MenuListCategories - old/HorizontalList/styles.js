import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width : '100%',
        padding : 8,
    },
    subcontainer : {
        width : '100%',
        padding : 10,
        backgroundColor : Colors.white
    },
    itemcontainer : {
        borderRadius : 100,
        marginLeft : 8,
        marginRight : 8,
        alignItems : 'center',
        justifyContent : 'center',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    imagecontainer : {
        width : 50,
        height: 50
    },
    image : {
        width : '100%',
        height : '100%'
    },
    itemtitlestyle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 14,
        color : Colors.black
    },
    separator : {
        width: '110%',
        height : 2,
        backgroundColor : Colors.black
    }
})

export default styles;