import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width : '100%',
        padding : 10,
        backgroundColor : Colors.white
    },
    itemcontainer : {
        width: 80, 
        height: 100,
        borderRadius : 10,
        marginLeft : 5,
        marginRight : 5,
        alignItems : 'center',
        justifyContent : 'center',
        margin : 5,
        backgroundColor : '#e5e6fe'
    },
    imagecontainer : {
        width : 60,
        height: 60,
        borderRadius : 10,
    },
    image : {
        width : '100%',
        height : '100%',
        borderRadius : 10,
    },
    itemtitlestyle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 12,
        color : Colors.black,
        marginTop : 5
    },
})

export default styles;