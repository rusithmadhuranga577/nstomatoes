import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    buttoncontainer : {
        width: '80%', 
        height: 70,
        backgroundColor: Colors.primary,
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        borderRadius : 32,
        flexDirection : 'row',
        paddingRight : 20,
        paddingLeft : 20
    },
    title : {
        fontSize : 16,
        color : Colors.white,
        fontFamily : Constants.fontFamilynormal
    }
})

export default styles;