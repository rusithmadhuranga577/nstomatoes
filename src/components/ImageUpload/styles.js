import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    placeholder: {
        width: 150,
        height: 150,
        borderRadius : 150,
        backgroundColor : Colors.gray,
        alignSelf : 'center',
        zIndex : 1,
        elevation : 10,
        borderWidth : 0.5,
        borderColor : Colors.black
    },
    cameraiconcontainer : {
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        bottom : 18,
        right : -10,
        backgroundColor : 'rgba(0,0,0,0.7)',
        zIndex : 2,
        width : 40,
        height : 40,
        borderRadius : 100,
    },
    button : {
        position : 'absolute',
        bottom : 50,
        alignSelf : 'center',
        width : '100%'
    },
    image : {
        width : '100%',
        height : '100%',
        borderRadius : 100
    }
})

export default styles;