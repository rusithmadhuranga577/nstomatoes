import { ColorPropType, StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        backgroundColor: Colors.lightred,
        marginBottom : -50,
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 60,
        alignItems : 'center',
        padding : 15,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
        borderBottomLeftRadius : 15,
        borderBottomRightRadius : 15,
        zIndex : 99
    },
    heythere : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 25,
        color : Colors.black
    },
    loginor : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 16,
        color : Colors.black
    },
    textcontainer : {
        width : '65%'
    },
    loginbuttoncontainer : {
        width : 80,
        borderRadius : 8,
        backgroundColor : Colors.secondary,
        alignItems : 'center',
        justifyContent : 'center',
        padding : 5,
        marginTop : 15
    },
    loginbuttontext : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 15,
        color : Colors.white
    },
})

export default styles;