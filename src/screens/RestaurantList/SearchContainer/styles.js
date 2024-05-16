import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: 40,
        backgroundColor: 'transparent',
        flexDirection : 'row',
        alignItems : 'center',
        alignSelf : 'center',
        justifyContent : 'space-between',
        padding : 10,
        marginBottom : 10,
        marginTop : 10
    },
    input : {
        width : '75%',
        height : 45,
        borderRadius : 10,
        backgroundColor : Colors.gray,
        padding : 10,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        justifyContent : 'center'
    },
    iconholder : {
        width : 45,
        height : 45,
        borderRadius : 10,
        backgroundColor : Colors.gray,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.darkgray
    },
    wedelivering : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.primary,
        fontSize : 15
    },
    address : {
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
        fontSize : 12,
        marginTop : 3,
        width : '90%'
    }
})

export default styles;