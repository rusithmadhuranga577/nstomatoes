import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    buttoncontainer : {
        width: '100%', 
        height: 45,
        backgroundColor: Colors.primary,
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        borderRadius : 5
    },
    title : {
        fontSize : 15,
        color : Colors.white,
        fontFamily : Constants.fontFamilybold
    }
})

export default styles;