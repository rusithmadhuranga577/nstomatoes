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
        width : '90%',
        borderTopRightRadius : 8,
        borderBottomRightRadius : 8,
        color : Colors.black,
        alignSelf : 'center'
    },
    inputcontainer : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center' 
    },
    iconholder : {
        backgroundColor: Colors.gray,
        alignItems : 'center',
        justifyContent : 'center',
        height : 50,
        width: '10%',
        borderBottomLeftRadius : 8,
        borderTopLeftRadius : 8
    },
    placeholdertitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        marginBottom : 5
    },
    checkboxcontainer : {
        flexDirection : 'row',
        alignItems : 'center',
        alignSelf : 'flex-end'
    },
    checkboxcontainertext: {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal
    },
    placeholder: {
        width: 200,
        height: 200,
        borderRadius : 1000,
        backgroundColor : Colors.gray,
        alignSelf : 'center',
        zIndex : 1
    },
    cameraiconcontainer : {
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        bottom : 18,
        right : 0,
        backgroundColor : 'rgba(0,0,0,0.7)',
        zIndex : 2,
        width : 50,
        height : 50,
        borderRadius : 100,
    },
    button : {
        position : 'absolute',
        bottom : 150,
        alignSelf : 'center',
        width : '100%'
    },
    image : {
        width : '100%',
        height : '100%',
        borderRadius : 100
    },
    skiptext :{
        fontFamily : Constants.fontFamilybold,
        fontSize : 20,
        color : Colors.primary,
        alignSelf : 'flex-end'
    },
    pickercontainer : {
        width : '100%', 
        flexDirection : 'row', 
        justifyContent : 'space-between', 
        padding : 10, 
        alignItems : 'center',
        backgroundColor : Colors.gray,
        borderRadius : 8
    }
})

export default styles;