import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    input: {
        height: 50,
        padding: 10,
        backgroundColor: Colors.gray,
        width : '100%',
        borderTopRightRadius : 8,
        borderBottomRightRadius : 8,
        color : Colors.black,
        marginBottom : 20
    },
    pagetitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 30
    },
    pagesubtitle : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 16,
        marginBottom : 30,
        marginTop : 10
    }
})

export default styles;