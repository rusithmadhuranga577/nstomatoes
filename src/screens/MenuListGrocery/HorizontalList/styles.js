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
        width: 80, 
        height: 90,
        borderRadius : 10,
        marginLeft : 5,
        marginRight : 5,
        alignItems : 'center',
        justifyContent : 'center',
        margin : 5,
        backgroundColor : '#BAF8F9',
        opacity : 0.9,
        paddingTop : 10,
        paddingBottom : 10
    },
    imagecontainer : {
        width : 60,
        height: 60,
        alignSelf : 'center',
        borderRadius : 5,
        alignItems : 'center',
        justifyContent : 'center'
    },
    image : {
        width : '100%',
        height : '100%',
        borderRadius : 5,
    },
    itemtitlestyle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 13,
        color : Colors.black,
        marginTop : 5
    },
    separator : {
        width: '110%',
        height : 2,
        backgroundColor : Colors.black
    }
})

export default styles;