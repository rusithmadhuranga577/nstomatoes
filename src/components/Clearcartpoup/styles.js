import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const screenheight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    overlay : {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 20,
        marginTop : 10
    },
    subtitle : {
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
        fontSize : 15,
        marginTop : 8,
    },
    bottomcontainer : {
        width : '90%',
        height : 150,
        backgroundColor : Colors.white,
        paddingTop : 0,
        padding : 15,
        borderRadius : 15,
        marginBottom : 100
    },
    buttonrow : {
        width : '100%', 
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignSelf : 'center',
        marginTop : 30
    },
    button : {
        width : '48%',
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,
        elevation : 5
    },
    buttontitle : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15,
    }
})

export default styles;