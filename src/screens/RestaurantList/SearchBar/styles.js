import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container : {
        width: '95%', 
        height: 70,
        backgroundColor: '#fff',
        flexDirection : 'row',
        alignItems : 'center',
        alignSelf : 'center',
        justifyContent : 'space-between',
        marginTop : 30
    },
    input : {
        width : '87%',
        height : 45,
        borderRadius : 10,
        backgroundColor : Colors.gray,
        padding : 10,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black
    },
    iconholder : {
        width : 45,
        height : 45,
        borderRadius : 10,
        backgroundColor : Colors.gray,
        alignItems : 'center',
        justifyContent : 'center'
    }
})

export default styles;