import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    pagetitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 25,
        alignSelf : 'center'
    },
    inputcontainer : {
        width: '95%',
        borderColor : Colors.black,
        borderRadius : 10,
        padding : 10,
        alignSelf : 'center',
        backgroundColor : Colors.gray,
        marginTop : 20,
        color : Colors.black
    },
    buttonholder : {
        marginTop : 80,
        alignSelf : 'center',
        zIndex: 99,
        width: '95%',
    }
})

export default styles;