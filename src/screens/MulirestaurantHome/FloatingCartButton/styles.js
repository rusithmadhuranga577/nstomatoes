import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    buttoncontainer : {
        width: 55, 
        height: 55,
        backgroundColor: Colors.alertyellow,
        borderRadius : 400,
        position : 'absolute',
        bottom : 100,
        right : '5%',
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 8
    },
})

export default styles;