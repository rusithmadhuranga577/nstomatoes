import { ColorPropType, StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        backgroundColor: Colors.darkgray,
        marginBottom : -60,
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 50,
        alignItems : 'center',
        padding : 10,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
    },
    heythere : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 20,
        color : Colors.white
    },
    loginor : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 14,
        color : Colors.white,
        marginTop : 5
    },
    textcontainer : {
        width : '80%'
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